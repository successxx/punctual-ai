import { NextRequest, NextResponse } from 'next/server'
import { validateAPIKey } from '@/lib/api-auth'
import { supabaseAdmin } from '@/lib/supabase'
import { getAvailableTimeSlots } from '@/lib/utils'

export async function POST(request: NextRequest) {
  const auth = await validateAPIKey(request)
  if (!auth.valid) {
    return NextResponse.json({ error: auth.error }, { status: 401 })
  }

  const body = await request.json()

  // Validate required fields
  if (!body.user_id || !body.date) {
    return NextResponse.json({
      error: 'Missing required fields: user_id, date'
    }, { status: 400 })
  }

  try {
    // Get user
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('booking_duration, timezone')
      .eq('id', body.user_id)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get availabilities
    const date = new Date(body.date)
    const dayOfWeek = date.getDay()

    const { data: availabilities } = await supabaseAdmin
      .from('availabilities')
      .select('*')
      .eq('user_id', body.user_id)
      .eq('day_of_week', dayOfWeek)
      .eq('is_active', true)

    // Get existing bookings for the date
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const { data: bookings } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('user_id', body.user_id)
      .eq('status', 'confirmed')
      .gte('start_time', startOfDay.toISOString())
      .lte('start_time', endOfDay.toISOString())

    // Calculate available slots
    const availableSlots = getAvailableTimeSlots(
      availabilities || [],
      bookings || [],
      date,
      user.booking_duration || 30
    )

    return NextResponse.json({
      success: true,
      data: {
        date: body.date,
        slots: availableSlots,
        duration: user.booking_duration || 30,
        timezone: user.timezone
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Failed to get available slots',
      details: error.message
    }, { status: 500 })
  }
}