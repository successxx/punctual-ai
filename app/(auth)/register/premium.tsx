'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowRight, CheckCircle, Sparkles, Award, TrendingUp } from 'lucide-react'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead } from '@/components/premium/Typography'
import { Button } from '@/components/premium/Button'
import { Card, CardBody } from '@/components/premium/Card'
import { FormField, Label, Input, HelperText } from '@/components/premium/Form'

// Load design tokens
import '@/styles/design-tokens.css'

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
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      toast.error((error as Error).message)
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
              <Eyebrow variant="accent">Get Started</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                Create your punctual.ai account
              </Headline>
              <Lead align="center">
                Start scheduling smarter today
              </Lead>
            </div>

            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-[var(--space-4)] mb-[var(--space-8)]">
              <Card variant="bordered" padding="tight">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-3)]">
                    <Sparkles className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <h3 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] mb-[var(--space-1)]">
                    Quick Setup
                  </h3>
                  <p className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                    Get started in under 60 seconds
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered" padding="tight">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-3)]">
                    <Award className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <h3 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] mb-[var(--space-1)]">
                    Secure
                  </h3>
                  <p className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                    Your data is always protected
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered" padding="tight">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-3)]">
                    <TrendingUp className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <h3 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] mb-[var(--space-1)]">
                    Growth Ready
                  </h3>
                  <p className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                    Scale as your business grows
                  </p>
                </CardBody>
              </Card>
            </div>

            {/* Registration Form */}
            <Card variant="elevated" className="max-w-md mx-auto mb-[var(--space-8)]">
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-[var(--space-5)]">
                  <FormField>
                    <Label htmlFor="name" required>
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      autoComplete="name"
                      autoFocus
                    />
                  </FormField>

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
                    />
                    <HelperText>
                      We&apos;ll never share your email with anyone else
                    </HelperText>
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
                      autoComplete="new-password"
                    />
                    <HelperText>
                      Must be at least 6 characters long
                    </HelperText>
                  </FormField>

                  <FormField>
                    <Label htmlFor="confirmPassword" required>
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      autoComplete="new-password"
                    />
                  </FormField>

                  <div className="space-y-[var(--space-3)]">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-[var(--border-default)] text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
                        required
                      />
                      <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                        I agree to the{' '}
                        <Link href="/terms" className="text-[var(--brand-primary)] hover:underline">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-[var(--brand-primary)] hover:underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </CardBody>
            </Card>

            {/* Sign In CTA */}
            <div className="text-center mb-[var(--space-8)]">
              <p className="text-[var(--fs-sm)] text-[var(--text-secondary)] mb-[var(--space-3)]">
                Already have an account?
              </p>
              <Button
                href="/login"
                variant="secondary"
                size="large"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Sign in instead
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-[var(--space-4)] mb-[var(--space-8)]">
              <span className="inline-flex items-center px-[var(--space-3)] py-[var(--space-2)] bg-[var(--bg-secondary)] rounded-full text-[var(--fs-xs)] text-[var(--text-secondary)]">
                Free forever
              </span>
              <span className="inline-flex items-center px-[var(--space-3)] py-[var(--space-2)] bg-[var(--bg-secondary)] rounded-full text-[var(--fs-xs)] text-[var(--text-secondary)]">
                No credit card
              </span>
              <span className="inline-flex items-center px-[var(--space-3)] py-[var(--space-2)] bg-[var(--bg-secondary)] rounded-full text-[var(--fs-xs)] text-[var(--text-secondary)]">
                Cancel anytime
              </span>
            </div>

            {/* Benefits Section */}
            <Card variant="glass">
              <CardBody>
                <Headline level={3} size="md" align="center" className="mb-[var(--space-6)]">
                  What you&apos;ll need
                </Headline>
                <div className="grid md:grid-cols-2 gap-[var(--space-6)]">
                  <div>
                    <h4 className="text-[var(--fs-base)] font-[var(--fw-semibold)] mb-[var(--space-3)]">
                      To get started
                    </h4>
                    <ul className="space-y-[var(--space-2)]">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Your full name
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Valid email address
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Secure password (6+ characters)
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[var(--fs-base)] font-[var(--fw-semibold)] mb-[var(--space-3)]">
                      What you&apos;ll get
                    </h4>
                    <ul className="space-y-[var(--space-2)]">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Professional scheduling page
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Unlimited bookings
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Calendar integration
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Lead Intro Text */}
            <div className="mt-[var(--space-10)] text-center">
              <Card variant="bordered" className="inline-block">
                <CardBody>
                  <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                    punctual.ai
                  </Headline>
                  <p className="text-[var(--fs-lg)] text-[var(--text-secondary)] max-w-md">
                    Start scheduling smarter today
                  </p>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>
      </Main>
    </Layout>
  )
}