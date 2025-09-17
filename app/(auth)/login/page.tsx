'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowRight, Lock, Mail, Shield, Zap, Clock } from 'lucide-react'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead, Prose } from '@/components/premium/Typography'
import { Button } from '@/components/premium/Button'
import { Card, CardBody } from '@/components/premium/Card'
import { FormField, Label, Input, HelperText } from '@/components/premium/Form'

// Load design tokens
import '@/styles/design-tokens.css'

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

      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success('Login successful!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--fs-sm)',
          },
        }}
      />

      <Navigation />

      <Main>
        <Section spacing="spacious">
          <Container size="narrow">
            {/* Hero */}
            <div className="text-center mb-[var(--space-8)]">
              <Eyebrow variant="accent">Welcome Back</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                Sign in to punctual.ai
              </Headline>
              <Lead align="center">
                Access your dashboard and manage all your bookings in one place.
              </Lead>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-[var(--space-4)] mb-[var(--space-8)]">
              <Card variant="bordered" padding="tight">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-3)]">
                    <Shield className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <h3 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] mb-[var(--space-1)]">
                    Secure authentication
                  </h3>
                  <p className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                    with encrypted passwords
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered" padding="tight">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-3)]">
                    <Zap className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <h3 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] mb-[var(--space-1)]">
                    Instant access
                  </h3>
                  <p className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                    to your scheduling dashboard
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered" padding="tight">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-3)]">
                    <Clock className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <h3 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] mb-[var(--space-1)]">
                    Seamless calendar
                  </h3>
                  <p className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                    management tools
                  </p>
                </CardBody>
              </Card>
            </div>

            {/* Quote */}
            <Card variant="glass" className="mb-[var(--space-8)]">
              <CardBody>
                <blockquote className="text-center">
                  <p className="text-[var(--fs-lg)] font-[var(--fw-light)] text-[var(--text-primary)] mb-[var(--space-3)] italic">
                    "Scheduling made simple and elegant."
                  </p>
                  <cite className="text-[var(--fs-sm)] text-[var(--text-tertiary)] not-italic">
                    — Welcome back to punctual.ai
                  </cite>
                </blockquote>
              </CardBody>
            </Card>

            {/* Login Form */}
            <Card variant="elevated" className="max-w-md mx-auto">
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-[var(--space-5)]">
                  <FormField>
                    <Label htmlFor="email" required>
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="password" required>
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      autoComplete="current-password"
                    />
                  </FormField>

                  <div className="flex items-center justify-between text-[var(--fs-sm)]">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-[var(--border-default)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                      />
                      <span className="text-[var(--text-secondary)]">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[var(--brand-primary)] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </CardBody>
            </Card>

            {/* Sign Up CTA */}
            <div className="text-center mt-[var(--space-8)]">
              <p className="text-[var(--fs-sm)] text-[var(--text-secondary)] mb-[var(--space-3)]">
                New to punctual.ai?
              </p>
              <p className="text-[var(--fs-base)] text-[var(--text-primary)] mb-[var(--space-4)]">
                Create your free account and start scheduling meetings effortlessly.
              </p>
              <Button
                href="/register"
                variant="secondary"
                size="large"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Sign up for free
              </Button>
            </div>

            {/* Features List */}
            <div className="mt-[var(--space-10)] grid md:grid-cols-2 gap-[var(--space-6)]">
              <div>
                <Headline level={3} size="md" className="mb-[var(--space-3)]">
                  Sign In
                </Headline>
                <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                  Access your dashboard and manage all your bookings in one place.
                </p>
                <ul className="space-y-[var(--space-2)]">
                  <li className="flex items-start space-x-2">
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                      View bookings
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                      Set availability
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[var(--brand-primary)] mt-1">•</span>
                    <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                      Manage settings
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <Headline level={3} size="md" className="mb-[var(--space-3)]">
                  Key Benefits
                </Headline>
                <ul className="space-y-[var(--space-3)]">
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                      Secure authentication with encrypted passwords
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                      Instant access to your scheduling dashboard
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                      Seamless calendar management tools
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      </Main>
    </Layout>
  )
}