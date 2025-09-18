// UI Components: Stat Row, Accordion (Native), Timeline (Vertical), Highlight Row
'use client'

import { useEffect, useState } from 'react'
import { } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import '@/styles/editorial.tokens.css'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    todayBookings: 0,
    weekBookings: 0
  })
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchDashboardData(parsedUser.id)
    }
  }, [])

  const fetchDashboardData = async (userId: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const weekFromNow = new Date()
    weekFromNow.setDate(weekFromNow.getDate() + 7)

    // Fetch bookings
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'confirmed')
      .order('start_time', { ascending: true })

    if (!error && bookings) {
      const now = new Date()
      const upcoming = bookings.filter(b => new Date(b.start_time) > now)
      const todayBookings = bookings.filter(b => {
        const bookingDate = new Date(b.start_time)
        return bookingDate >= today && bookingDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
      })
      const weekBookings = bookings.filter(b => {
        const bookingDate = new Date(b.start_time)
        return bookingDate >= now && bookingDate <= weekFromNow
      })

      setStats({
        totalBookings: bookings.length,
        upcomingBookings: upcoming.length,
        todayBookings: todayBookings.length,
        weekBookings: weekBookings.length
      })

      setUpcomingBookings(upcoming.slice(0, 5))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <main style={{ backgroundColor: 'var(--color-paper)', minHeight: '100vh' }}>
      <Canvas width="wide">
        <Strip rules="bottom">
          <Display>
            Welcome back, {user?.name}
          </Display>
          {/* Highlight Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--baseline-2)',
            marginTop: 'var(--baseline-4)',
            padding: 'var(--baseline-3)',
            backgroundColor: 'var(--color-paper-shade)',
            borderRadius: 'var(--radius-micro)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--fs-l)' }}>📅</span>
              <p style={{ fontSize: 'var(--fs-xs)', fontWeight: '500', marginTop: 'var(--baseline)' }}>Today</p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Your schedule</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--fs-l)' }}>⏰</span>
              <p style={{ fontSize: 'var(--fs-xs)', fontWeight: '500', marginTop: 'var(--baseline)' }}>Real-time</p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Updates</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--fs-l)' }}>✨</span>
              <p style={{ fontSize: 'var(--fs-xs)', fontWeight: '500', marginTop: 'var(--baseline)' }}>Smart</p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Scheduling</p>
            </div>
          </div>
        </Strip>

        <Strip>
          {/* Stat Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 'var(--baseline-4)',
            padding: 'var(--baseline-4)',
            backgroundColor: 'var(--color-paper)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-micro)'
          }}>
            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: 'var(--fs-xxl)', fontWeight: '300', color: 'var(--color-ink)' }}>
                {stats.totalBookings}
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginTop: 'var(--baseline)' }}>
                Total Bookings
              </div>
            </div>
            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: 'var(--fs-xxl)', fontWeight: '300', color: 'var(--color-accent)' }}>
                {stats.todayBookings}
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginTop: 'var(--baseline)' }}>
                Today
              </div>
            </div>
            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: 'var(--fs-xxl)', fontWeight: '300', color: 'var(--color-ink)' }}>
                {stats.weekBookings}
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginTop: 'var(--baseline)' }}>
                This Week
              </div>
            </div>
            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{ fontSize: 'var(--fs-xxl)', fontWeight: '300', color: 'var(--color-ink)' }}>
                {stats.upcomingBookings}
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginTop: 'var(--baseline)' }}>
                Upcoming
              </div>
            </div>
          </div>
        </Strip>

        <Strip rules="top">
          <h2 style={{ fontSize: 'var(--fs-l)', fontWeight: '400', marginBottom: 'var(--baseline-4)' }}>
            Upcoming Bookings
          </h2>

          {upcomingBookings.length > 0 ? (
            <>
              {/* Accordion (Native) for first 2 bookings */}
              <div style={{ marginBottom: 'var(--baseline-4)' }}>
                {upcomingBookings.slice(0, 2).map((booking, _index) => (
                  <details
                    key={booking.id}
                    style={{
                      border: '1px solid var(--color-rule)',
                      borderRadius: 'var(--radius-micro)',
                      marginBottom: 'var(--baseline-2)',
                      overflow: 'hidden'
                    }}
                  >
                    <summary style={{
                      padding: 'var(--baseline-2) var(--baseline-3)',
                      backgroundColor: 'var(--color-paper-shade)',
                      cursor: 'pointer',
                      fontSize: 'var(--fs-s)',
                      fontWeight: '500',
                      color: 'var(--color-ink)',
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{booking.guest_name}</span>
                      <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>
                        {formatDate(booking.start_time)}
                      </span>
                    </summary>
                    <div style={{ padding: 'var(--baseline-3)', backgroundColor: 'var(--color-paper)' }}>
                      <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>
                        <strong>Email:</strong> {booking.guest_email}
                      </p>
                      <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>
                        <strong>Duration:</strong> 30 minutes
                      </p>
                      {booking.notes && (
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)' }}>
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      )}
                    </div>
                  </details>
                ))}
              </div>

              {/* Timeline (Vertical) for remaining bookings */}
              {upcomingBookings.length > 2 && (
                <div style={{
                  borderLeft: '2px solid var(--color-accent)',
                  marginLeft: 'var(--baseline-2)',
                  paddingLeft: 'var(--baseline-4)'
                }}>
                  <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', marginBottom: 'var(--baseline-3)' }}>Later Appointments</h3>
                  {upcomingBookings.slice(2).map((booking, _index) => (
                    <div
                      key={booking.id}
                      style={{
                        position: 'relative',
                        marginBottom: 'var(--baseline-4)'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        left: 'calc(-1 * var(--baseline-4) - 6px)',
                        width: '12px',
                        height: '12px',
                        backgroundColor: 'var(--color-accent)',
                        borderRadius: '50%',
                        border: '2px solid var(--color-paper)'
                      }} />
                      <div style={{ display: 'flex', gap: 'var(--baseline-4)' }}>
                        <div style={{ minWidth: '120px' }}>
                          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-accent)', fontWeight: '500' }}>
                            {formatDate(booking.start_time)}
                          </p>
                        </div>
                        <div>
                          <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)' }}>
                            {booking.guest_name}
                          </p>
                          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginTop: '4px' }}>
                            {booking.guest_email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{
              padding: 'var(--baseline-6)',
              textAlign: 'center',
              backgroundColor: 'var(--color-paper-shade)',
              borderRadius: 'var(--radius-micro)',
              border: '1px solid var(--color-rule)'
            }}>
              <p style={{ fontSize: 'var(--fs-m)', color: 'var(--color-ink-3)' }}>No upcoming bookings</p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-lighter)', marginTop: 'var(--baseline)' }}>
                Share your booking link to start receiving appointments
              </p>
            </div>
          )}
        </Strip>
      </Canvas>
    </main>
  )
}