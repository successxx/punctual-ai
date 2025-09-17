'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { User, Clock, Globe } from 'lucide-react'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { Prose } from '@/components/editorial/typography/Prose'
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
        <Strip borderBottom>
          <Display>Settings</Display>
          <Prose>
            <p style={{ color: 'var(--color-ink-3)', marginTop: 'var(--baseline-2)' }}>
              Manage your account and booking preferences
            </p>
          </Prose>
        </Strip>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <User className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                className="mt-1 bg-gray-50"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                  punctual.ai/
                </span>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  className="rounded-l-none bg-gray-50"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Username cannot be changed
              </p>
            </div>
          </div>
        </div>

        {/* Booking Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Booking Preferences
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="booking_duration">Default Meeting Duration</Label>
              <select
                id="booking_duration"
                value={formData.booking_duration}
                onChange={(e) => setFormData({ ...formData, booking_duration: parseInt(e.target.value) })}
                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            <div>
              <Label htmlFor="buffer_time">Buffer Time Between Meetings</Label>
              <select
                id="buffer_time"
                value={formData.buffer_time}
                onChange={(e) => setFormData({ ...formData, buffer_time: parseInt(e.target.value) })}
                className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value={0}>No buffer</option>
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Globe className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Timezone</h2>
          </div>

          <div>
            <Label htmlFor="timezone">Your Timezone</Label>
            <select
              id="timezone"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              All times will be displayed in this timezone
            </p>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          variant="primary"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  )
}