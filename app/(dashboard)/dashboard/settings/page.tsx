'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { User, Link, Crown, CreditCard } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [customUrl, setCustomUrl] = useState('')
  const [checkingUrl, setCheckingUrl] = useState(false)
  const [urlAvailable, setUrlAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    loadUserAndProfile()
  }, [])

  async function loadUserAndProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      setProfile(profile)
      setCustomUrl(profile.custom_booking_url || profile.username || '')
    }
  }

  async function checkUrlAvailability(url: string) {
    if (!url || url.length < 3) {
      setUrlAvailable(null)
      return
    }

    setCheckingUrl(true)
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .or(`username.eq.${url},custom_booking_url.eq.${url}`)
      .neq('id', user.id)
      .single()

    setUrlAvailable(!data)
    setCheckingUrl(false)
  }

  async function updateCustomUrl() {
    if (!urlAvailable || !customUrl) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ custom_booking_url: customUrl })
        .eq('id', user.id)

      if (error) throw error

      toast.success('Custom URL updated successfully!')
      await loadUserAndProfile()
    } catch (_error) {
      toast.error('Failed to update custom URL')
    } finally {
      setLoading(false)
    }
  }

  async function handleStripePortal() {
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (_error) {
      toast.error('Failed to open billing portal')
    }
  }

  const isPremium = profile?.subscription_tier === 'premium'

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      {/* Subscription Status */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className={`w-6 h-6 ${isPremium ? 'text-yellow-500' : 'text-gray-400'}`} />
            <div>
              <h2 className="text-xl font-semibold">
                {isPremium ? 'Premium Member' : 'Free Plan'}
              </h2>
              <p className="text-sm text-gray-600">
                {isPremium
                  ? `Active until ${new Date(profile.subscription_current_period_end).toLocaleDateString()}`
                  : 'Upgrade to unlock premium features'}
              </p>
            </div>
          </div>
          {isPremium ? (
            <Button onClick={handleStripePortal} variant="outline">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Billing
            </Button>
          ) : (
            <Button onClick={() => router.push('/pricing')} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Upgrade to Premium
            </Button>
          )}
        </div>
      </Card>

      {/* Custom URL (Premium Only) */}
      {isPremium && (
        <Card className="p-6 mb-8">
          <div className="flex items-center mb-4">
            <Link className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold">Custom Booking URL</h3>
            <span className="ml-2 text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 py-1 rounded-full">
              PREMIUM
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Create a memorable booking link: punctual.ai/{customUrl || 'yourname'}
          </p>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                value={customUrl}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                  setCustomUrl(val)
                  checkUrlAvailability(val)
                }}
                placeholder="yourname"
                className={`${
                  urlAvailable === true
                    ? 'border-green-500'
                    : urlAvailable === false
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {checkingUrl && (
                <p className="text-xs text-gray-500 mt-1">Checking availability...</p>
              )}
              {urlAvailable === true && (
                <p className="text-xs text-green-600 mt-1">✓ Available!</p>
              )}
              {urlAvailable === false && (
                <p className="text-xs text-red-600 mt-1">✗ Already taken</p>
              )}
            </div>
            <Button
              onClick={updateCustomUrl}
              disabled={!urlAvailable || loading || !customUrl}
            >
              Save URL
            </Button>
          </div>
        </Card>
      )}

      {/* Profile Information */}
      <Card className="p-6 mb-8">
        <div className="flex items-center mb-4">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold">Profile Information</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input value={user?.email || ''} disabled />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input
              value={profile?.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
        </div>
      </Card>

      {/* Premium Features Info */}
      {!isPremium && (
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <h3 className="text-lg font-semibold mb-3">Unlock Premium Features</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">✓</span>
              Custom booking URL (punctual.ai/yourname)
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">✓</span>
              Detailed analytics dashboard
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">✓</span>
              Export bookings to CSV/Excel
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">✓</span>
              Custom branding & colors
            </li>
            <li className="flex items-center">
              <span className="text-purple-600 mr-2">✓</span>
              Priority support
            </li>
          </ul>
          <Button
            onClick={() => router.push('/pricing')}
            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Upgrade for $9.99/month
          </Button>
        </Card>
      )}
    </div>
  )
}