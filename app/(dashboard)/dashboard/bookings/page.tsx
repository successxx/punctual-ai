'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Calendar, Clock, Mail, User, X } from 'lucide-react'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { Prose } from '@/components/editorial/typography/Prose'
import toast from 'react-hot-toast'
import '@/styles/editorial.tokens.css'

export default function BookingsPage() {
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchBookings(parsedUser.id)
    }
  }, [])

  const fetchBookings = async (userId: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: false })

    if (!error && data) {
      setBookings(data)
    }
  }

  const cancelBooking = async (bookingId: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)

    if (!error) {
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ))
      toast.success('Booking cancelled')
    } else {
      toast.error('Failed to cancel booking')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date)
  }

  const filteredBookings = bookings.filter(booking => {
    const now = new Date()
    const bookingDate = new Date(booking.start_time)

    if (filter === 'upcoming') {
      return bookingDate >= now && booking.status === 'confirmed'
    } else if (filter === 'past') {
      return bookingDate < now || booking.status === 'cancelled'
    }
    return true
  })

  return (
    <main style={{ backgroundColor: 'var(--color-paper)', minHeight: '100vh' }}>
      <Canvas width="wide">
        <Strip rules="bottom">
          <Display>Bookings</Display>
          <Prose>
            <p style={{ color: 'var(--color-ink-3)', marginTop: 'var(--baseline-2)' }}>
              Manage your appointments and meetings
            </p>
          </Prose>
        </Strip>

        <Strip>
          <nav style={{ display: 'flex', gap: 'var(--space-4)', borderBottom: '1px solid var(--color-rule)' }}>
            {(['upcoming', 'past', 'all'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  padding: 'var(--baseline-2) var(--baseline)',
                  background: 'none',
                  border: 'none',
                  borderBottom: filter === tab ? '2px solid var(--color-accent)' : '2px solid transparent',
                  fontSize: 'var(--fs-s)',
                  fontWeight: filter === tab ? '500' : '400',
                  color: filter === tab ? 'var(--color-accent)' : 'var(--color-ink-light)',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  marginBottom: '-1px',
                  transition: 'all var(--transition-base)'
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
        </Strip>

        <Strip>
          <div>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => (
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
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--baseline-2)', marginBottom: 'var(--baseline-2)' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px var(--baseline)',
                            borderRadius: 'var(--radius-micro)',
                            fontSize: 'var(--fs-xs)',
                            fontWeight: '500',
                            backgroundColor: booking.status === 'confirmed' ? 'rgba(0, 102, 255, 0.1)' : 'rgba(64, 64, 64, 0.1)',
                            color: booking.status === 'confirmed' ? 'var(--color-accent)' : 'var(--color-ink-light)'
                          }}
                        >
                          {booking.status}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--fs-xs)', color: 'var(--color-ink-lighter)' }}>
                          <Calendar style={{ width: '14px', height: '14px', marginRight: '4px' }} />
                          {formatDate(booking.start_time)}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline)' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <User style={{ width: '16px', height: '16px', marginRight: 'var(--baseline)', color: 'var(--color-ink-lighter)' }} />
                          <span style={{ fontWeight: '500', fontSize: 'var(--fs-s)', color: 'var(--color-ink)' }}>{booking.guest_name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Mail style={{ width: '16px', height: '16px', marginRight: 'var(--baseline)', color: 'var(--color-ink-lighter)' }} />
                          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-light)' }}>{booking.guest_email}</span>
                        </div>
                        {booking.notes && (
                          <div style={{
                            marginTop: 'var(--baseline-2)',
                            padding: 'var(--baseline-2)',
                            backgroundColor: 'var(--color-paper-shade)',
                            borderLeft: '2px solid var(--color-accent)',
                            borderRadius: 'var(--radius-micro)'
                          }}>
                            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-light)' }}>
                              <span style={{ fontWeight: '500' }}>Notes:</span> {booking.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {booking.status === 'confirmed' && new Date(booking.start_time) > new Date() && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: 'var(--baseline) var(--baseline-2)',
                          background: 'none',
                          border: '1px solid var(--color-rule)',
                          borderRadius: 'var(--radius-micro)',
                          fontSize: 'var(--fs-xs)',
                          color: 'var(--color-ink-light)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-base)'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = 'red';
                          e.currentTarget.style.color = 'red';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-rule)';
                          e.currentTarget.style.color = 'var(--color-ink-light)';
                        }}
                      >
                        <X style={{ width: '14px', height: '14px', marginRight: '4px' }} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                padding: 'var(--baseline-8) 0',
                textAlign: 'center',
                borderTop: '1px solid var(--color-rule)'
              }}>
                <Calendar style={{ width: '48px', height: '48px', margin: '0 auto var(--baseline-3)', color: 'var(--color-ink-lighter)', opacity: 0.5 }} />
                <p style={{ color: 'var(--color-ink-light)' }}>No {filter !== 'all' ? filter : ''} bookings found</p>
              </div>
            )}
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}