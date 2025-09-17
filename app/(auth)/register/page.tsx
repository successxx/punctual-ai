// UI Components: Lead Intro, Feature Grid (Cards), Checklist, Info Pill Group, CTA Band
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
import { Action } from '@/components/editorial/ui/Action'
import '@/styles/editorial.tokens.css'

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
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <Toaster position="top-center" />
      <Canvas width="narrow">
        <Strip>
          <div style={{ paddingTop: 'var(--baseline-12)', paddingBottom: 'var(--baseline-8)' }}>
            {/* Lead Intro */}
            <div style={{
              padding: 'var(--baseline-4) var(--baseline-6)',
              backgroundColor: 'var(--color-paper-shade)',
              borderRadius: 'var(--radius-soft)',
              marginBottom: 'var(--baseline-6)'
            }}>
              <Display align="center">
                <span style={{ fontWeight: '300', letterSpacing: '-0.02em' }}>punctual.ai</span>
              </Display>
              <Deck align="center" style={{
                marginTop: 'var(--baseline-2)',
                fontSize: 'var(--fs-l)',
                lineHeight: '1.5',
                color: 'var(--color-ink-2)'
              }}>
                Start scheduling smarter today
              </Deck>
            </div>

            {/* Feature Grid (Cards) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--baseline-3)',
              marginBottom: 'var(--baseline-6)'
            }}>
              <div style={{
                padding: 'var(--baseline-3)',
                border: '1px solid var(--color-rule)',
                borderRadius: 'var(--radius-micro)',
                backgroundColor: 'var(--color-paper)'
              }}>
                <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', marginBottom: 'var(--baseline)' }}>Quick Setup</h3>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Get started in under 60 seconds</p>
              </div>
              <div style={{
                padding: 'var(--baseline-3)',
                border: '1px solid var(--color-rule)',
                borderRadius: 'var(--radius-micro)',
                backgroundColor: 'var(--color-paper)'
              }}>
                <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', marginBottom: 'var(--baseline)' }}>Secure</h3>
                <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-3)' }}>Your data is always protected</p>
              </div>
            </div>

            {/* Checklist */}
            <div style={{
              padding: 'var(--baseline-3)',
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-rule)',
              borderRadius: 'var(--radius-micro)',
              marginBottom: 'var(--baseline-4)'
            }}>
              <h3 style={{ fontSize: 'var(--fs-s)', fontWeight: '500', marginBottom: 'var(--baseline-2)' }}>What you'll need:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>✓ Your full name</li>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)', marginBottom: 'var(--baseline)' }}>✓ Valid email address</li>
                <li style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-ink-2)' }}>✓ Secure password (6+ characters)</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: 'var(--baseline-4)', maxWidth: '400px', margin: 'var(--baseline-4) auto 0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--baseline-3)' }}>
                <FormInput
                  id="name"
                  label="Full Name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />

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

                <FormInput
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

            </form>

            {/* Info Pill Group */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--baseline)',
              justifyContent: 'center',
              marginTop: 'var(--baseline-4)',
              marginBottom: 'var(--baseline-4)'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '4px var(--baseline-2)',
                backgroundColor: 'var(--color-paper-shade)',
                border: '1px solid var(--color-rule)',
                borderRadius: '100px',
                fontSize: 'var(--fs-xs)',
                color: 'var(--color-ink-3)'
              }}>Free forever</span>
              <span style={{
                display: 'inline-block',
                padding: '4px var(--baseline-2)',
                backgroundColor: 'var(--color-paper-shade)',
                border: '1px solid var(--color-rule)',
                borderRadius: '100px',
                fontSize: 'var(--fs-xs)',
                color: 'var(--color-ink-3)'
              }}>No credit card</span>
              <span style={{
                display: 'inline-block',
                padding: '4px var(--baseline-2)',
                backgroundColor: 'var(--color-paper-shade)',
                border: '1px solid var(--color-rule)',
                borderRadius: '100px',
                fontSize: 'var(--fs-xs)',
                color: 'var(--color-ink-3)'
              }}>Cancel anytime</span>
            </div>

            {/* CTA Band (Text-Only) */}
            <div style={{
              padding: 'var(--baseline-3)',
              backgroundColor: 'rgba(0, 102, 255, 0.05)',
              borderLeft: '3px solid var(--color-accent)',
              borderRadius: 'var(--radius-micro)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: 'var(--fs-s)', color: 'var(--color-ink)', marginBottom: 'var(--baseline)' }}>
                Already have an account?
              </p>
              <Link
                href="/login"
                style={{
                  display: 'inline-block',
                  padding: 'var(--baseline) var(--baseline-3)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-paper)',
                  borderRadius: 'var(--radius-micro)',
                  fontSize: 'var(--fs-s)',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'opacity var(--transition-base)'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}