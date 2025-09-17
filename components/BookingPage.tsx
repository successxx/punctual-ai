'use client'

import { useState } from 'react'
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { formatTimeSlot, getAvailableTimeSlots } from '@/lib/utils'
import toast, { Toaster } from 'react-hot-toast'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { Deck } from '@/components/editorial/typography/Deck'
import { Prose } from '@/components/editorial/typography/Prose'
import { FormInput } from '@/components/editorial/forms/FormInput'
import { Action } from '@/components/editorial/ui/Action'
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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-6">
              You'll receive a confirmation email shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
              <div>
                <p className="text-sm text-gray-500">Meeting with</p>
                <p className="font-medium text-gray-900">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium text-gray-900">
                  {confirmedBooking.date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} at {formatTimeSlot(confirmedBooking.time)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-gray-900">{user.booking_duration || 30} minutes</p>
              </div>
            </div>

            <Button
              onClick={() => window.location.reload()}
              className="mt-6"
              variant="outline"
            >
              Book Another Time
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid md:grid-cols-3">
            {/* Left Sidebar */}
            <div className="p-8 border-r border-gray-200 bg-gray-50">
              {user.avatar_url && (
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
              )}
              <h1 className="text-xl font-semibold text-gray-900 text-center mb-2">
                {user.name}
              </h1>
              <div className="space-y-3 mt-6">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {user.booking_duration || 30} minutes
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {user.timezone || 'America/New_York'}
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="md:col-span-2 p-8">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className={`flex items-center ${step === 'date' ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'date' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium">Select Date</span>
                </div>
                <div className={`flex items-center ${step === 'time' ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'time' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium">Select Time</span>
                </div>
                <div className={`flex items-center ${step === 'details' ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium">Your Details</span>
                </div>
              </div>

              {/* Date Selection */}
              {step === 'date' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          const newMonth = new Date(currentMonth)
                          newMonth.setMonth(newMonth.getMonth() - 1)
                          setCurrentMonth(newMonth)
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          const newMonth = new Date(currentMonth)
                          newMonth.setMonth(newMonth.getMonth() + 1)
                          setCurrentMonth(newMonth)
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    {getDaysInMonth(currentMonth).map((date, index) => (
                      <div key={index} className="aspect-square">
                        {date && (
                          <button
                            onClick={() => isDateAvailable(date) && handleDateSelect(date)}
                            disabled={!isDateAvailable(date)}
                            className={`
                              w-full h-full rounded-lg text-sm font-medium transition-all
                              ${isDateAvailable(date)
                                ? 'hover:bg-blue-50 hover:text-blue-600 cursor-pointer'
                                : 'text-gray-300 cursor-not-allowed'
                              }
                              ${selectedDate?.toDateString() === date.toDateString()
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : ''
                              }
                            `}
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
                  <div className="mb-6">
                    <button
                      onClick={() => setStep('date')}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      ← Back to calendar
                    </button>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h2>

                  <div className="grid grid-cols-3 gap-3">
                    {getTimeSlots().length > 0 ? (
                      getTimeSlots().map(time => (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          className={`
                            px-4 py-3 rounded-lg border text-sm font-medium transition-all
                            ${selectedTime === time
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'border-gray-200 hover:border-blue-600 hover:text-blue-600'
                            }
                          `}
                        >
                          {formatTimeSlot(time)}
                        </button>
                      ))
                    ) : (
                      <p className="col-span-3 text-center text-gray-500 py-8">
                        No available time slots for this date
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Details Form */}
              {step === 'details' && (
                <div>
                  <div className="mb-6">
                    <button
                      onClick={() => setStep('time')}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      ← Back to time selection
                    </button>
                  </div>

                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {selectedDate?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })} at {selectedTime && formatTimeSlot(selectedTime)}
                    </p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={bookingDetails.name}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                        className="mt-1"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={bookingDetails.email}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                        className="mt-1"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes (Optional)</Label>
                      <textarea
                        id="notes"
                        value={bookingDetails.notes}
                        onChange={(e) => setBookingDetails({ ...bookingDetails, notes: e.target.value })}
                        className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                        rows={3}
                        placeholder="Please share anything that will help prepare for our meeting..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full"
                      variant="primary"
                    >
                      {loading ? 'Booking...' : 'Confirm Booking'}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}