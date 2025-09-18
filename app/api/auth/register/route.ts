import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function generateUsername(email: string): string {
  const baseName = email.split('@')[0].toLowerCase()
  const randomSuffix = Math.floor(Math.random() * 10000)
  return `${baseName}${randomSuffix}`
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        username: generateUsername(email)
      }
    })

    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: authError.message || 'Failed to create user account' },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 400 }
      )
    }

    // Create user profile in database
    const profile = {
      id: authData.user.id,
      email: authData.user.email,
      name,
      username: authData.user.user_metadata.username,
      subscription_tier: 'free',
      timezone: 'UTC',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Insert profile into profiles table
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert(profile)

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      )
    }

    // Create default availability (Mon-Fri 9-5)
    const defaultAvailability = []
    for (let day = 1; day <= 5; day++) {
      defaultAvailability.push({
        user_id: authData.user.id,
        day_of_week: day,
        start_time: '09:00:00',
        end_time: '17:00:00',
        is_available: true
      })
    }

    // Insert availability
    const { error: availabilityError } = await supabaseAdmin
      .from('availability')
      .insert(defaultAvailability)

    if (availabilityError) {
      console.error('Availability creation error:', availabilityError)
    }

    // Return success response
    return NextResponse.json({
      user: profile,
      message: 'Registration successful! Welcome to punctual.ai'
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}