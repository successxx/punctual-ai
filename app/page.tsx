'use client'

import Link from 'next/link'
import { Calendar, Clock, Users, ArrowRight, Star, Shield, Zap, Globe } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate, Navigation } = JonyDesign

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo size="default" />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/integrations" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Integrations
            </Link>
            <Link href="/login">
              <GlassButton variant="ghost" size="small">Sign In</GlassButton>
            </Link>
            <Link href="/register">
              <GlassButton variant="primary" size="small">Get Started</GlassButton>
            </Link>
          </div>
        </div>
      </Navigation>

      {/* Hero Section */}
      <Section spacing="huge" className="pt-24">
        <Container size="default">
          <div className="text-center mb-20">
            <Animate.FadeIn>
              <Typography.Display className="mb-8">
                Scheduling
                <br />
                <span className="text-gray-400">perfected</span>
              </Typography.Display>
            </Animate.FadeIn>
            <Animate.FadeIn delay={200}>
              <Typography.Body className="text-xl max-w-3xl mx-auto mb-12">
                The most beautiful way to manage your time. AI-powered scheduling that learns from you,
                adapts to your needs, and creates experiences so seamless your clients will never
                want to book any other way.
              </Typography.Body>
            </Animate.FadeIn>
            <Animate.FadeIn delay={400}>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Start Free <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/features">
                  <GlassButton variant="secondary" size="large">
                    See All Features
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Intelligent by design
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Every feature is crafted with obsessive attention to detail. From AI-powered scheduling
              to seamless integrations, experience the future of appointment booking.
            </Typography.Body>
          </div>

          <Grid cols={3} gap="medium">
            <Animate.FadeIn delay={0}>
              <Card variant="elevated" className="text-center">
                <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-gray-700" />
                </div>
                <Typography.Headline className="mb-4">
                  AI-Powered Intelligence
                </Typography.Headline>
                <Typography.Body>
                  Machine learning algorithms optimize your schedule, predict conflicts, and suggest
                  the perfect meeting times based on your patterns and preferences.
                </Typography.Body>
              </Card>
            </Animate.FadeIn>

            <Animate.FadeIn delay={100}>
              <Card variant="elevated" className="text-center">
                <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-gray-700" />
                </div>
                <Typography.Headline className="mb-4">
                  Enterprise Security
                </Typography.Headline>
                <Typography.Body>
                  Bank-level encryption, SOC 2 compliance, and GDPR protection. Your data and your
                  clients' information is secured with military-grade security protocols.
                </Typography.Body>
              </Card>
            </Animate.FadeIn>

            <Animate.FadeIn delay={200}>
              <Card variant="elevated" className="text-center">
                <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-gray-700" />
                </div>
                <Typography.Headline className="mb-4">
                  Global Integration
                </Typography.Headline>
                <Typography.Body>
                  Connect with 50+ platforms including Google Calendar, Zoom, Stripe, and Salesforce.
                  One unified experience across all your business tools.
                </Typography.Body>
              </Card>
            </Animate.FadeIn>
          </Grid>
        </Container>
      </Section>

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Built for professionals who value their time
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're a consultant closing deals, a coach managing clients, or a recruiter
              filling positions, punctual.ai adapts to your unique workflow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Consultants</h4>
              <p className="text-sm text-gray-600 mb-3">
                Book discovery calls, project meetings, and follow-ups without the email tennis.
                Close deals faster with professional scheduling.
              </p>
              <p className="text-xs text-gray-500">"Reduced scheduling time by 87%"</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Coaches & Trainers</h4>
              <p className="text-sm text-gray-600 mb-3">
                Let clients book sessions, manage recurring appointments, and handle rescheduling
                automatically. Focus on coaching, not admin.
              </p>
              <p className="text-xs text-gray-500">"Doubled client capacity"</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Sales Teams</h4>
              <p className="text-sm text-gray-600 mb-3">
                Qualify leads faster, book demos instantly, and never lose a prospect to scheduling
                friction. Convert more with less effort.
              </p>
              <p className="text-xs text-gray-500">"35% higher conversion rate"</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Service Providers</h4>
              <p className="text-sm text-gray-600 mb-3">
                Manage appointments for multiple services, staff, and locations. Accept bookings 24/7
                while maintaining complete control.
              </p>
              <p className="text-xs text-gray-500">"3x more bookings after hours"</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            How it works
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sign Up</h4>
              <p className="text-sm text-gray-600">Create your free account in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Set Availability</h4>
              <p className="text-sm text-gray-600">Define when you're available to meet</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Your Link</h4>
              <p className="text-sm text-gray-600">Send your unique booking link to clients</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Booked</h4>
              <p className="text-sm text-gray-600">Clients book times that work for everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl text-gray-900 mb-6">
            "punctual.ai has completely transformed how I manage client meetings. No more email tennis!"
          </blockquote>
          <cite className="text-gray-600">
            Sarah Chen, Consultant
          </cite>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-white mb-4">
            Ready to simplify your scheduling?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've ditched the back-and-forth
          </p>
          <Link href="/register">
            <button
              style={{
                padding: '12px 32px',
                backgroundColor: '#ffffff',
                color: '#0066ff',
                border: 'none',
                borderRadius: '2px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              Get Started Free <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-100">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Logo size="default" />
              <Typography.Caption className="mt-2">
                Scheduling perfected through obsessive attention to detail
              </Typography.Caption>
            </div>
            <div className="flex space-x-8">
              <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="/integrations" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Integrations
              </Link>
              <Link href="/security" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Security
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <Typography.Caption>
              © 2024 punctual.ai. Crafted with the same obsessive attention to detail that defines Apple's design philosophy.
            </Typography.Caption>
          </div>
        </Container>
      </footer>
    </div>
  )
}
