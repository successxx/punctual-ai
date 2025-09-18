// UI Components: Pros/Cons Table, Quote Stack, Metric Callouts, Legal Clause List, Card Row—Emphasis, Comparison Table
'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { formatTimeSlot, getAvailableTimeSlots } from '@/lib/utils'
import toast, { Toaster } from 'react-hot-toast'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { FormInput } from '@/components/editorial/forms/FormInput'
import '@/styles/editorial.tokens.css'

interface BookingPageProps {
  user: any
  availabilities: any[]
  bookings: any[]
}

export default function BookingPage({ user, availabilities, bookings }: BookingPageProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState<'date' | 'time' | 'details' | 'confirmed'>('date')
  const [loading, setLoading] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    notes: ''
  })
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay()
    const hasAvailability = availabilities.some(a => a.day_of_week === dayOfWeek)
    const isToday = new Date().toDateString() === date.toDateString()
    const isPast = date < new Date() && !isToday
    return hasAvailability && !isPast
  }

  const getTimeSlots = () => {
    if (!selectedDate) return []
    return getAvailableTimeSlots(
      availabilities,
      bookings,
      selectedDate,
      user.booking_duration || 30
    )
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setStep('time')
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep('details')
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    setLoading(true)

    try {
      const startDateTime = new Date(selectedDate)
      const [hours, minutes] = selectedTime.split(':')
      startDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

      const endDateTime = new Date(startDateTime)
      endDateTime.setMinutes(endDateTime.getMinutes() + (user.booking_duration || 30))

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          guest_name: bookingDetails.name,
          guest_email: bookingDetails.email,
          notes: bookingDetails.notes,
          start_time: startDateTime.toISOString(),
          end_time: endDateTime.toISOString()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Booking failed')
      }

      setConfirmedBooking({
        ...data.booking,
        date: selectedDate,
        time: selectedTime
      })
      setStep('confirmed')
      toast.success('Booking confirmed!')
    } catch (error: any) {
      toast.error(error.message)
      if (error.message.includes('unavailable')) {
        // Slot was taken, go back to time selection
        setStep('time')
        setSelectedTime(null)
      }
    } finally {
      setLoading(false)
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (step === 'confirmed' && confirmedBooking) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-paper)', padding: 'var(--baseline-8) 0' }}>
        <Canvas width="narrow">
          <Strip>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto var(--baseline-4)'
              }}>
                <Check style={{ width: '32px', height: '32px', color: 'green' }} />
              </div>
              <Display>Booking Confirmed!</Display>

              {/* Quote Stack */}
              <div style={{
                marginTop: 'var(--baseline-6)',
                padding: 'var(--baseline-3)',
                backgroundColor: 'var(--color-paper-shade)',
                borderRadius: 'var(--radius-micro)'
              }}>
                <blockquote style={{
                  fontSize: 'var(--fs-m)',
                  fontStyle: 'italic',
                  color: 'var(--color-ink)',
                  marginBottom: 'var(--baseline-3)'
                }}>
                  "Looking forward to our meeting!"
                </blockquote>
                <div style={{ borderTop: '1px dashed var(--color-rule)', paddingTop: 'var(--baseline-3)' }}>
                  <blockquote style={{
                    fontSize: 'var(--fs-s)',
                    color: 'var(--color-ink-2)'
                  }}>
                    "Check your email for calendar invite and meeting details"
                  </blockquote>
                </div>
              </div>

              {/* Comparison Table (Compact) */}
              <div style={{
                marginTop: 'var(--baseline-6)',
                overflow: 'hidden',
                border: '1px solid var(--color-rule)',
                borderRadius: 'var(--radius-micro)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ backgroundColor: 'var(--color-paper-shade)' }}>
                      <td style={{ padding: 'var(--baseline-2)', fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Meeting with</td>
                      <td style={{ padding: 'var(--baseline-2)', fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)' }}>{user.name}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: 'var(--baseline-2)', fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Date & Time</td>
                      <td style={{ padding: 'var(--baseline-2)', fontSize: 'var(--fs-s)', color: 'var(--color-ink)' }}>
                        {confirmedBooking.date.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })} at {formatTimeSlot(confirmedBooking.time)}
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: 'var(--color-paper-shade)' }}>
                      <td style={{ padding: 'var(--baseline-2)', fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Duration</td>
                      <td style={{ padding: 'var(--baseline-2)', fontSize: 'var(--fs-s)', color: 'var(--color-ink)' }}>{user.booking_duration || 30} minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: 'var(--baseline-6)',
                  padding: 'var(--baseline-2) var(--baseline-4)',
                  backgroundColor: 'var(--color-paper)',
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-accent)',
                  borderRadius: 'var(--radius-micro)',
                  fontSize: 'var(--fs-s)',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  e.currentTarget.style.color = 'var(--color-paper)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-paper)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
              >
                Book Another Time
              </button>
            </div>
          </Strip>
        </Canvas>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-paper)', padding: 'var(--baseline-8) 0' }}>
      <Toaster position="top-center" />
      <Canvas width="wide">
        <Strip>
          <div style={{
            backgroundColor: 'var(--color-paper)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-soft)',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
              {/* Left Sidebar */}
              <div style={{
                padding: 'var(--baseline-6)',
                borderRight: '1px solid var(--color-rule)',
                backgroundColor: 'var(--color-paper-shade)'
              }}>
                {user.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      margin: '0 auto var(--baseline-4)',
                      display: 'block'
                    }}
                  />
                )}
                <h1 style={{
                  fontSize: 'var(--fs-l)',
                  fontWeight: '500',
                  color: 'var(--color-ink)',
                  textAlign: 'center',
                  marginBottom: 'var(--baseline-2)'
                }}>
                  {user.name}
                </h1>

                {/* Metric Callouts */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 'var(--baseline-3)',
                  marginTop: 'var(--baseline-6)',
                  padding: 'var(--baseline-3)',
                  backgroundColor: 'var(--color-paper)',
                  borderRadius: 'var(--radius-micro)',
                  border: '1px solid var(--color-rule)'
                }}>
                  <div>
                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginBottom: '4px' }}>Duration</p>
                    <p style={{ fontSize: 'var(--fs-l)', fontWeight: '300', color: 'var(--color-accent)' }}>
                      {user.booking_duration || 30} min
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--color-rule)', paddingTop: 'var(--baseline-2)' }}>
                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginBottom: '4px' }}>Timezone</p>
                    <p style={{ fontSize: 'var(--fs-s)', color: 'var(--color-ink)' }}>
                      {user.timezone || 'America/New_York'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div style={{ padding: 'var(--baseline-6)' }}>
                {/* Card Row—Emphasis */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--baseline-2)',
                  marginBottom: 'var(--baseline-6)'
                }}>
                  <div style={{
                    padding: 'var(--baseline-3)',
                    border: step === 'date' ? '2px solid var(--color-accent)' : '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-micro)',
                    backgroundColor: step === 'date' ? 'rgba(0, 102, 255, 0.05)' : 'var(--color-paper)',
                    transform: step === 'date' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all var(--transition-base)'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: step === 'date' ? 'var(--color-accent)' : 'var(--color-ink-lighter)',
                      color: 'var(--color-paper)',
                      fontSize: 'var(--fs-s)',
                      fontWeight: '600',
                      marginBottom: 'var(--baseline)'
                    }}>1</div>
                    <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: step === 'date' ? 'var(--color-accent)' : 'var(--color-ink-3)' }}>Select Date</p>
                  </div>
                  <div style={{
                    padding: 'var(--baseline-3)',
                    border: step === 'time' ? '2px solid var(--color-accent)' : '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-micro)',
                    backgroundColor: step === 'time' ? 'rgba(0, 102, 255, 0.05)' : 'var(--color-paper)',
                    transform: step === 'time' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all var(--transition-base)'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: step === 'time' ? 'var(--color-accent)' : 'var(--color-ink-lighter)',
                      color: 'var(--color-paper)',
                      fontSize: 'var(--fs-s)',
                      fontWeight: '600',
                      marginBottom: 'var(--baseline)'
                    }}>2</div>
                    <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: step === 'time' ? 'var(--color-accent)' : 'var(--color-ink-3)' }}>Select Time</p>
                  </div>
                  <div style={{
                    padding: 'var(--baseline-3)',
                    border: step === 'details' ? '2px solid var(--color-accent)' : '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-micro)',
                    backgroundColor: step === 'details' ? 'rgba(0, 102, 255, 0.05)' : 'var(--color-paper)',
                    transform: step === 'details' ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all var(--transition-base)'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: step === 'details' ? 'var(--color-accent)' : 'var(--color-ink-lighter)',
                      color: 'var(--color-paper)',
                      fontSize: 'var(--fs-s)',
                      fontWeight: '600',
                      marginBottom: 'var(--baseline)'
                    }}>3</div>
                    <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: step === 'details' ? 'var(--color-accent)' : 'var(--color-ink-3)' }}>Your Details</p>
                  </div>
                </div>

                {/* Date Selection */}
                {step === 'date' && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--baseline-6)' }}>
                      <h2 style={{ fontSize: 'var(--fs-l)', fontWeight: '500', color: 'var(--color-ink)' }}>
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h2>
                      <div style={{ display: 'flex', gap: 'var(--baseline-2)' }}>
                        <button
                          onClick={() => {
                            const newMonth = new Date(currentMonth)
                            newMonth.setMonth(newMonth.getMonth() - 1)
                            setCurrentMonth(newMonth)
                          }}
                          style={{
                            padding: 'var(--baseline-2)',
                            backgroundColor: 'var(--color-paper)',
                            border: '1px solid var(--color-rule)',
                            borderRadius: 'var(--radius-micro)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-paper-shade)'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-paper)'}
                        >
                          <ChevronLeft style={{ width: '20px', height: '20px' }} />
                        </button>
                        <button
                          onClick={() => {
                            const newMonth = new Date(currentMonth)
                            newMonth.setMonth(newMonth.getMonth() + 1)
                            setCurrentMonth(newMonth)
                          }}
                          style={{
                            padding: 'var(--baseline-2)',
                            backgroundColor: 'var(--color-paper)',
                            border: '1px solid var(--color-rule)',
                            borderRadius: 'var(--radius-micro)',
                            cursor: 'pointer',
                            transition: 'all var(--transition-base)'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-paper-shade)'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-paper)'}
                        >
                          <ChevronRight style={{ width: '20px', height: '20px' }} />
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} style={{
                          textAlign: 'center',
                          fontSize: 'var(--fs-xs)',
                          fontWeight: '500',
                          color: 'var(--color-ink-3)',
                          padding: 'var(--baseline)'
                        }}>
                          {day}
                        </div>
                      ))}
                      {getDaysInMonth(currentMonth).map((date, index) => (
                        <div key={index} style={{ aspectRatio: '1' }}>
                          {date && (
                            <button
                              onClick={() => isDateAvailable(date) && handleDateSelect(date)}
                              disabled={!isDateAvailable(date)}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 'var(--radius-micro)',
                                fontSize: 'var(--fs-s)',
                                fontWeight: '500',
                                transition: 'all var(--transition-base)',
                                border: 'none',
                                cursor: isDateAvailable(date) ? 'pointer' : 'not-allowed',
                                backgroundColor: selectedDate?.toDateString() === date.toDateString()
                                  ? 'var(--color-accent)'
                                  : isDateAvailable(date)
                                  ? 'var(--color-paper)'
                                  : 'var(--color-paper-shade)',
                                color: selectedDate?.toDateString() === date.toDateString()
                                  ? 'var(--color-paper)'
                                  : isDateAvailable(date)
                                  ? 'var(--color-ink)'
                                  : 'var(--color-ink-lighter)'
                              }}
                              onMouseOver={(e) => {
                                if (isDateAvailable(date) && selectedDate?.toDateString() !== date.toDateString()) {
                                  e.currentTarget.style.backgroundColor = 'rgba(0, 102, 255, 0.1)';
                                  e.currentTarget.style.color = 'var(--color-accent)';
                                }
                              }}
                              onMouseOut={(e) => {
                                if (isDateAvailable(date) && selectedDate?.toDateString() !== date.toDateString()) {
                                  e.currentTarget.style.backgroundColor = 'var(--color-paper)';
                                  e.currentTarget.style.color = 'var(--color-ink)';
                                }
                              }}
                            >
                              {date.getDate()}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Time Selection */}
                {step === 'time' && selectedDate && (
                  <div>
                    <div style={{ marginBottom: 'var(--baseline-6)' }}>
                      <button
                        onClick={() => setStep('date')}
                        style={{
                          fontSize: 'var(--fs-s)',
                          color: 'var(--color-accent)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px'
                        }}
                      >
                        ← Back to calendar
                      </button>
                    </div>

                    {/* Pros/Cons Table for time selection */}
                    <div style={{
                      marginBottom: 'var(--baseline-6)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0',
                      border: '1px solid var(--color-rule)',
                      borderRadius: 'var(--radius-micro)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        padding: 'var(--baseline-3)',
                        backgroundColor: 'rgba(0, 255, 0, 0.05)',
                        borderRight: '1px solid var(--color-rule)'
                      }}>
                        <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'green', marginBottom: 'var(--baseline-2)' }}>
                          Available Times
                        </h3>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)' }}>
                          ✓ {getTimeSlots().length} slots open
                        </p>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginTop: 'var(--baseline)' }}>
                          ✓ Same-day booking allowed
                        </p>
                      </div>
                      <div style={{
                        padding: 'var(--baseline-3)',
                        backgroundColor: 'var(--color-paper-shade)'
                      }}>
                        <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)', marginBottom: 'var(--baseline-2)' }}>
                          Selected Date
                        </h3>
                        <p style={{ fontSize: 'var(--fs-m)', color: 'var(--color-ink)' }}>
                          {selectedDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--baseline-2)' }}>
                      {getTimeSlots().length > 0 ? (
                        getTimeSlots().map(time => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            style={{
                              padding: 'var(--baseline-2) var(--baseline-3)',
                              borderRadius: 'var(--radius-micro)',
                              border: selectedTime === time ? '2px solid var(--color-accent)' : '1px solid var(--color-rule)',
                              fontSize: 'var(--fs-s)',
                              fontWeight: '500',
                              transition: 'all var(--transition-base)',
                              cursor: 'pointer',
                              backgroundColor: selectedTime === time ? 'var(--color-accent)' : 'var(--color-paper)',
                              color: selectedTime === time ? 'var(--color-paper)' : 'var(--color-ink)'
                            }}
                            onMouseOver={(e) => {
                              if (selectedTime !== time) {
                                e.currentTarget.style.borderColor = 'var(--color-accent)';
                                e.currentTarget.style.color = 'var(--color-accent)';
                              }
                            }}
                            onMouseOut={(e) => {
                              if (selectedTime !== time) {
                                e.currentTarget.style.borderColor = 'var(--color-rule)';
                                e.currentTarget.style.color = 'var(--color-ink)';
                              }
                            }}
                          >
                            {formatTimeSlot(time)}
                          </button>
                        ))
                      ) : (
                        <p style={{
                          gridColumn: '1 / -1',
                          textAlign: 'center',
                          color: 'var(--color-ink-3)',
                          padding: 'var(--baseline-8)'
                        }}>
                          No available time slots for this date
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Details Form */}
                {step === 'details' && (
                  <div>
                    <div style={{ marginBottom: 'var(--baseline-6)' }}>
                      <button
                        onClick={() => setStep('time')}
                        style={{
                          fontSize: 'var(--fs-s)',
                          color: 'var(--color-accent)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px'
                        }}
                      >
                        ← Back to time selection
                      </button>
                    </div>

                    {/* Legal Clause List */}
                    <div style={{
                      marginBottom: 'var(--baseline-6)',
                      padding: 'var(--baseline-3)',
                      backgroundColor: 'var(--color-paper-shade)',
                      borderRadius: 'var(--radius-micro)',
                      border: '1px solid var(--color-rule)'
                    }}>
                      <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', marginBottom: 'var(--baseline-2)' }}>Booking Details</h3>
                      <ol style={{ listStyle: 'none', padding: 0, counterReset: 'clause' }}>
                        <li style={{
                          counterIncrement: 'clause',
                          display: 'flex',
                          fontSize: 'var(--fs-xs)',
                          color: 'var(--color-ink-2)',
                          marginBottom: 'var(--baseline)'
                        }}>
                          <span style={{
                            fontWeight: '600',
                            marginRight: 'var(--baseline-2)',
                            minWidth: '20px'
                          }}>1.</span>
                          Date: {selectedDate?.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </li>
                        <li style={{
                          counterIncrement: 'clause',
                          display: 'flex',
                          fontSize: 'var(--fs-xs)',
                          color: 'var(--color-ink-2)',
                          marginBottom: 'var(--baseline)'
                        }}>
                          <span style={{
                            fontWeight: '600',
                            marginRight: 'var(--baseline-2)',
                            minWidth: '20px'
                          }}>2.</span>
                          Time: {selectedTime && formatTimeSlot(selectedTime)}
                        </li>
                        <li style={{
                          counterIncrement: 'clause',
                          display: 'flex',
                          fontSize: 'var(--fs-xs)',
                          color: 'var(--color-ink-2)'
                        }}>
                          <span style={{
                            fontWeight: '600',
                            marginRight: 'var(--baseline-2)',
                            minWidth: '20px'
                          }}>3.</span>
                          Duration: {user.booking_duration || 30} minutes
                        </li>
                      </ol>
                    </div>

                    <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-4)' }}>
                      <FormInput
                        id="name"
                        label="Your Name"
                        type="text"
                        required
                        value={bookingDetails.name}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                        placeholder="John Doe"
                      />

                      <FormInput
                        id="email"
                        label="Email Address"
                        type="email"
                        required
                        value={bookingDetails.email}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                        placeholder="john@example.com"
                      />

                      <div>
                        <label htmlFor="notes" style={{
                          display: 'block',
                          fontSize: 'var(--fs-xs)',
                          fontWeight: '500',
                          marginBottom: 'var(--baseline)',
                          color: 'var(--color-ink)'
                        }}>Additional Notes (Optional)</label>
                        <textarea
                          id="notes"
                          value={bookingDetails.notes}
                          onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                          style={{
                            width: '100%',
                            padding: 'var(--baseline-2)',
                            border: '1px solid var(--color-rule)',
                            borderRadius: 'var(--radius-micro)',
                            fontSize: 'var(--fs-s)',
                            resize: 'none',
                            backgroundColor: 'var(--color-paper)',
                            color: 'var(--color-ink)'
                          }}
                          rows={3}
                          placeholder="Please share anything that will help prepare for our meeting..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          width: '100%',
                          padding: 'var(--baseline-2) var(--baseline-3)',
                          backgroundColor: 'var(--color-ink)',
                          color: 'var(--color-paper)',
                          border: 'none',
                          borderRadius: 'var(--radius-micro)',
                          fontSize: 'var(--fs-s)',
                          fontWeight: '500',
                          cursor: loading ? 'wait' : 'pointer',
                          opacity: loading ? 0.7 : 1,
                          transition: 'opacity var(--transition-base)'
                        }}
                      >
                        {loading ? 'Booking...' : 'Confirm Booking'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}