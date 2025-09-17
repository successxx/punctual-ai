import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { generateUsername } from '@/lib/utils'

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

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Generate unique username
    const username = generateUsername(email)

    // Create user profile in profiles table
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        name,
        username,
        subscription_tier: 'free',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      })
      .select()
      .single()

    if (profileError) {
      // If profile creation fails, delete the auth user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    // No need for event_types anymore - removed

    // Create default availability (Mon-Fri 9-5)
    const defaultAvailability = []
    for (let day = 1; day <= 5; day++) { // Monday to Friday
      defaultAvailability.push({
        user_id: profile.id,
        day_of_week: day,
        start_time: '09:00:00',
        end_time: '17:00:00',
        is_available: true
      })
    }

    await supabaseAdmin
      .from('availability')
      .insert(defaultAvailability)

    return NextResponse.json({
      user: profile,
      message: 'Registration successful! Please check your email to verify your account.'
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}