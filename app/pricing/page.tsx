'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Check, X, Sparkles, BarChart3, Link, Users, Clock, Shield, Zap, Mail, Palette, FileText, Globe, Download } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  // Check if user is logged in
  useState(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  })

  const handleGetStarted = async (tier: 'free' | 'premium') => {
    setLoading(tier)

    if (!user) {
      // Redirect to signup with tier preference
      router.push(`/register?plan=${tier}`)
      return
    }

    if (tier === 'free') {
      // Free users go directly to dashboard
      router.push('/dashboard')
    } else {
      // Premium users go to Stripe checkout
      try {
        const response = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            email: user.email,
          }),
        })

        const { url } = await response.json()
        if (url) {
          window.location.href = url
        }
      } catch (error) {
        console.error('Error creating checkout:', error)
        setLoading(null)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Start free, upgrade when you need more power
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 relative">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600 ml-2">forever</span>
              </div>
              <p className="text-gray-600 mt-4">
                Perfect for getting started with basic scheduling
              </p>
            </div>

            <Button
              onClick={() => handleGetStarted('free')}
              disabled={loading !== null}
              className="w-full mb-8 bg-gray-900 hover:bg-gray-800"
            >
              {loading === 'free' ? 'Loading...' : 'Start Free'}
            </Button>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Unlimited bookings</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Basic availability management</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Email notifications</span>
              </div>
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Standard booking page</span>
              </div>
              <div className="flex items-start">
                <X className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Custom booking URLs</span>
              </div>
              <div className="flex items-start">
                <X className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Analytics & insights</span>
              </div>
              <div className="flex items-start">
                <X className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Priority support</span>
              </div>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl p-8 relative text-white">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                Premium <Sparkles className="w-5 h-5 ml-2" />
              </h2>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-blue-100 ml-2">/month</span>
              </div>
              <p className="text-blue-100 mt-4">
                Everything you need to scale your scheduling
              </p>
            </div>

            <Button
              onClick={() => handleGetStarted('premium')}
              disabled={loading !== null}
              className="w-full mb-8 bg-white text-blue-600 hover:bg-gray-100 font-bold"
            >
              {loading === 'premium' ? 'Loading...' : 'Start Premium Trial'}
            </Button>

            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="font-medium">Everything in Free, plus:</span>
              </div>
              <div className="flex items-start">
                <Zap className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Custom booking URLs (punctual.ai/yourname)</span>
              </div>
              <div className="flex items-start">
                <BarChart3 className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Analytics dashboard & booking insights</span>
              </div>
              <div className="flex items-start">
                <Palette className="w-5 h-5 text-blue-300 mr-3 mt-0.5 flex-shrink-0" />
                <span>Custom branding & colors</span>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-purple-300 mr-3 mt-0.5 flex-shrink-0" />
                <span>Advanced time slot controls</span>
              </div>
              <div className="flex items-start">
                <FileText className="w-5 h-5 text-pink-300 mr-3 mt-0.5 flex-shrink-0" />
                <span>Custom booking forms & questions</span>
              </div>
              <div className="flex items-start">
                <Download className="w-5 h-5 text-indigo-300 mr-3 mt-0.5 flex-shrink-0" />
                <span>Export bookings to CSV/Excel</span>
              </div>
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-red-300 mr-3 mt-0.5 flex-shrink-0" />
                <span>Priority support & 99.9% uptime SLA</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">
                Yes! You can cancel or change your plan anytime from your account settings.
                No questions asked.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">What happens to my data if I downgrade?</h3>
              <p className="text-gray-600">
                Your data is always yours. If you downgrade, you'll keep all your bookings
                and history, but premium features will be disabled.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">
                Start with our free plan to test everything out. When you're ready for
                premium features, upgrade with confidence knowing you can cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}