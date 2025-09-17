import { NextRequest, NextResponse } from 'next/server'
import { validateAPIKey } from '@/lib/api-auth'
import { supabaseAdmin } from '@/lib/supabase'
import { generateUsername } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const auth = await validateAPIKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')
  const username = searchParams.get('username')

  let query = supabaseAdmin
    .from('users')
    .select('id, email, name, username, timezone, booking_duration, buffer_time, created_at')

  if (email) query = query.eq('email', email)
  if (username) query = query.eq('username', username)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    data,
    meta: {
      count: data.length
    }
  })
}

export async function POST(request: NextRequest) {
  const auth = await validateAPIKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const body = await request.json()

  // Validate required fields
  if (!body.email || !body.password || !body.name) {
    return NextResponse.json({
      error: 'Missing required fields: email, password, name'
    }, { status: 400 })
  }

  try {
    // Create auth user
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Generate unique username
    const username = body.username || generateUsername(body.email)

    // Create user profile
    const { data: user, error: profileError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authUser.user.id,
        email: body.email,
        name: body.name,
        username,
        timezone: body.timezone || 'America/New_York',
        booking_duration: body.booking_duration || 30,
        buffer_time: body.buffer_time || 0
      })
      .select()
      .single()

    if (profileError) {
      // Rollback auth user creation
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    // Create default event type
    await supabaseAdmin
      .from('event_types')
      .insert({
        user_id: user.id,
        title: '30 Minute Meeting',
        description: 'A 30-minute meeting',
        duration: body.booking_duration || 30,
        is_active: true
      })

    // Create default availability if provided
    if (body.availability) {
      const availabilityRecords = body.availability.map((slot: any) => ({
        user_id: user.id,
        ...slot
      }))

      await supabaseAdmin
        .from('availabilities')
        .insert(availabilityRecords)
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User created successfully'
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to create user',
      details: error.message
    }, { status: 500 })
  }
}