// UI Components: Mini Tabs (CSS-only), Badge Header, Bordered List, Inset Note, Toggle Reveal
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
          {/* Badge Header */}
          <div>
            <span style={{
              display: 'inline-block',
              fontSize: 'var(--fs-xs)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '4px var(--baseline-2)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-paper)',
              borderRadius: 'var(--radius-micro)',
              marginBottom: 'var(--baseline-2)'
            }}>
              Management
            </span>
            <Display>Bookings</Display>
          </div>
          <Prose>
            <p style={{ color: 'var(--color-ink-3)', marginTop: 'var(--baseline-2)' }}>
              Manage your appointments and meetings
            </p>
          </Prose>
        </Strip>

        <Strip>
          {/* Mini Tabs (CSS-only) */}
          <style jsx>{`
            .tab-input { display: none; }
            .tab-label {
              display: inline-block;
              padding: var(--baseline-2) var(--baseline-3);
              background: var(--color-paper);
              border: 1px solid var(--color-rule);
              cursor: pointer;
              transition: all var(--transition-base);
              font-size: var(--fs-s);
              color: var(--color-ink-light);
            }
            .tab-input:checked + .tab-label {
              background: var(--color-accent);
              color: var(--color-paper);
              border-color: var(--color-accent);
            }
            .tab-label:first-of-type { border-radius: var(--radius-micro) 0 0 var(--radius-micro); }
            .tab-label:last-of-type { border-radius: 0 var(--radius-micro) var(--radius-micro) 0; }
            .tab-label:not(:last-of-type) { border-right: none; }
          `}</style>
          <div style={{ marginBottom: 'var(--baseline-4)' }}>
            <input type="radio" id="tab-upcoming" className="tab-input" checked={filter === 'upcoming'} onChange={() => setFilter('upcoming')} />
            <label htmlFor="tab-upcoming" className="tab-label">Upcoming</label>
            <input type="radio" id="tab-past" className="tab-input" checked={filter === 'past'} onChange={() => setFilter('past')} />
            <label htmlFor="tab-past" className="tab-label">Past</label>
            <input type="radio" id="tab-all" className="tab-input" checked={filter === 'all'} onChange={() => setFilter('all')} />
            <label htmlFor="tab-all" className="tab-label">All</label>
          </div>
        </Strip>

        <Strip>
          {/* Bordered List */}
          <div style={{
            borderLeft: '3px solid var(--color-accent)',
            paddingLeft: 'var(--baseline-3)'
          }}>
            {filteredBookings.length > 0 ? (
              <>
                {filteredBookings.map((booking, index) => (
                  <div key={booking.id}>
                    <div
                      style={{
                        paddingTop: 'var(--baseline-3)',
                        paddingBottom: 'var(--baseline-3)',
                        borderBottom: index < filteredBookings.length - 1 ? '1px dashed var(--color-rule)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                          {/* Toggle Reveal for booking details */}
                          <details>
                            <summary style={{
                              cursor: 'pointer',
                              listStyle: 'none',
                              fontSize: 'var(--fs-s)',
                              fontWeight: '500',
                              color: 'var(--color-ink)',
                              marginBottom: 'var(--baseline)'
                            }}>
                              {booking.guest_name}
                              <span style={{
                                marginLeft: 'var(--baseline-2)',
                                fontSize: 'var(--fs-xs)',
                                color: 'var(--color-ink-3)'
                              }}>
                                ▶ Show details
                              </span>
                            </summary>

                            <div style={{ marginTop: 'var(--baseline-2)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--baseline)' }}>
                                <Mail style={{ width: '16px', height: '16px', marginRight: 'var(--baseline)', color: 'var(--color-ink-lighter)' }} />
                                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-light)' }}>{booking.guest_email}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--baseline)' }}>
                                <Calendar style={{ width: '16px', height: '16px', marginRight: 'var(--baseline)', color: 'var(--color-ink-lighter)' }} />
                                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-light)' }}>{formatDate(booking.start_time)}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Clock style={{ width: '16px', height: '16px', marginRight: 'var(--baseline)', color: 'var(--color-ink-lighter)' }} />
                                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-light)' }}>30 minutes</span>
                              </div>
                            </div>
                          </details>

                          {/* Inset Note for booking notes */}
                          {booking.notes && (
                            <div style={{
                              display: 'inline-block',
                              marginTop: 'var(--baseline-2)',
                              marginLeft: 'var(--baseline-2)',
                              padding: '6px var(--baseline-2)',
                              backgroundColor: 'rgba(255, 243, 224, 0.8)',
                              border: '1px solid rgba(255, 193, 7, 0.3)',
                              borderRadius: 'var(--radius-micro)',
                              fontSize: 'var(--fs-xs)',
                              color: 'var(--color-ink-2)'
                            }}>
                              📌 {booking.notes}
                            </div>
                          )}

                          <div style={{
                            marginTop: 'var(--baseline)',
                            display: 'inline-block',
                            padding: '2px var(--baseline)',
                            borderRadius: 'var(--radius-micro)',
                            fontSize: 'var(--fs-xs)',
                            fontWeight: '500',
                            backgroundColor: booking.status === 'confirmed' ? 'rgba(0, 102, 255, 0.1)' : 'rgba(64, 64, 64, 0.1)',
                            color: booking.status === 'confirmed' ? 'var(--color-accent)' : 'var(--color-ink-light)'
                          }}>
                            {booking.status}
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
                  </div>
                ))}
              </>
            ) : (
              <div style={{
                padding: 'var(--baseline-8)',
                textAlign: 'center',
                backgroundColor: 'var(--color-paper-shade)',
                borderRadius: 'var(--radius-micro)'
              }}>
                <Calendar style={{ width: '48px', height: '48px', margin: '0 auto var(--baseline-3)', color: 'var(--color-ink-lighter)', opacity: 0.5 }} />
                <p style={{ color: 'var(--color-ink-light)' }}>No {filter !== 'all' ? filter : ''} bookings found</p>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-lighter)', marginTop: 'var(--baseline)' }}>
                  Bookings will appear here once scheduled
                </p>
              </div>
            )}
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}