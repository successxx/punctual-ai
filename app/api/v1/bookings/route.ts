import { NextRequest, NextResponse } from 'next/server'
import { validateAPIKey, sendWebhook } from '@/lib/api-auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  // Validate API key
  const auth = await validateAPIKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  // Parse query parameters
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const status = searchParams.get('status') || 'confirmed'

  // Build query
  let query = supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('status', status)

  if (userId) query = query.eq('user_id', userId)
  if (startDate) query = query.gte('start_time', startDate)
  if (endDate) query = query.lte('end_time', endDate)

  const { data, error } = await query.order('start_time', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    success: true,
    data,
    meta: {
      count: data.length,
      filters: { userId, startDate, endDate, status }
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
  const required = ['user_id', 'guest_name', 'guest_email', 'start_time', 'end_time']
  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({
        error: `Missing required field: ${field}`
      }, { status: 400 })
    }
  }

  // Use atomic booking function
  const { data, error } = await supabaseAdmin.rpc('create_booking_atomic', {
    p_user_id: body.user_id,
    p_start_time: body.start_time,
    p_end_time: body.end_time,
    p_guest_name: body.guest_name,
    p_guest_email: body.guest_email,
    p_notes: body.notes || null
  })

  if (error) {
    if (error.message.includes('Slot unavailable')) {
      return NextResponse.json({
        error: 'Time slot is already booked'
      }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Send webhook if configured
  if (auth.client.webhook_url) {
    await sendWebhook(auth.client.webhook_url, {
      event: 'booking.created',
      data: data
    })
  }

  return NextResponse.json({
    success: true,
    data,
    message: 'Booking created successfully'
  }, { status: 201 })
}