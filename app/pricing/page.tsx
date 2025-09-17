'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Check, X, Sparkles, BarChart3, Users, Clock, Shield, Zap,
  Mail, Palette, FileText, Globe, Download, CreditCard,
  TrendingUp, Award, Infinity, Calendar, Headphones, Lock
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead, Prose } from '@/components/premium/Typography'
import { Button } from '@/components/premium/Button'
import { Card, CardBody } from '@/components/premium/Card'

// Load design tokens
import '@/styles/design-tokens.css'

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  // Check if user is logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

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

  const monthlyPrice = 9.99
  const annualPrice = 95.88
  const currentPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice / 12

  return (
    <Layout>
      <Navigation />

      <Main>
        {/* Hero Section */}
        <Section spacing="spacious" background="secondary">
          <Container size="wide">
            <div className="text-center">
              <Eyebrow variant="accent">Simple, Transparent Pricing</Eyebrow>
              <Headline level={1} size="3xl" align="center" className="mb-[var(--space-4)]">
                Start free, upgrade when you need more power
              </Headline>
              <Lead align="center" className="mb-[var(--space-6)]">
                Join over 50,000 professionals who save 5+ hours every week with punctual.ai.
                Choose the plan that fits your needs and scale as you grow. No hidden fees,
                no surprises, just simple scheduling that works.
              </Lead>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-[var(--space-4)] mb-[var(--space-8)]">
                <span className="inline-flex items-center px-[var(--space-3)] py-[var(--space-2)] bg-green-500/10 text-green-700 rounded-full text-[var(--fs-xs)] font-[var(--fw-medium)]">
                  <Check className="w-4 h-4 mr-2" />
                  30-day money-back guarantee
                </span>
                <span className="inline-flex items-center px-[var(--space-3)] py-[var(--space-2)] bg-blue-500/10 text-blue-700 rounded-full text-[var(--fs-xs)] font-[var(--fw-medium)]">
                  <Shield className="w-4 h-4 mr-2" />
                  No setup fees
                </span>
                <span className="inline-flex items-center px-[var(--space-3)] py-[var(--space-2)] bg-purple-500/10 text-purple-700 rounded-full text-[var(--fs-xs)] font-[var(--fw-medium)]">
                  <Zap className="w-4 h-4 mr-2" />
                  Cancel anytime
                </span>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-[var(--space-3)] mb-[var(--space-8)]">
                <span className={`text-[var(--fs-sm)] ${billingCycle === 'monthly' ? 'text-[var(--text-primary)] font-[var(--fw-semibold)]' : 'text-[var(--text-tertiary)]'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                  className="relative inline-flex h-8 w-14 items-center rounded-full bg-[var(--bg-tertiary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-[var(--brand-primary)] transition-transform ${
                      billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-[var(--fs-sm)] ${billingCycle === 'annual' ? 'text-[var(--text-primary)] font-[var(--fw-semibold)]' : 'text-[var(--text-tertiary)]'}`}>
                  Annual
                </span>
                {billingCycle === 'annual' && (
                  <span className="px-[var(--space-2)] py-[var(--space-1)] bg-green-500/10 text-green-700 rounded-full text-[var(--fs-xs)] font-[var(--fw-medium)]">
                    Save 20%
                  </span>
                )}
              </div>
            </div>
          </Container>
        </Section>

        {/* Pricing Cards */}
        <Section spacing="default">
          <Container size="wide">
            <div className="grid lg:grid-cols-2 gap-[var(--space-6)] max-w-5xl mx-auto">
              {/* Free Tier */}
              <Card variant="bordered" className="relative">
                <CardBody className="p-[var(--space-8)]">
                  <div className="mb-[var(--space-6)]">
                    <Headline level={2} size="lg" className="mb-[var(--space-3)]">
                      Free
                    </Headline>
                    <div className="flex items-baseline mb-[var(--space-4)]">
                      <span className="text-[var(--fs-3xl)] font-[var(--fw-bold)]">$0</span>
                      <span className="text-[var(--text-tertiary)] ml-[var(--space-2)]">forever</span>
                    </div>
                    <p className="text-[var(--text-secondary)]">
                      Perfect for freelancers, students, and anyone just getting started
                      with professional scheduling. Everything you need to eliminate
                      back-and-forth emails forever.
                    </p>
                  </div>

                  <Button
                    onClick={() => handleGetStarted('free')}
                    disabled={loading !== null}
                    variant="secondary"
                    size="large"
                    fullWidth
                    className="mb-[var(--space-6)]"
                  >
                    {loading === 'free' ? 'Loading...' : 'Start Free'}
                  </Button>

                  <div className="space-y-[var(--space-3)]">
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Unlimited bookings</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Basic availability management</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Email notifications</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Standard booking page</span>
                    </div>
                    <div className="flex items-start">
                      <X className="w-5 h-5 text-[var(--text-quaternary)] mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-quaternary)]">Custom booking URLs</span>
                    </div>
                    <div className="flex items-start">
                      <X className="w-5 h-5 text-[var(--text-quaternary)] mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-quaternary)]">Analytics & insights</span>
                    </div>
                    <div className="flex items-start">
                      <X className="w-5 h-5 text-[var(--text-quaternary)] mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-quaternary)]">Priority support</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Premium Tier */}
              <Card variant="gradient" className="relative border-2 border-[var(--brand-primary)]">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[var(--brand-primary)] to-purple-600 text-white text-[var(--fs-xs)] font-[var(--fw-bold)] px-[var(--space-4)] py-[var(--space-2)] rounded-full">
                    MOST POPULAR
                  </span>
                </div>

                <CardBody className="p-[var(--space-8)]">
                  <div className="mb-[var(--space-6)]">
                    <Headline level={2} size="lg" className="mb-[var(--space-3)] flex items-center">
                      Premium <Sparkles className="w-5 h-5 ml-[var(--space-2)] text-[var(--brand-primary)]" />
                    </Headline>
                    <div className="flex items-baseline mb-[var(--space-4)]">
                      <span className="text-[var(--fs-3xl)] font-[var(--fw-bold)]">
                        ${currentPrice.toFixed(2)}
                      </span>
                      <span className="text-[var(--text-tertiary)] ml-[var(--space-2)]">
                        /{billingCycle === 'monthly' ? 'month' : 'month (billed annually)'}
                      </span>
                    </div>
                    {billingCycle === 'annual' && (
                      <p className="text-green-600 text-[var(--fs-sm)] mb-[var(--space-2)]">
                        Save ${(monthlyPrice * 12 - annualPrice).toFixed(2)} per year
                      </p>
                    )}
                    <p className="text-[var(--text-secondary)]">
                      For professionals and growing businesses who want to make a
                      lasting impression while saving hours every week. Unlock powerful
                      features that help you work smarter, not harder.
                    </p>
                  </div>

                  <Button
                    onClick={() => handleGetStarted('premium')}
                    disabled={loading !== null}
                    variant="primary"
                    size="large"
                    fullWidth
                    className="mb-[var(--space-6)]"
                  >
                    {loading === 'premium' ? 'Loading...' : 'Start Premium Trial'}
                  </Button>

                  <div className="space-y-[var(--space-3)]">
                    <div className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)] font-[var(--fw-medium)]">Everything in Free, plus:</span>
                    </div>
                    <div className="flex items-start">
                      <Zap className="w-5 h-5 text-yellow-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Custom booking URLs (punctual.ai/yourname)</span>
                    </div>
                    <div className="flex items-start">
                      <BarChart3 className="w-5 h-5 text-blue-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Analytics dashboard & booking insights</span>
                    </div>
                    <div className="flex items-start">
                      <Palette className="w-5 h-5 text-purple-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Custom branding & colors</span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-indigo-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Advanced time slot controls</span>
                    </div>
                    <div className="flex items-start">
                      <FileText className="w-5 h-5 text-pink-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Custom booking forms & questions</span>
                    </div>
                    <div className="flex items-start">
                      <Download className="w-5 h-5 text-teal-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Export bookings to CSV/Excel</span>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-red-500 mr-[var(--space-3)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)]">Priority support & 99.9% uptime SLA</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Value Proposition */}
        <Section spacing="spacious" background="secondary">
          <Container size="wide">
            <Card variant="gradient" className="text-center p-[var(--space-10)]">
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-6)]">
                Why professionals choose punctual.ai
              </Headline>

              <div className="grid md:grid-cols-3 gap-[var(--space-8)] mb-[var(--space-8)]">
                <div className="text-center">
                  <div className="text-[var(--fs-3xl)] font-[var(--fw-bold)] text-[var(--brand-primary)] mb-[var(--space-2)]">
                    5 hours
                  </div>
                  <p className="text-[var(--text-secondary)]">Saved per week on average</p>
                </div>
                <div className="text-center">
                  <div className="text-[var(--fs-3xl)] font-[var(--fw-bold)] text-[var(--brand-primary)] mb-[var(--space-2)]">
                    87%
                  </div>
                  <p className="text-[var(--text-secondary)]">Reduction in no-shows</p>
                </div>
                <div className="text-center">
                  <div className="text-[var(--fs-3xl)] font-[var(--fw-bold)] text-[var(--brand-primary)] mb-[var(--space-2)]">
                    3.2x
                  </div>
                  <p className="text-[var(--text-secondary)]">More meetings booked</p>
                </div>
              </div>

              <blockquote className="max-w-3xl mx-auto">
                <p className="text-[var(--fs-lg)] text-[var(--text-secondary)] italic mb-[var(--space-3)]">
                  "punctual.ai paid for itself in the first week. The time I save on scheduling
                  alone is worth 10x the price."
                </p>
                <cite className="text-[var(--fs-sm)] text-[var(--text-tertiary)] not-italic">
                  — Michael Torres, Sales Director
                </cite>
              </blockquote>
            </Card>
          </Container>
        </Section>

        {/* Feature Comparison Table */}
        <Section spacing="spacious">
          <Container size="wide">
            <Headline level={2} size="xl" align="center" className="mb-[var(--space-8)]">
              Compare Plans in Detail
            </Headline>

            <Card variant="elevated" className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-default)]">
                  <tr>
                    <th className="text-left px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-[var(--text-primary)]">
                      Features
                    </th>
                    <th className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-[var(--text-primary)]">
                      Free
                    </th>
                    <th className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-[var(--text-primary)]">
                      <span className="flex items-center justify-center">
                        Premium <Sparkles className="w-4 h-4 ml-2 text-[var(--brand-primary)]" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-secondary)]">Monthly bookings</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)]">Unlimited</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-green-600">Unlimited</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-secondary)]">Calendar integrations</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)]">1 calendar</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-green-600">Unlimited calendars</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-secondary)]">Meeting types</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)]">3 types</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-green-600">Unlimited types</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-secondary)]">Custom booking URL</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)]">-</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-green-600">✓</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-secondary)]">Remove punctual.ai branding</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)]">-</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-green-600">✓</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-secondary)]">Analytics & insights</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)]">Basic</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-green-600">Advanced</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-secondary)]">Priority support</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)]">Email only</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-green-600">24/7 priority</td>
                  </tr>
                  <tr className="hover:bg-[var(--bg-secondary)] transition-colors">
                    <td className="px-[var(--space-6)] py-[var(--space-4)] text-[var(--text-secondary)]">API access</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)]">-</td>
                    <td className="text-center px-[var(--space-6)] py-[var(--space-4)] font-[var(--fw-semibold)] text-green-600">Full access</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Container>
        </Section>

        {/* FAQ Section */}
        <Section spacing="spacious" background="secondary">
          <Container size="narrow">
            <Headline level={2} size="xl" align="center" className="mb-[var(--space-8)]">
              Frequently Asked Questions
            </Headline>

            <div className="space-y-[var(--space-4)]">
              <Card variant="bordered">
                <CardBody>
                  <h3 className="font-[var(--fw-semibold)] text-[var(--fs-base)] mb-[var(--space-3)]">
                    Can I switch plans anytime?
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Absolutely! You can upgrade, downgrade, or cancel your plan anytime from your
                    account settings. When you upgrade, you'll be prorated for the remainder of
                    the month. If you downgrade, the change takes effect at your next billing cycle.
                    No questions asked, no hoops to jump through.
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody>
                  <h3 className="font-[var(--fw-semibold)] text-[var(--fs-base)] mb-[var(--space-3)]">
                    What happens to my data if I cancel?
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Your data is always yours. If you cancel or downgrade, you'll keep all your
                    bookings, client information, and history. Premium features will be disabled,
                    but you can always re-enable them by upgrading again. We maintain your data
                    for 90 days after cancellation, giving you plenty of time to export or reactivate.
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody>
                  <h3 className="font-[var(--fw-semibold)] text-[var(--fs-base)] mb-[var(--space-3)]">
                    Is there a free trial for Premium?
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    We believe in letting you experience the value first. Start with our generous
                    free plan to test the core features. When you're ready for premium features,
                    upgrade with confidence knowing you have a 30-day money-back guarantee.
                    If you're not completely satisfied, we'll refund your payment—no questions asked.
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody>
                  <h3 className="font-[var(--fw-semibold)] text-[var(--fs-base)] mb-[var(--space-3)]">
                    Do you offer discounts for annual billing?
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Yes! While we show monthly pricing for clarity, you can save 20% with annual
                    billing. That's just $95.88 per year (equivalent to getting 2.5 months free).
                    Annual plans also include priority onboarding support to help you get the most
                    value from day one.
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody>
                  <h3 className="font-[var(--fw-semibold)] text-[var(--fs-base)] mb-[var(--space-3)]">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    We accept all major credit cards (Visa, Mastercard, American Express, Discover),
                    debit cards, and can arrange ACH transfers for annual plans. All payments are
                    processed securely through Stripe, with bank-level encryption. We never store
                    your payment details on our servers.
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody>
                  <h3 className="font-[var(--fw-semibold)] text-[var(--fs-base)] mb-[var(--space-3)]">
                    Can I use punctual.ai for my team?
                  </h3>
                  <p className="text-[var(--text-secondary)]">
                    Absolutely! Premium accounts support team scheduling features including round-robin
                    assignment, collective availability, and team analytics. Each team member needs
                    their own account, but we offer volume discounts for 5+ seats. Contact us for
                    custom team pricing.
                  </p>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Trust Section */}
        <Section spacing="default">
          <Container size="wide">
            <div className="text-center">
              <Headline level={3} size="lg" align="center" className="mb-[var(--space-6)]">
                Trusted by leading companies
              </Headline>
              <div className="flex flex-wrap justify-center items-center gap-[var(--space-8)] opacity-60 mb-[var(--space-4)]">
                <div className="text-[var(--text-tertiary)] font-[var(--fw-semibold)] text-[var(--fs-lg)]">Microsoft</div>
                <div className="text-[var(--text-tertiary)] font-[var(--fw-semibold)] text-[var(--fs-lg)]">Google</div>
                <div className="text-[var(--text-tertiary)] font-[var(--fw-semibold)] text-[var(--fs-lg)]">Salesforce</div>
                <div className="text-[var(--text-tertiary)] font-[var(--fw-semibold)] text-[var(--fs-lg)]">HubSpot</div>
                <div className="text-[var(--text-tertiary)] font-[var(--fw-semibold)] text-[var(--fs-lg)]">Slack</div>
              </div>
              <p className="text-[var(--fs-xs)] text-[var(--text-quaternary)]">
                * Employees from these companies use punctual.ai for their scheduling needs
              </p>
            </div>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section spacing="spacious" background="inverse">
          <Container size="narrow">
            <Card variant="glass" className="text-center p-[var(--space-10)]">
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Start saving 5 hours every week
              </Headline>
              <Lead align="center" className="mb-[var(--space-8)] max-w-2xl mx-auto">
                Join thousands of professionals who've eliminated scheduling friction forever.
                No credit card required for free plan. Upgrade anytime.
              </Lead>
              <div className="flex flex-col sm:flex-row gap-[var(--space-4)] justify-center">
                <Button
                  onClick={() => handleGetStarted('free')}
                  variant="secondary"
                  size="large"
                >
                  Start Free
                </Button>
                <Button
                  onClick={() => handleGetStarted('premium')}
                  variant="primary"
                  size="large"
                >
                  Go Premium
                </Button>
              </div>
            </Card>
          </Container>
        </Section>
      </Main>
    </Layout>
  )
}