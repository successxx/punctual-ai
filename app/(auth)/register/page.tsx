'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { Canvas, Strip, Display, Deck, Action } from '@/components/editorial'
import { FormField } from '@/components/editorial/forms/FormField'
import { InlineCTA } from '@/components/editorial/ui/InlineCTA'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      toast.success('Registration successful! Please check your email.')

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Toaster position="top-center" />

      <Strip spacing="loose" className="flex items-center justify-center">
        <Canvas width="narrow">
          <div className="text-center mb-[var(--baseline-6)]">
            <Display level={1} className="mb-[var(--baseline-2)]">
              punctual.ai
            </Display>
            <Deck size="normal">
              Create your account
            </Deck>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-[var(--baseline-4)] max-w-sm mx-auto"
            noValidate
          >
            <FormField
              id="name"
              label="Full Name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              autoComplete="name"
            />

            <FormField
              id="email"
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              autoComplete="email"
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              autoComplete="new-password"
            />

            <FormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              autoComplete="new-password"
            />

            <Action
              type="submit"
              disabled={loading}
              size="medium"
              className="w-full"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Action>

            <div className="text-center pt-[var(--baseline-2)]">
              <span className="text-[var(--text-secondary)] text-[var(--fs-s)]">
                Already have an account?{' '}
              </span>
              <InlineCTA href="/login">
                Sign in
              </InlineCTA>
            </div>
          </form>
        </Canvas>
      </Strip>
    </main>
  )
}