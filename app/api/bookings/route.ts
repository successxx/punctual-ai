import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .eq('user_id', userId)
    .order('start_time', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ bookings: data })
}

export async function POST(req: NextRequest) {
  try {
    const {
      user_id,
      guest_name,
      guest_email,
      notes,
      start_time,
      end_time
    } = await req.json()

    // Validate required fields
    if (!user_id || !guest_name || !guest_email || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Use the atomic booking function to prevent double-booking
    const { data: booking, error: bookingError } = await supabaseAdmin.rpc(
      'create_booking_atomic',
      {
        p_user_id: user_id,
        p_start_time: start_time,
        p_end_time: end_time,
        p_guest_name: guest_name,
        p_guest_email: guest_email,
        p_notes: notes || null
      }
    )

    if (bookingError) {
      if (bookingError.message.includes('Slot unavailable')) {
        return NextResponse.json(
          { error: 'This time slot is no longer available' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: bookingError.message },
        { status: 500 }
      )
    }

    // Get host details for email
    const { data: host } = await supabaseAdmin
      .from('users')
      .select('name, email')
      .eq('id', user_id)
      .single()

    // Send confirmation emails
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_api_key') {
      try {
        // Format date and time
        const startDate = new Date(start_time)
        const formattedDate = startDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        const formattedTime = startDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        })

        // Email to guest
        await resend.emails.send({
          from: 'Punctual.AI <noreply@punctual.ai>',
          to: guest_email,
          subject: `Booking Confirmed with ${host?.name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #111111;">Booking Confirmed!</h2>
              <p style="color: #666666;">Your meeting with ${host?.name} has been scheduled.</p>

              <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
                <p style="margin: 5px 0;"><strong>Duration:</strong> 30 minutes</p>
                ${notes ? `<p style="margin: 5px 0;"><strong>Notes:</strong> ${notes}</p>` : ''}
              </div>

              <p style="color: #666666; font-size: 14px;">
                If you need to reschedule or cancel, please contact ${host?.name} directly.
              </p>

              <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 30px 0;">
              <p style="color: #999999; font-size: 12px;">
                Powered by Punctual.AI - Simple scheduling for everyone
              </p>
            </div>
          `
        })

        // Email to host
        if (host?.email) {
          await resend.emails.send({
            from: 'Punctual.AI <noreply@punctual.ai>',
            to: host.email,
            subject: `New Booking: ${guest_name}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #111111;">New Booking Received!</h2>
                <p style="color: #666666;">${guest_name} has booked a meeting with you.</p>

                <div style="background: #F5F5F5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Guest:</strong> ${guest_name}</p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> ${guest_email}</p>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
                  <p style="margin: 5px 0;"><strong>Duration:</strong> 30 minutes</p>
                  ${notes ? `<p style="margin: 5px 0;"><strong>Notes:</strong> ${notes}</p>` : ''}
                </div>

                <p style="color: #666666; font-size: 14px;">
                  View and manage this booking in your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings" style="color: #0066CC;">dashboard</a>.
                </p>

                <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 30px 0;">
                <p style="color: #999999; font-size: 12px;">
                  Powered by Punctual.AI - Simple scheduling for everyone
                </p>
              </div>
            `
          })
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Don't fail the booking if email fails
      }
    }

    return NextResponse.json({
      booking,
      message: 'Booking created successfully'
    })
  } catch (error: any) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'An error occurred while creating the booking' },
      { status: 500 }
    )
  }
}