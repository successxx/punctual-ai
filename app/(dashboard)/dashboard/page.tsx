'use client'

import { useEffect, useState } from 'react'
import { Calendar, Clock, Users, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { Prose } from '@/components/editorial/typography/Prose'
import { FactList } from '@/components/editorial/blocks/FactList'
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
          <Prose>
            <p style={{ color: 'var(--color-ink-3)', marginTop: 'var(--baseline-2)' }}>
              Here's what's happening with your bookings today.
            </p>
          </Prose>
        </Strip>

        <Strip>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--baseline-3)'
          }}>
            <div style={{ borderTop: '1px solid var(--color-rule)', paddingTop: 'var(--baseline-3)' }}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginBottom: 'var(--baseline)' }}>Total Bookings</p>
                  <p style={{ fontSize: 'var(--fs-xl)', fontWeight: '300', color: 'var(--color-ink)' }}>
                    {stats.totalBookings}
                  </p>
                </div>
                <Calendar className="h-6 w-6" style={{ color: 'var(--color-ink-3)', opacity: 0.5 }} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-rule)', paddingTop: 'var(--baseline-3)' }}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginBottom: 'var(--baseline)' }}>Today</p>
                  <p style={{ fontSize: 'var(--fs-xl)', fontWeight: '300', color: 'var(--color-ink)' }}>
                    {stats.todayBookings}
                  </p>
                </div>
                <Clock className="h-6 w-6" style={{ color: 'var(--color-ink-3)', opacity: 0.5 }} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-rule)', paddingTop: 'var(--baseline-3)' }}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginBottom: 'var(--baseline)' }}>This Week</p>
                  <p style={{ fontSize: 'var(--fs-xl)', fontWeight: '300', color: 'var(--color-ink)' }}>
                    {stats.weekBookings}
                  </p>
                </div>
                <TrendingUp className="h-6 w-6" style={{ color: 'var(--color-ink-3)', opacity: 0.5 }} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-rule)', paddingTop: 'var(--baseline-3)' }}>
              <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginBottom: 'var(--baseline)' }}>Upcoming</p>
                  <p style={{ fontSize: 'var(--fs-xl)', fontWeight: '300', color: 'var(--color-ink)' }}>
                    {stats.upcomingBookings}
                  </p>
                </div>
                <Users className="h-6 w-6" style={{ color: 'var(--color-ink-3)', opacity: 0.5 }} />
              </div>
            </div>
          </div>
        </Strip>

        <Strip rules="top">
          <h2 style={{ fontSize: 'var(--fs-l)', fontWeight: '400', marginBottom: 'var(--baseline-4)' }}>
            Upcoming Bookings
          </h2>
          <div>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  style={{
                    borderTop: index === 0 ? '1px solid var(--color-rule)' : 'none',
                    borderBottom: '1px solid var(--color-rule)',
                    paddingTop: 'var(--baseline-3)',
                    paddingBottom: 'var(--baseline-3)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)' }}>
                        {booking.guest_name}
                      </p>
                      <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginTop: 'var(--baseline)' }}>
                        {booking.guest_email}
                      </p>
                      {booking.notes && (
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginTop: 'var(--baseline-2)' }}>
                          {booking.notes}
                        </p>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 'var(--fs-s)', color: 'var(--color-ink)' }}>
                        {formatDate(booking.start_time)}
                      </p>
                      <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginTop: 'var(--baseline)' }}>
                        30 minutes
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                padding: 'var(--baseline-6) 0',
                textAlign: 'center',
                borderTop: '1px solid var(--color-rule)'
              }}>
                <p style={{ color: 'var(--color-ink-3)' }}>No upcoming bookings</p>
              </div>
            )}
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}