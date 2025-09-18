import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, toZonedTime, fromZonedTime } from 'date-fns-tz'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUsername(email: string): string {
  const base = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
  const suffix = Date.now().toString().slice(-4)
  return `${base}${suffix}`
}

export function formatTimeSlot(time: string): string {
  const [hour, minute] = time.split(':').map(Number)
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
}

interface Availability {
  day_of_week: number
  is_active: boolean
  start_time: string
  end_time: string
}

interface Booking {
  start_time: string
  end_time: string
  status: string
}

export function getAvailableTimeSlots(
  availabilities: Availability[],
  bookings: Booking[],
  date: Date,
  duration: number = 30
): string[] {
  const dayOfWeek = date.getDay()
  const dayAvailability = availabilities.filter(a => a.day_of_week === dayOfWeek && a.is_active)

  if (dayAvailability.length === 0) return []

  const slots: string[] = []
  const dateStr = format(date, 'yyyy-MM-dd')

  dayAvailability.forEach(availability => {
    const [startHour, startMin] = availability.start_time.split(':').map(Number)
    const [endHour, endMin] = availability.end_time.split(':').map(Number)

    let currentHour = startHour
    let currentMin = startMin

    while ((currentHour < endHour) || (currentHour === endHour && currentMin < endMin)) {
      const slotTime = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`
      const slotDateTime = new Date(`${dateStr}T${slotTime}`)
      const slotEndDateTime = new Date(slotDateTime.getTime() + duration * 60000)

      // Check if slot is not booked
      const isBooked = bookings.some(booking => {
        const bookingStart = new Date(booking.start_time)
        const bookingEnd = new Date(booking.end_time)
        return booking.status === 'confirmed' &&
               ((slotDateTime >= bookingStart && slotDateTime < bookingEnd) ||
                (slotEndDateTime > bookingStart && slotEndDateTime <= bookingEnd))
      })

      if (!isBooked) {
        slots.push(slotTime)
      }

      // Move to next slot
      currentMin += duration
      if (currentMin >= 60) {
        currentHour += Math.floor(currentMin / 60)
        currentMin = currentMin % 60
      }
    }
  })

  return slots
}

export function convertToUserTimezone(dateTime: string, userTimezone: string): Date {
  return toZonedTime(dateTime, userTimezone)
}

export function convertFromUserTimezone(dateTime: Date, userTimezone: string): string {
  return fromZonedTime(dateTime, userTimezone).toISOString()
}