// UI Components: Pull Quote, Two-Column Split, Callout—Accent, Key Takeaways
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

            {/* Pull Quote */}
            <blockquote style={{
              margin: 'var(--baseline-4) 0',
              padding: 'var(--baseline-3)',
              borderLeft: '4px solid var(--color-accent)',
              backgroundColor: 'var(--color-paper-shade)',
              borderRadius: '0 var(--radius-micro) var(--radius-micro) 0'
            }}>
              <p style={{
                fontSize: 'var(--fs-m)',
                fontStyle: 'italic',
                color: 'var(--color-ink)',
                marginBottom: 'var(--baseline-2)'
              }}>
                "Scheduling made simple and elegant."
              </p>
              <cite style={{
                fontSize: 'var(--fs-xs)',
                color: 'var(--color-ink-3)',
                fontStyle: 'normal'
              }}>
                — Welcome back to punctual.ai
              </cite>
            </blockquote>

            {/* Two-Column Split */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--baseline-4)',
              marginBottom: 'var(--baseline-6)'
            }}>
              <div>
                <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', marginBottom: 'var(--baseline-2)' }}>Sign In</h3>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)', lineHeight: '1.5' }}>
                  Access your dashboard and manage all your bookings in one place.
                </p>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-rule)', paddingLeft: 'var(--baseline-4)' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>• View bookings</li>
                  <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>• Set availability</li>
                  <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)' }}>• Manage settings</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: 'var(--baseline-4)', maxWidth: '400px', margin: 'var(--baseline-4) auto 0' }}>
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

            </form>

            {/* Callout—Accent */}
            <aside style={{
              marginTop: 'var(--baseline-6)',
              padding: 'var(--baseline-3)',
              backgroundColor: 'var(--color-paper)',
              borderTop: '3px solid var(--color-accent)',
              borderLeft: '1px solid var(--color-rule)',
              borderRight: '1px solid var(--color-rule)',
              borderBottom: '1px solid var(--color-rule)',
              borderRadius: 'var(--radius-micro)'
            }}>
              <p style={{ fontSize: 'var(--fs-s)', fontWeight: '500', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                New to punctual.ai?
              </p>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline-2)' }}>
                Create your free account and start scheduling meetings effortlessly.
              </p>
              <Link
                href="/register"
                style={{
                  display: 'inline-block',
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--color-accent)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px'
                }}
              >
                Sign up for free →
              </Link>
            </aside>

            {/* Key Takeaways */}
            <div style={{
              marginTop: 'var(--baseline-6)',
              padding: 'var(--baseline-3)',
              border: '2px solid var(--color-rule)',
              borderRadius: 'var(--radius-micro)',
              backgroundColor: 'var(--color-paper-shade)'
            }}>
              <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', marginBottom: 'var(--baseline-2)' }}>
                Key Benefits
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                  • Secure authentication with encrypted passwords
                </li>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                  • Instant access to your scheduling dashboard
                </li>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink)' }}>
                  • Seamless calendar management tools
                </li>
              </ul>
            </div>
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}