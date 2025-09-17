'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import { Clock, Plus, Trash2 } from 'lucide-react'

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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          Set Your Availability
        </h1>
        <p className="mt-2 text-gray-600">
          Configure when you're available for bookings
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Weekly Schedule
            </h2>
            <Button onClick={saveChanges} variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {DAYS_OF_WEEK.map((day) => {
            const daySlots = availabilities.filter(a => a.day_of_week === day.value)

            return (
              <div key={day.value} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Label className="text-base font-medium">
                    {day.label}
                  </Label>
                  <Button
                    onClick={() => addTimeSlot(day.value)}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Time
                  </Button>
                </div>

                {daySlots.length > 0 ? (
                  <div className="space-y-3">
                    {daySlots.map((slot) => (
                      <div key={slot.id} className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 flex-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <input
                            type="time"
                            value={slot.start_time.slice(0, 5)}
                            onChange={(e) => updateTimeSlot(slot.id, 'start_time', e.target.value + ':00')}
                            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={slot.end_time.slice(0, 5)}
                            onChange={(e) => updateTimeSlot(slot.id, 'end_time', e.target.value + ':00')}
                            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <button
                          onClick={() => deleteTimeSlot(slot.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No availability set for this day
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
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
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Set Monday-Friday, 9am-5pm (with lunch break)
          </button>
        </div>
      </div>
    </div>
  )
}