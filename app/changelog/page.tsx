'use client'

import Link from 'next/link'
import { Sparkles, Zap, Shield, Globe, Users, Code, Palette, TrendingUp, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate, Navigation } = JonyDesign

const updates = [
  {
    version: '3.2.0',
    date: 'January 15, 2024',
    tag: 'NEW',
    tagColor: 'bg-green-100 text-green-700',
    title: 'AI-Powered Meeting Intelligence',
    icon: Sparkles,
    features: [
      'Smart conflict detection prevents double-booking across time zones',
      'Automated meeting prep with agenda suggestions based on past meetings',
      'Intelligent rescheduling finds optimal times for all participants',
      'Meeting analytics dashboard with productivity insights'
    ]
  },
  {
    version: '3.1.0',
    date: 'December 8, 2023',
    tag: 'ENHANCEMENT',
    tagColor: 'bg-blue-100 text-blue-700',
    title: 'Enterprise Security Suite',
    icon: Shield,
    features: [
      'SAML 2.0 SSO support for enterprise authentication',
      'Advanced audit logging with compliance reports',
      'Custom data retention policies and GDPR tools',
      'End-to-end encryption for all calendar data'
    ]
  },
  {
    version: '3.0.0',
    date: 'November 15, 2023',
    tag: 'MAJOR',
    tagColor: 'bg-purple-100 text-purple-700',
    title: 'Complete Design System Overhaul',
    icon: Palette,
    features: [
      'New Jony Ive-inspired minimalist interface',
      '60% faster page load times with optimized rendering',
      'Dark mode with automatic system detection',
      'Accessibility improvements meeting WCAG 2.1 AA standards'
    ]
  },
  {
    version: '2.9.0',
    date: 'October 22, 2023',
    tag: 'INTEGRATION',
    tagColor: 'bg-orange-100 text-orange-700',
    title: 'Expanded Integration Ecosystem',
    icon: Globe,
    features: [
      'Native Salesforce CRM integration',
      'Microsoft Teams meeting creation',
      'Stripe payment processing for paid appointments',
      'Zapier connector with 5000+ app integrations'
    ]
  },
  {
    version: '2.8.0',
    date: 'September 30, 2023',
    tag: 'PERFORMANCE',
    tagColor: 'bg-yellow-100 text-yellow-700',
    title: 'Infrastructure & Performance',
    icon: Zap,
    features: [
      '99.99% uptime SLA for enterprise customers',
      'Global CDN deployment across 45 locations',
      'Database query optimization reducing latency by 70%',
      'Real-time calendar sync with sub-second updates'
    ]
  }
]

const upcomingFeatures = [
  {
    icon: Code,
    title: 'API v3',
    description: 'GraphQL API with real-time subscriptions and webhooks',
    quarter: 'Q1 2024'
  },
  {
    icon: Users,
    title: 'Team Analytics',
    description: 'Advanced team scheduling insights and optimization tools',
    quarter: 'Q1 2024'
  },
  {
    icon: Globe,
    title: 'Mobile Apps',
    description: 'Native iOS and Android apps with offline support',
    quarter: 'Q2 2024'
  },
  {
    icon: TrendingUp,
    title: 'Revenue Optimization',
    description: 'AI-powered pricing suggestions for service providers',
    quarter: 'Q2 2024'
  }
]

export default function ChangelogPage() {
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
            <Link href="/status" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Status
            </Link>
            <Link href="/developers" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Developers
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link href="/login">
              <GlassButton variant="ghost" size="small">Sign In</GlassButton>
            </Link>
          </div>
        </div>
      </Navigation>

      {/* Hero */}
      <Section spacing="huge" className="pt-24 bg-gradient-to-b from-gray-50/50 to-white">
        <Container>
          <div className="text-center mb-20">
            <Animate.FadeIn>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/5 rounded-full mb-8">
                <Clock className="w-4 h-4" />
                <Typography.Caption>Product Updates</Typography.Caption>
              </div>
              <Typography.Display className="mb-8">
                What's new
                <br />
                <span className="text-gray-400">at punctual.ai</span>
              </Typography.Display>
            </Animate.FadeIn>

            <Animate.FadeIn delay={200}>
              <Typography.Body className="text-xl max-w-3xl mx-auto mb-12">
                We ship updates every two weeks. Each release is carefully crafted with
                obsessive attention to detail, ensuring every feature enhances your
                scheduling experience.
              </Typography.Body>
            </Animate.FadeIn>

            <Animate.FadeIn delay={400}>
              <div className="flex items-center justify-center space-x-4">
                <GlassButton variant="primary" size="medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Subscribe to Updates
                </GlassButton>
                <GlassButton variant="secondary" size="medium">
                  Follow on Twitter
                </GlassButton>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Recent Updates */}
      <Section spacing="large">
        <Container>
          <Typography.Title className="mb-12">
            Recent Updates
          </Typography.Title>

          <div className="space-y-8">
            {updates.map((update, index) => (
              <Animate.FadeIn key={update.version} delay={index * 100}>
                <Card variant="elevated" className="overflow-hidden">
                  <div className="lg:grid lg:grid-cols-12">
                    <div className="lg:col-span-3 p-8 bg-gray-50/50 border-r border-gray-100">
                      <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-4">
                        <update.icon className="w-8 h-8 text-gray-700" />
                      </div>
                      <Typography.Headline className="mb-2">
                        Version {update.version}
                      </Typography.Headline>
                      <Typography.Caption className="mb-4">
                        {update.date}
                      </Typography.Caption>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${update.tagColor}`}>
                        {update.tag}
                      </span>
                    </div>
                    <div className="lg:col-span-9 p-8">
                      <Typography.Title className="mb-6">
                        {update.title}
                      </Typography.Title>
                      <div className="space-y-3">
                        {update.features.map((feature, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <Typography.Body className="text-gray-600">
                              {feature}
                            </Typography.Body>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Link href={`/changelog/${update.version}`}>
                          <GlassButton variant="ghost" size="small">
                            Read Full Release Notes <ArrowRight className="w-4 h-4 ml-2" />
                          </GlassButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </Animate.FadeIn>
            ))}
          </div>

          <div className="mt-12 text-center">
            <GlassButton variant="secondary" size="large">
              Load More Updates
            </GlassButton>
          </div>
        </Container>
      </Section>

      {/* Upcoming Features */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center mb-12">
            <Typography.Title className="mb-4">
              Coming Soon
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Here's what we're working on. These features are in active development
              and will ship in the coming quarters.
            </Typography.Body>
          </div>

          <Grid cols={2} gap="medium">
            {upcomingFeatures.map((feature, index) => (
              <Animate.FadeIn key={feature.title} delay={index * 100}>
                <Card variant="glass">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Typography.Headline>
                          {feature.title}
                        </Typography.Headline>
                        <Typography.Caption className="text-gray-500">
                          {feature.quarter}
                        </Typography.Caption>
                      </div>
                      <Typography.Body className="text-gray-600">
                        {feature.description}
                      </Typography.Body>
                    </div>
                  </div>
                </Card>
              </Animate.FadeIn>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Development Philosophy */}
      <Section spacing="large">
        <Container>
          <Card variant="elevated" className="text-center">
            <Typography.Title className="mb-6">
              How We Build
            </Typography.Title>
            <Typography.Body className="max-w-3xl mx-auto mb-12 text-lg">
              Every feature at punctual.ai goes through months of careful design and iteration.
              We believe in the philosophy of "a thousand no's for every yes" — rejecting good ideas
              to make room for truly great ones.
            </Typography.Body>

            <Grid cols={3} gap="large">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">2 weeks</div>
                <Typography.Caption>Release cycle</Typography.Caption>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">99.9%</div>
                <Typography.Caption>Code coverage</Typography.Caption>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">0</div>
                <Typography.Caption>Compromise on quality</Typography.Caption>
              </div>
            </Grid>
          </Card>
        </Container>
      </Section>

      {/* Newsletter Signup */}
      <Section spacing="large" className="bg-gradient-to-br from-gray-900 to-black text-white">
        <Container>
          <div className="text-center">
            <Typography.Title className="text-white mb-6">
              Never miss an update
            </Typography.Title>
            <Typography.Body className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get notified about new features, improvements, and important changes.
              We respect your inbox — updates only when it matters.
            </Typography.Body>
            <div className="flex items-center justify-center space-x-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <GlassButton variant="primary" size="medium" className="bg-white text-black hover:bg-gray-100">
                Subscribe
              </GlassButton>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-6">
              <a href="/changelog.xml" className="text-gray-400 hover:text-white text-sm">
                RSS Feed
              </a>
              <a href="https://twitter.com/punctualai" className="text-gray-400 hover:text-white text-sm">
                Twitter
              </a>
              <a href="https://github.com/punctualai" className="text-gray-400 hover:text-white text-sm">
                GitHub
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Logo size="default" />
              <Typography.Caption className="mt-2">
                Shipping excellence every two weeks
              </Typography.Caption>
            </div>
            <div className="flex space-x-8">
              <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="/roadmap" className="text-sm text-gray-600 hover:text-gray-900">
                Roadmap
              </Link>
              <Link href="/developers" className="text-sm text-gray-600 hover:text-gray-900">
                API
              </Link>
              <Link href="/status" className="text-sm text-gray-600 hover:text-gray-900">
                Status
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}