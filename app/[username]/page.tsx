import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import BookingPage from '@/components/BookingPage'

export default async function UserBookingPage({
  params
}: {
  params: Promise<{ username: string }>
}) {
  const resolvedParams = await params
  const supabase = await createServerSupabaseClient()

  // Get user by username
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', resolvedParams.username.toLowerCase())
    .single()

  if (!user || error) {
    notFound()
  }

  // Get user's availabilities
  const { data: availabilities } = await supabase
    .from('availabilities')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('day_of_week')
    .order('start_time')

  // Get user's confirmed bookings for the next 60 days
  const startDate = new Date()
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 60)

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'confirmed')
    .gte('start_time', startDate.toISOString())
    .lte('start_time', endDate.toISOString())

  return (
    <BookingPage
      user={user}
      availabilities={availabilities || []}
      bookings={bookings || []}
    />
  )
}