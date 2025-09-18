// UI Components: Key Bullet Summary, Accordion Grid, Do/Don't List, KBD Keys, Expandable Excerpt
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Clock, Plus, Trash2 } from 'lucide-react'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
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

          {/* Key Bullet Summary */}
          <div style={{
            marginTop: 'var(--baseline-4)',
            padding: 'var(--baseline-3)',
            backgroundColor: 'var(--color-paper-shade)',
            borderRadius: 'var(--radius-micro)'
          }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ fontSize: 'var(--fs-s)', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                <span style={{ fontWeight: '600' }}>✓ Flexible Schedule:</span> Set different hours for each day
              </li>
              <li style={{ fontSize: 'var(--fs-s)', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                <span style={{ fontWeight: '600' }}>✓ Multiple Time Slots:</span> Add breaks and lunch hours
              </li>
              <li style={{ fontSize: 'var(--fs-s)', color: 'var(--color-ink)' }}>
                <span style={{ fontWeight: '600' }}>✓ Instant Updates:</span> Changes apply immediately
              </li>
            </ul>
          </div>
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

          {/* KBD Keys */}
          <div style={{
            marginBottom: 'var(--baseline-3)',
            padding: 'var(--baseline-2)',
            backgroundColor: 'var(--color-paper)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-micro)'
          }}>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginRight: 'var(--baseline-2)' }}>
              Keyboard shortcuts:
            </span>
            <kbd style={{
              padding: '2px 6px',
              backgroundColor: 'var(--color-paper-shade)',
              border: '1px solid var(--color-rule)',
              borderRadius: '3px',
              fontSize: 'var(--fs-xs)',
              fontFamily: 'monospace',
              marginRight: 'var(--baseline)'
            }}>Tab</kbd>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginRight: 'var(--baseline-2)' }}>Next field</span>
            <kbd style={{
              padding: '2px 6px',
              backgroundColor: 'var(--color-paper-shade)',
              border: '1px solid var(--color-rule)',
              borderRadius: '3px',
              fontSize: 'var(--fs-xs)',
              fontFamily: 'monospace',
              marginRight: 'var(--baseline)'
            }}>Enter</kbd>
            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Save changes</span>
          </div>
        </Strip>

        <Strip>
          {/* Accordion Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--baseline-2)'
          }}>
            {DAYS_OF_WEEK.slice(0, 4).map((day) => {
              const daySlots = availabilities.filter(a => a.day_of_week === day.value)
              return (
                <details
                  key={day.value}
                  style={{
                    border: '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-micro)',
                    overflow: 'hidden'
                  }}
                  open={day.value === 1}
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
                    <span>{day.label}</span>
                    <Plus style={{ width: '14px', height: '14px', color: 'var(--color-ink-3)' }} />
                  </summary>
                  <div style={{ padding: 'var(--baseline-3)', backgroundColor: 'var(--color-paper)' }}>
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
                        marginBottom: 'var(--baseline-2)',
                        width: '100%',
                        justifyContent: 'center'
                      }}
                    >
                      <Plus style={{ width: '14px', height: '14px', marginRight: '4px' }} />
                      Add Time Slot
                    </button>
                    {daySlots.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-2)' }}>
                        {daySlots.map((slot) => (
                          <div key={slot.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--baseline)' }}>
                              <input
                                type="time"
                                value={slot.start_time.slice(0, 5)}
                                onChange={(e) => updateTimeSlot(slot.id, 'start_time', e.target.value + ':00')}
                                style={{
                                  flex: 1,
                                  padding: 'var(--baseline) var(--baseline-2)',
                                  border: '1px solid var(--color-rule)',
                                  borderRadius: 'var(--radius-micro)',
                                  fontSize: 'var(--fs-s)'
                                }}
                              />
                              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>to</span>
                              <input
                                type="time"
                                value={slot.end_time.slice(0, 5)}
                                onChange={(e) => updateTimeSlot(slot.id, 'end_time', e.target.value + ':00')}
                                style={{
                                  flex: 1,
                                  padding: 'var(--baseline) var(--baseline-2)',
                                  border: '1px solid var(--color-rule)',
                                  borderRadius: 'var(--radius-micro)',
                                  fontSize: 'var(--fs-s)'
                                }}
                              />
                              <button
                                onClick={() => deleteTimeSlot(slot.id)}
                                style={{
                                  padding: 'var(--baseline)',
                                  background: 'none',
                                  border: 'none',
                                  color: 'var(--color-ink-lighter)',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 style={{ width: '16px', height: '16px' }} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-lighter)', textAlign: 'center' }}>
                        No availability set
                      </p>
                    )}
                  </div>
                </details>
              )
            })}
          </div>

          {/* Expandable Excerpt for remaining days */}
          <details style={{
            marginTop: 'var(--baseline-4)',
            border: '1px solid var(--color-rule)',
            borderRadius: 'var(--radius-micro)',
            overflow: 'hidden'
          }}>
            <summary style={{
              padding: 'var(--baseline-2) var(--baseline-3)',
              backgroundColor: 'var(--color-paper-shade)',
              cursor: 'pointer',
              fontSize: 'var(--fs-s)',
              fontWeight: '500',
              color: 'var(--color-ink)',
              listStyle: 'none'
            }}>
              Weekend Schedule (Friday - Sunday)
              <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', marginLeft: 'var(--baseline-2)' }}>
                Click to expand ▼
              </span>
            </summary>
            <div style={{ padding: 'var(--baseline-3)' }}>
              {DAYS_OF_WEEK.slice(4).map((day, index) => {
                const daySlots = availabilities.filter(a => a.day_of_week === day.value)
                return (
                  <div
                    key={day.value}
                    style={{
                      borderTop: index > 0 ? '1px solid var(--color-rule)' : 'none',
                      paddingTop: index > 0 ? 'var(--baseline-3)' : 0,
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
                          cursor: 'pointer'
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
                                  fontSize: 'var(--fs-s)'
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
                                  fontSize: 'var(--fs-s)'
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
                                cursor: 'pointer'
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
          </details>
        </Strip>

        <Strip rules="top">
          <h3 style={{ fontSize: 'var(--fs-m)', fontWeight: '500', marginBottom: 'var(--baseline-3)' }}>Schedule Templates</h3>

          {/* Do/Don't List */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--baseline-4)',
            marginBottom: 'var(--baseline-4)'
          }}>
            <div>
              <h4 style={{
                fontSize: 'var(--fs-s)',
                fontWeight: '500',
                color: 'green',
                marginBottom: 'var(--baseline-2)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: 'var(--baseline)' }}>✓</span> Do
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>
                  ✓ Include buffer time between meetings
                </li>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>
                  ✓ Set realistic availability hours
                </li>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)' }}>
                  ✓ Block out lunch and break times
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{
                fontSize: 'var(--fs-s)',
                fontWeight: '500',
                color: 'red',
                marginBottom: 'var(--baseline-2)',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: 'var(--baseline)' }}>✗</span> Don't
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>
                  ✗ Overlap time slots
                </li>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>
                  ✗ Set availability past midnight
                </li>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)' }}>
                  ✗ Forget to save changes
                </li>
              </ul>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-2)' }}>
            <button
              onClick={() => {
                // Set Mon-Fri 9-5
                const workdaySlots: any[] = []
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
              Apply Standard Business Hours (9-5 with lunch)
            </button>
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}