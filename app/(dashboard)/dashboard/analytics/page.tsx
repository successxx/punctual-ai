'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card } from '@/components/ui/card'
import { BarChart3, TrendingUp, Users, Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function AnalyticsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [_profile, setProfile] = useState<{ subscription_tier?: string } | null>(null)
  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    thisMonthBookings: 0,
    lastMonthBookings: 0,
    averageBookingsPerWeek: 0,
    mostPopularDay: '',
    mostPopularTime: '',
    upcomingBookings: 0,
    recentBookings: [] as Array<{ id: string; title: string; date: string; time: string; guest_name?: string; start_time: string }>
  })

  useEffect(() => {
    checkPremiumAndLoadAnalytics()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function checkPremiumAndLoadAnalytics() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)

    // Check if user is premium
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single()

    setProfile(profile)

    if (profile?.subscription_tier !== 'premium') {
      router.push('/pricing')
      return
    }

    // Load analytics
    await loadAnalytics(user.id)
  }

  async function loadAnalytics(userId: string) {
    try {
      // Get all bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('host_id', userId)
        .order('created_at', { ascending: false })

      if (bookings) {
        const now = new Date()
        const thisMonth = now.getMonth()
        const thisYear = now.getFullYear()
        const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
        const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear

        // Calculate metrics
        const thisMonthBookings = bookings.filter(b => {
          const d = new Date(b.created_at)
          return d.getMonth() === thisMonth && d.getFullYear() === thisYear
        }).length

        const lastMonthBookings = bookings.filter(b => {
          const d = new Date(b.created_at)
          return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear
        }).length

        const upcomingBookings = bookings.filter(b =>
          new Date(b.start_time) > now && b.status !== 'cancelled'
        ).length

        // Calculate popular day
        const dayCount: Record<number, number> = {}
        bookings.forEach(b => {
          const day = new Date(b.start_time).getDay()
          dayCount[day] = (dayCount[day] || 0) + 1
        })

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const mostPopularDayIndex = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0]
        const mostPopularDay = mostPopularDayIndex ? days[parseInt(mostPopularDayIndex)] : 'N/A'

        // Calculate popular time
        const hourCount: Record<number, number> = {}
        bookings.forEach(b => {
          const hour = new Date(b.start_time).getHours()
          hourCount[hour] = (hourCount[hour] || 0) + 1
        })

        const mostPopularHour = Object.entries(hourCount).sort((a, b) => b[1] - a[1])[0]?.[0]
        const mostPopularTime = mostPopularHour
          ? `${parseInt(mostPopularHour)}:00 - ${parseInt(mostPopularHour) + 1}:00`
          : 'N/A'

        setAnalytics({
          totalBookings: bookings.length,
          thisMonthBookings,
          lastMonthBookings,
          averageBookingsPerWeek: Math.round(bookings.length / 4),
          mostPopularDay,
          mostPopularTime,
          upcomingBookings,
          recentBookings: bookings.slice(0, 5).map(b => ({
            id: b.id,
            title: b.title || 'Meeting',
            date: new Date(b.start_time).toLocaleDateString(),
            time: new Date(b.start_time).toLocaleTimeString(),
            guest_name: b.guest_name,
            start_time: b.start_time
          }))
        })
      }
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  async function exportToCSV() {
    if (!user) return
    
    const { data: bookings } = await supabase
      .from('bookings')
      .select('*')
      .eq('host_id', user.id)
      .order('start_time', { ascending: false })

    if (!bookings) return

    // Convert to CSV
    const headers = ['Date', 'Time', 'Guest Name', 'Guest Email', 'Status', 'Notes']
    const rows = bookings.map(b => [
      new Date(b.start_time).toLocaleDateString(),
      new Date(b.start_time).toLocaleTimeString(),
      b.guest_name || 'N/A',
      b.guest_email || 'N/A',
      b.status || 'pending',
      b.notes || ''
    ])

    const csv = [
      headers.join(','),
      ...rows.map(r => r.map(v => `"${v}"`).join(','))
    ].join('\n')

    // Download
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const growth = analytics.lastMonthBookings > 0
    ? Math.round(((analytics.thisMonthBookings - analytics.lastMonthBookings) / analytics.lastMonthBookings) * 100)
    : 0

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your booking performance and insights</p>
        </div>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export to CSV
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            {growth !== 0 && (
              <span className={`text-sm font-medium ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {growth > 0 ? '+' : ''}{growth}%
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-gray-900">{analytics.totalBookings}</div>
          <p className="text-gray-600 text-sm mt-1">Total Bookings</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{analytics.thisMonthBookings}</div>
          <p className="text-gray-600 text-sm mt-1">This Month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{analytics.upcomingBookings}</div>
          <p className="text-gray-600 text-sm mt-1">Upcoming</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{analytics.averageBookingsPerWeek}</div>
          <p className="text-gray-600 text-sm mt-1">Avg per Week</p>
        </Card>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Popular Times</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Most Popular Day</span>
              <span className="font-medium">{analytics.mostPopularDay}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Most Popular Time</span>
              <span className="font-medium">{analytics.mostPopularTime}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {analytics.recentBookings.length > 0 ? (
              analytics.recentBookings.map((booking, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{booking.guest_name}</span>
                  <span className="text-gray-500">
                    {new Date(booking.start_time).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent bookings</p>
            )}
          </div>
        </Card>
      </div>

      {/* Premium Badge */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">Premium Analytics</h3>
        <p className="text-purple-100">
          You&apos;re getting detailed insights about your booking patterns. Use this data to optimize your availability and grow your business.
        </p>
      </div>
    </div>
  )
}