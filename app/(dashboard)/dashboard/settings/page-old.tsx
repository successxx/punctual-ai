// UI Components: Definition List, Numbered Steps, Callout—Muted, FAQ Strip, Section TOC
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { User, Clock, Globe } from 'lucide-react'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { FormInput } from '@/components/editorial/forms/FormInput'
import '@/styles/editorial.tokens.css'

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEDT)' }
]

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    timezone: 'America/New_York',
    booking_duration: 30,
    buffer_time: 0
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        username: parsedUser.username || '',
        timezone: parsedUser.timezone || 'America/New_York',
        booking_duration: parsedUser.booking_duration || 30,
        buffer_time: parsedUser.buffer_time || 0
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          name: formData.name,
          timezone: formData.timezone,
          booking_duration: formData.booking_duration,
          buffer_time: formData.buffer_time
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      // Update localStorage
      const updatedUser = { ...user, ...data }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)

      toast.success('Settings updated successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ backgroundColor: 'var(--color-paper)', minHeight: '100vh' }}>
      <Canvas width="standard">
        <Strip rules="bottom">
          <Display>Settings</Display>

          {/* Section TOC (Local) */}
          <nav style={{
            marginTop: 'var(--baseline-4)',
            padding: 'var(--baseline-3)',
            backgroundColor: 'var(--color-paper-shade)',
            borderRadius: 'var(--radius-micro)'
          }}>
            <p style={{ fontSize: 'var(--fs-xs)', fontWeight: '600', textTransform: 'uppercase', marginBottom: 'var(--baseline-2)', color: 'var(--color-ink-3)' }}>
              Quick Navigation
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: 'var(--baseline-3)', flexWrap: 'wrap' }}>
              <li>
                <a href="#profile" style={{ fontSize: 'var(--fs-s)', color: 'var(--color-accent)', textDecoration: 'none' }}>
                  → Profile
                </a>
              </li>
              <li>
                <a href="#booking-prefs" style={{ fontSize: 'var(--fs-s)', color: 'var(--color-accent)', textDecoration: 'none' }}>
                  → Booking Preferences
                </a>
              </li>
              <li>
                <a href="#timezone" style={{ fontSize: 'var(--fs-s)', color: 'var(--color-accent)', textDecoration: 'none' }}>
                  → Timezone
                </a>
              </li>
            </ul>
          </nav>
        </Strip>

        <form onSubmit={handleSubmit}>
          <Strip rules="top">
            <div id="profile" style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--baseline-4)' }}>
              <User style={{ width: '20px', height: '20px', marginRight: 'var(--baseline)', color: 'var(--color-ink-lighter)' }} />
              <h2 style={{ fontSize: 'var(--fs-l)', fontWeight: '400' }}>Profile</h2>
            </div>

            {/* Numbered Steps */}
            <div style={{
              marginBottom: 'var(--baseline-4)',
              padding: 'var(--baseline-3)',
              backgroundColor: 'rgba(0, 102, 255, 0.05)',
              borderLeft: '3px solid var(--color-accent)',
              borderRadius: '0 var(--radius-micro) var(--radius-micro) 0'
            }}>
              <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', marginBottom: 'var(--baseline-2)' }}>Quick Setup Guide:</p>
              <ol style={{
                listStyle: 'none',
                padding: 0,
                counterReset: 'step-counter'
              }}>
                <li style={{
                  counterIncrement: 'step-counter',
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--color-ink-2)',
                  marginBottom: 'var(--baseline)',
                  display: 'flex'
                }}>
                  <span style={{
                    content: 'counter(step-counter)',
                    marginRight: 'var(--baseline-2)',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-paper)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 'var(--fs-xs)',
                    fontWeight: '600'
                  }}>1</span>
                  <span>Update your full name</span>
                </li>
                <li style={{
                  counterIncrement: 'step-counter',
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--color-ink-2)',
                  marginBottom: 'var(--baseline)',
                  display: 'flex'
                }}>
                  <span style={{
                    content: 'counter(step-counter)',
                    marginRight: 'var(--baseline-2)',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-paper)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 'var(--fs-xs)',
                    fontWeight: '600'
                  }}>2</span>
                  <span>Note that email and username cannot be changed</span>
                </li>
                <li style={{
                  counterIncrement: 'step-counter',
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--color-ink-2)',
                  display: 'flex'
                }}>
                  <span style={{
                    content: 'counter(step-counter)',
                    marginRight: 'var(--baseline-2)',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-paper)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 'var(--fs-xs)',
                    fontWeight: '600'
                  }}>3</span>
                  <span>Save changes when complete</span>
                </li>
              </ol>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-3)', maxWidth: '600px' }}>
              <FormInput
                id="name"
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <FormInput
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                disabled
                helper="Email cannot be changed"
              />

              <div>
                <label htmlFor="username" style={{
                  display: 'block',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: '500',
                  marginBottom: 'var(--baseline)',
                  color: 'var(--color-ink)'
                }}>
                  Username
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{
                    padding: 'var(--baseline-1) var(--baseline-2)',
                    backgroundColor: 'var(--color-paper-shade)',
                    borderTop: '1px solid var(--color-rule)',
                    borderBottom: '1px solid var(--color-rule)',
                    borderLeft: '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-micro) 0 0 var(--radius-micro)',
                    fontSize: 'var(--fs-s)',
                    color: 'var(--color-ink-lighter)'
                  }}>
                    punctual.ai/
                  </span>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    disabled
                    style={{
                      flex: 1,
                      padding: 'var(--baseline-1) var(--baseline-2)',
                      border: '1px solid var(--color-rule)',
                      borderRadius: '0 var(--radius-micro) var(--radius-micro) 0',
                      fontSize: 'var(--fs-s)',
                      backgroundColor: 'var(--color-paper-shade)',
                      color: 'var(--color-ink)'
                    }}
                  />
                </div>
                <p style={{
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--color-ink-lighter)',
                  marginTop: 'var(--baseline)'
                }}>
                  Username cannot be changed
                </p>
              </div>
            </div>
          </Strip>

          <Strip rules="top">
            <div id="booking-prefs" style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--baseline-4)' }}>
              <Clock style={{ width: '20px', height: '20px', marginRight: 'var(--baseline)', color: 'var(--color-ink-lighter)' }} />
              <h2 style={{ fontSize: 'var(--fs-l)', fontWeight: '400' }}>Booking Preferences</h2>
            </div>

            {/* Definition List */}
            <dl style={{
              marginBottom: 'var(--baseline-4)',
              padding: 'var(--baseline-3)',
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-rule)',
              borderRadius: 'var(--radius-micro)'
            }}>
              <dt style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                Meeting Duration
              </dt>
              <dd style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginLeft: 0, marginBottom: 'var(--baseline-3)' }}>
                Set the default length for all your meetings. Can be 15, 30, 45, or 60 minutes.
              </dd>

              <dt style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                Buffer Time
              </dt>
              <dd style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginLeft: 0 }}>
                Add automatic breaks between meetings to prepare or take notes.
              </dd>
            </dl>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-3)', maxWidth: '600px' }}>
              <div>
                <label htmlFor="booking_duration" style={{
                  display: 'block',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: '500',
                  marginBottom: 'var(--baseline)',
                  color: 'var(--color-ink)'
                }}>
                  Default Meeting Duration
                </label>
                <select
                  id="booking_duration"
                  value={formData.booking_duration}
                  onChange={(e) => setFormData({ ...formData, booking_duration: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: 'var(--baseline-1) var(--baseline-2)',
                    border: '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-micro)',
                    fontSize: 'var(--fs-s)',
                    backgroundColor: 'var(--color-paper)',
                    color: 'var(--color-ink)',
                    cursor: 'pointer'
                  }}
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>

              <div>
                <label htmlFor="buffer_time" style={{
                  display: 'block',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: '500',
                  marginBottom: 'var(--baseline)',
                  color: 'var(--color-ink)'
                }}>
                  Buffer Time Between Meetings
                </label>
                <select
                  id="buffer_time"
                  value={formData.buffer_time}
                  onChange={(e) => setFormData({ ...formData, buffer_time: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: 'var(--baseline-1) var(--baseline-2)',
                    border: '1px solid var(--color-rule)',
                    borderRadius: 'var(--radius-micro)',
                    fontSize: 'var(--fs-s)',
                    backgroundColor: 'var(--color-paper)',
                    color: 'var(--color-ink)',
                    cursor: 'pointer'
                  }}
                >
                  <option value={0}>No buffer</option>
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>
            </div>
          </Strip>

          <Strip rules="top">
            <div id="timezone" style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--baseline-4)' }}>
              <Globe style={{ width: '20px', height: '20px', marginRight: 'var(--baseline)', color: 'var(--color-ink-lighter)' }} />
              <h2 style={{ fontSize: 'var(--fs-l)', fontWeight: '400' }}>Timezone</h2>
            </div>

            {/* Callout—Muted */}
            <aside style={{
              marginBottom: 'var(--baseline-4)',
              padding: 'var(--baseline-3)',
              backgroundColor: 'var(--color-paper-shade)',
              borderLeft: '3px solid var(--color-rule)',
              borderRadius: '0 var(--radius-micro) var(--radius-micro) 0'
            }}>
              <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                Important Note
              </p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', lineHeight: '1.5' }}>
                Your timezone affects how all meeting times are displayed and scheduled. Guests will see available times converted to their local timezone automatically.
              </p>
            </aside>

            <div style={{ maxWidth: '600px' }}>
              <label htmlFor="timezone" style={{
                display: 'block',
                fontSize: 'var(--fs-xs)',
                fontWeight: '500',
                marginBottom: 'var(--baseline)',
                color: 'var(--color-ink)'
              }}>
                Your Timezone
              </label>
              <select
                id="timezone"
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                style={{
                  width: '100%',
                  padding: 'var(--baseline-1) var(--baseline-2)',
                  border: '1px solid var(--color-rule)',
                  borderRadius: 'var(--radius-micro)',
                  fontSize: 'var(--fs-s)',
                  backgroundColor: 'var(--color-paper)',
                  color: 'var(--color-ink)',
                  cursor: 'pointer'
                }}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <p style={{
                fontSize: 'var(--fs-xs)',
                color: 'var(--color-ink-lighter)',
                marginTop: 'var(--baseline)'
              }}>
                All times will be displayed in this timezone
              </p>
            </div>
          </Strip>

          <Strip>
            {/* FAQ Strip */}
            <div style={{
              marginBottom: 'var(--baseline-4)',
              padding: 'var(--baseline-3)',
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-rule)',
              borderRadius: 'var(--radius-micro)'
            }}>
              <div style={{ marginBottom: 'var(--baseline-3)' }}>
                <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)' }}>
                  Q: Can I change my email address?
                </p>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginTop: 'var(--baseline)' }}>
                  A: Email addresses are used for authentication and cannot be changed once set.
                </p>
              </div>
              <div style={{ borderTop: '1px dashed var(--color-rule)', paddingTop: 'var(--baseline-3)' }}>
                <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)' }}>
                  Q: How do buffer times work?
                </p>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginTop: 'var(--baseline)' }}>
                  A: Buffer time is automatically blocked after each meeting, preventing back-to-back bookings.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                maxWidth: '600px',
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
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </Strip>
        </form>
      </Canvas>
    </main>
  )
}