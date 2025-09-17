'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Clock, Plus, Trash2 } from 'lucide-react'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { Prose } from '@/components/editorial/typography/Prose'
import '@/styles/editorial.tokens.css'

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
]

export default function AvailabilityPage() {
  const [user, setUser] = useState<any>(null)
  const [availabilities, setAvailabilities] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchAvailability(parsedUser.id)
    }
  }, [])

  const fetchAvailability = async (userId: string) => {
    const { data, error } = await supabase
      .from('availabilities')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true })

    if (!error && data) {
      setAvailabilities(data)
    }
  }

  const addTimeSlot = async (dayOfWeek: number) => {
    const newSlot = {
      user_id: user.id,
      day_of_week: dayOfWeek,
      start_time: '09:00:00',
      end_time: '17:00:00',
      is_active: true
    }

    const { data, error } = await supabase
      .from('availabilities')
      .insert(newSlot)
      .select()
      .single()

    if (!error && data) {
      setAvailabilities([...availabilities, data])
      toast.success('Time slot added')
    } else {
      toast.error('Failed to add time slot')
    }
  }

  const updateTimeSlot = async (id: string, field: string, value: string) => {
    const { error } = await supabase
      .from('availabilities')
      .update({ [field]: value })
      .eq('id', id)

    if (!error) {
      setAvailabilities(availabilities.map(slot =>
        slot.id === id ? { ...slot, [field]: value } : slot
      ))
    }
  }

  const deleteTimeSlot = async (id: string) => {
    const { error } = await supabase
      .from('availabilities')
      .update({ is_active: false })
      .eq('id', id)

    if (!error) {
      setAvailabilities(availabilities.filter(slot => slot.id !== id))
      toast.success('Time slot removed')
    } else {
      toast.error('Failed to remove time slot')
    }
  }

  const saveChanges = async () => {
    setLoading(true)
    // Changes are already saved on each update
    toast.success('Availability updated successfully')
    setLoading(false)
  }

  return (
    <main style={{ backgroundColor: 'var(--color-paper)', minHeight: '100vh' }}>
      <Canvas width="standard">
        <Strip rules="bottom">
          <Display>Set Your Availability</Display>
          <Prose>
            <p style={{ color: 'var(--color-ink-3)', marginTop: 'var(--baseline-2)' }}>
              Configure when you're available for bookings
            </p>
          </Prose>
        </Strip>

        <Strip rules="bottom">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--baseline-3)' }}>
            <h2 style={{ fontSize: 'var(--fs-l)', fontWeight: '400' }}>Weekly Schedule</h2>
            <button
              onClick={saveChanges}
              disabled={loading}
              style={{
                padding: 'var(--baseline) var(--baseline-3)',
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-paper)',
                border: 'none',
                borderRadius: 'var(--radius-micro)',
                fontSize: 'var(--fs-s)',
                fontWeight: '500',
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </Strip>

        <Strip>
          <div>
            {DAYS_OF_WEEK.map((day, index) => {
              const daySlots = availabilities.filter(a => a.day_of_week === day.value)

              return (
                <div
                  key={day.value}
                  style={{
                    borderTop: index === 0 ? '1px solid var(--color-rule)' : 'none',
                    borderBottom: '1px solid var(--color-rule)',
                    paddingTop: 'var(--baseline-3)',
                    paddingBottom: 'var(--baseline-3)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--baseline-2)' }}>
                    <label style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)' }}>
                      {day.label}
                    </label>
                    <button
                      onClick={() => addTimeSlot(day.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: 'var(--baseline) var(--baseline-2)',
                        background: 'none',
                        border: '1px solid var(--color-rule)',
                        borderRadius: 'var(--radius-micro)',
                        fontSize: 'var(--fs-xs)',
                        color: 'var(--color-ink)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-base)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-paper-shade)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Plus style={{ width: '14px', height: '14px', marginRight: '4px' }} />
                      Add Time
                    </button>
                  </div>

                  {daySlots.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-2)' }}>
                      {daySlots.map((slot) => (
                        <div key={slot.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--baseline-2)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--baseline)', flex: 1 }}>
                            <Clock style={{ width: '16px', height: '16px', color: 'var(--color-ink-lighter)' }} />
                            <input
                              type="time"
                              value={slot.start_time.slice(0, 5)}
                              onChange={(e) => updateTimeSlot(slot.id, 'start_time', e.target.value + ':00')}
                              style={{
                                padding: 'var(--baseline) var(--baseline-2)',
                                border: '1px solid var(--color-rule)',
                                borderRadius: 'var(--radius-micro)',
                                fontSize: 'var(--fs-s)',
                                backgroundColor: 'var(--color-paper)',
                                color: 'var(--color-ink)'
                              }}
                            />
                            <span style={{ color: 'var(--color-ink-light)', fontSize: 'var(--fs-s)' }}>to</span>
                            <input
                              type="time"
                              value={slot.end_time.slice(0, 5)}
                              onChange={(e) => updateTimeSlot(slot.id, 'end_time', e.target.value + ':00')}
                              style={{
                                padding: 'var(--baseline) var(--baseline-2)',
                                border: '1px solid var(--color-rule)',
                                borderRadius: 'var(--radius-micro)',
                                fontSize: 'var(--fs-s)',
                                backgroundColor: 'var(--color-paper)',
                                color: 'var(--color-ink)'
                              }}
                            />
                          </div>
                          <button
                            onClick={() => deleteTimeSlot(slot.id)}
                            style={{
                              padding: 'var(--baseline)',
                              background: 'none',
                              border: 'none',
                              color: 'var(--color-ink-lighter)',
                              cursor: 'pointer',
                              transition: 'color var(--transition-base)'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.color = 'red';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.color = 'var(--color-ink-lighter)';
                            }}
                          >
                            <Trash2 style={{ width: '16px', height: '16px' }} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-lighter)' }}>
                      No availability set for this day
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </Strip>

        <Strip rules="top">
          <h3 style={{ fontSize: 'var(--fs-m)', fontWeight: '500', marginBottom: 'var(--baseline-3)' }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-2)' }}>
            <button
              onClick={() => {
                // Set Mon-Fri 9-5
                const workdaySlots = []
                for (let day = 1; day <= 5; day++) {
                  workdaySlots.push(
                    {
                      user_id: user.id,
                      day_of_week: day,
                      start_time: '09:00:00',
                      end_time: '12:00:00',
                      is_active: true
                    },
                    {
                      user_id: user.id,
                      day_of_week: day,
                      start_time: '13:00:00',
                      end_time: '17:00:00',
                      is_active: true
                    }
                  )
                }
                // Clear existing and add new
                supabase
                  .from('availabilities')
                  .update({ is_active: false })
                  .eq('user_id', user.id)
                  .then(() => {
                    supabase
                      .from('availabilities')
                      .insert(workdaySlots)
                      .then(() => {
                        fetchAvailability(user.id)
                        toast.success('Set to Monday-Friday, 9-5 schedule')
                      })
                  })
              }}
              style={{
                padding: 'var(--baseline-2) var(--baseline-3)',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-paper)',
                border: 'none',
                borderRadius: 'var(--radius-micro)',
                fontSize: 'var(--fs-s)',
                cursor: 'pointer',
                transition: 'opacity var(--transition-base)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Set Monday-Friday, 9am-5pm (with lunch break)
            </button>
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}