'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { Canvas, Strip, Display, Deck, Action } from '@/components/editorial'
import { FormField } from '@/components/editorial/forms/FormField'
import { InlineCTA } from '@/components/editorial/ui/InlineCTA'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Store user data in localStorage for client-side access
      localStorage.setItem('user', JSON.stringify(data.user))

      toast.success('Login successful!')

      // Redirect to dashboard
      router.push('/dashboard')
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
              Sign in to your account
            </Deck>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-[var(--baseline-4)] max-w-sm mx-auto"
            noValidate
          >
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
              autoComplete="current-password"
            />

            <Action
              type="submit"
              disabled={loading}
              size="medium"
              className="w-full"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Action>

            <div className="text-center pt-[var(--baseline-2)]">
              <span className="text-[var(--text-secondary)] text-[var(--fs-s)]">
                Don't have an account?{' '}
              </span>
              <InlineCTA href="/register">
                Sign up
              </InlineCTA>
            </div>
          </form>
        </Canvas>
      </Strip>
    </main>
  )
}