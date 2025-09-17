'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { Deck } from '@/components/editorial/typography/Deck'
import { FormInput } from '@/components/editorial/forms/FormInput'
import '@/styles/editorial.tokens.css'

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
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <Toaster position="top-center" />
      <Canvas width="narrow">
        <Strip>
          <div style={{ paddingTop: 'var(--baseline-12)', paddingBottom: 'var(--baseline-8)' }}>
            <Display align="center">
              <span style={{ fontWeight: '300', letterSpacing: '-0.02em' }}>punctual.ai</span>
            </Display>
            <Deck align="center" style={{ marginTop: 'var(--baseline-2)' }}>
              Sign in to your account
            </Deck>

            <form onSubmit={handleSubmit} style={{ marginTop: 'var(--baseline-8)', maxWidth: '400px', margin: 'var(--baseline-8) auto 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-3)' }}>
                <FormInput
                  id="email"
                  label="Email Address"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />

                <FormInput
                  id="password"
                  label="Password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: 'var(--baseline-6)',
                  padding: 'var(--baseline-2) var(--baseline-3)',
                  backgroundColor: 'var(--color-ink)',
                  color: 'var(--color-paper)',
                  border: 'none',
                  borderRadius: 'var(--radius-micro)',
                  fontSize: 'var(--fs-s)',
                  fontWeight: '500',
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'opacity var(--transition-base)'
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <div style={{
                textAlign: 'center',
                marginTop: 'var(--baseline-4)',
                fontSize: 'var(--fs-xs)',
                color: 'var(--color-ink-3)'
              }}>
                <span>Don't have an account? </span>
                <Link
                  href="/register"
                  style={{
                    color: 'var(--color-accent)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '2px'
                  }}
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}