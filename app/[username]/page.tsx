'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import BookingPage from '@/components/BookingPage'

export default function CustomBookingPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserByUsername()
  }, [params.username])

  async function loadUserByUsername() {
    try {
      // Check if this is a custom URL for a premium user
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, name, bio, avatar_url, subscription_tier')
        .or(`username.eq.${params.username},custom_booking_url.eq.${params.username}`)
        .single()

      if (!profile) {
        notFound()
      }

      // Only premium users can have custom URLs
      if (profile.subscription_tier !== 'premium') {
        notFound()
      }

      setUser(profile)
    } catch (error) {
      console.error('Error loading user:', error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    notFound()
  }

  return <BookingPage user={user} availabilities={[]} bookings={[]} />
}
