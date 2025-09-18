'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, AlertCircle, XCircle, Activity, Globe, Server, Database, Shield, Clock, TrendingUp, Info } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate, Navigation } = JonyDesign

type ServiceStatus = 'operational' | 'degraded' | 'outage'

interface Service {
  name: string
  status: ServiceStatus
  description: string
  uptime: number
  icon: any
}

const services: Service[] = [
  {
    name: 'API',
    status: 'operational',
    description: 'Core scheduling API endpoints',
    uptime: 99.99,
    icon: Server
  },
  {
    name: 'Web Application',
    status: 'operational',
    description: 'Main application and dashboard',
    uptime: 99.98,
    icon: Globe
  },
  {
    name: 'Database',
    status: 'operational',
    description: 'Primary and replica databases',
    uptime: 99.99,
    icon: Database
  },
  {
    name: 'Authentication',
    status: 'operational',
    description: 'SSO and authentication services',
    uptime: 100,
    icon: Shield
  },
  {
    name: 'Calendar Sync',
    status: 'operational',
    description: 'Google, Outlook, and iCal sync',
    uptime: 99.97,
    icon: Clock
  },
  {
    name: 'Notifications',
    status: 'operational',
    description: 'Email and SMS notifications',
    uptime: 99.95,
    icon: Activity
  }
]

const incidents = [
  {
    date: '2024-01-12',
    title: 'Elevated API response times',
    status: 'resolved',
    duration: '12 minutes',
    description: 'Some users experienced slower API responses. Issue was identified and resolved.'
  },
  {
    date: '2024-01-08',
    title: 'Calendar sync delays',
    status: 'resolved',
    duration: '8 minutes',
    description: 'Google Calendar sync experienced minor delays. No data loss occurred.'
  },
  {
    date: '2023-12-28',
    title: 'Scheduled maintenance',
    status: 'completed',
    duration: '2 hours',
    description: 'Planned database maintenance completed successfully with zero downtime.'
  }
]

const StatusIcon = ({ status }: { status: ServiceStatus }) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="w-5 h-5 text-green-600" />
    case 'degraded':
      return <AlertCircle className="w-5 h-5 text-yellow-600" />
    case 'outage':
      return <XCircle className="w-5 h-5 text-red-600" />
  }
}

const StatusBadge = ({ status }: { status: ServiceStatus }) => {
  const colors = {
    operational: 'bg-green-100 text-green-700',
    degraded: 'bg-yellow-100 text-yellow-700',
    outage: 'bg-red-100 text-red-700'
  }

  const labels = {
    operational: 'Operational',
    degraded: 'Degraded Performance',
    outage: 'Service Outage'
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [overallStatus, setOverallStatus] = useState<ServiceStatus>('operational')

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Calculate overall status
    const hasOutage = services.some(s => s.status === 'outage')
    const hasDegraded = services.some(s => s.status === 'degraded')

    if (hasOutage) setOverallStatus('outage')
    else if (hasDegraded) setOverallStatus('degraded')
    else setOverallStatus('operational')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo size="default" />
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/changelog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Updates
            </Link>
            <Link href="/api-docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              API
            </Link>
            <a href="https://twitter.com/punctualai" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </Navigation>

      {/* Hero Status */}
      <Section spacing="large" className="pt-24 bg-gradient-to-b from-gray-50/50 to-white">
        <Container>
          <Animate.FadeIn>
            <div className="text-center mb-12">
              <Typography.Display className="mb-6">
                System Status
              </Typography.Display>
              <Typography.Body className="text-xl text-gray-600 mb-8">
                Real-time status of punctual.ai services and infrastructure
              </Typography.Body>

              {/* Overall Status */}
              <Card variant={overallStatus === 'operational' ? 'glass' : 'elevated'}
                    className={`inline-block ${
                      overallStatus === 'outage' ? 'border-red-200 bg-red-50/50' :
                      overallStatus === 'degraded' ? 'border-yellow-200 bg-yellow-50/50' :
                      'border-green-200 bg-green-50/50'
                    }`}>
                <div className="flex items-center space-x-4">
                  <StatusIcon status={overallStatus} />
                  <div className="text-left">
                    <Typography.Headline className="mb-1">
                      {overallStatus === 'operational' ? 'All Systems Operational' :
                       overallStatus === 'degraded' ? 'Experiencing Issues' :
                       'Service Disruption'}
                    </Typography.Headline>
                    <Typography.Caption>
                      Last updated: {currentTime.toLocaleTimeString()}
                    </Typography.Caption>
                  </div>
                </div>
              </Card>
            </div>
          </Animate.FadeIn>

          {/* Uptime Stats */}
          <Animate.FadeIn delay={200}>
            <div className="grid grid-cols-4 gap-4 mb-12">
              <Card variant="default" className="text-center">
                <Typography.Title className="text-3xl mb-2">99.99%</Typography.Title>
                <Typography.Caption>30-day uptime</Typography.Caption>
              </Card>
              <Card variant="default" className="text-center">
                <Typography.Title className="text-3xl mb-2">0</Typography.Title>
                <Typography.Caption>Current incidents</Typography.Caption>
              </Card>
              <Card variant="default" className="text-center">
                <Typography.Title className="text-3xl mb-2">&lt;200ms</Typography.Title>
                <Typography.Caption>API response time</Typography.Caption>
              </Card>
              <Card variant="default" className="text-center">
                <Typography.Title className="text-3xl mb-2">5</Typography.Title>
                <Typography.Caption>Data centers</Typography.Caption>
              </Card>
            </div>
          </Animate.FadeIn>
        </Container>
      </Section>

      {/* Services Status */}
      <Section spacing="large">
        <Container>
          <Typography.Title className="mb-8">
            Service Status
          </Typography.Title>

          <div className="space-y-4">
            {services.map((service, index) => (
              <Animate.FadeIn key={service.name} delay={index * 50}>
                <Card variant="elevated">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <Typography.Headline className="mb-1">
                          {service.name}
                        </Typography.Headline>
                        <Typography.Caption>
                          {service.description}
                        </Typography.Caption>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <Typography.Body className="text-sm text-gray-500">
                          30-day uptime
                        </Typography.Body>
                        <Typography.Headline>
                          {service.uptime}%
                        </Typography.Headline>
                      </div>
                      <StatusBadge status={service.status} />
                    </div>
                  </div>
                </Card>
              </Animate.FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Recent Incidents */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="mb-8">
            <Typography.Title className="mb-4">
              Recent Incidents
            </Typography.Title>
            <Typography.Body>
              Transparency is core to our values. Here's a complete history of recent incidents and resolutions.
            </Typography.Body>
          </div>

          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <Animate.FadeIn key={index} delay={index * 50}>
                <Card variant="default">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <Typography.Headline className="mb-2">
                          {incident.title}
                        </Typography.Headline>
                        <Typography.Body className="text-gray-600 mb-2">
                          {incident.description}
                        </Typography.Body>
                        <div className="flex items-center space-x-4">
                          <Typography.Caption>
                            {incident.date}
                          </Typography.Caption>
                          <Typography.Caption>
                            Duration: {incident.duration}
                          </Typography.Caption>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {incident.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Animate.FadeIn>
            ))}
          </div>

          <div className="mt-8 text-center">
            <GlassButton variant="secondary" size="medium">
              View Full History
            </GlassButton>
          </div>
        </Container>
      </Section>

      {/* Uptime Chart */}
      <Section spacing="large">
        <Container>
          <Typography.Title className="mb-8">
            90-Day Uptime History
          </Typography.Title>

          <Card variant="elevated">
            <div className="p-8">
              {/* Simplified uptime visualization */}
              <div className="flex items-end justify-between h-32 mb-4">
                {Array.from({ length: 90 }, (_, i) => {
                  const uptime = 99 + Math.random() * 1
                  const height = (uptime - 98) * 50
                  return (
                    <div
                      key={i}
                      className="flex-1 mx-px"
                      title={`Day ${90 - i}: ${uptime.toFixed(2)}%`}
                    >
                      <div
                        className={`${
                          uptime >= 99.9 ? 'bg-green-500' :
                          uptime >= 99.5 ? 'bg-yellow-500' :
                          'bg-red-500'
                        } hover:opacity-80 transition-opacity cursor-pointer`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <Card variant="default" className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <Typography.Caption>Operational (99.9%+)</Typography.Caption>
              </div>
            </Card>
            <Card variant="default" className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <Typography.Caption>Degraded (99.5-99.9%)</Typography.Caption>
              </div>
            </Card>
            <Card variant="default" className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <Typography.Caption>Outage (&lt;99.5%)</Typography.Caption>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Subscribe to Updates */}
      <Section spacing="large" className="bg-gradient-to-br from-gray-900 to-black text-white">
        <Container>
          <div className="text-center">
            <Typography.Title className="text-white mb-6">
              Subscribe to status updates
            </Typography.Title>
            <Typography.Body className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get notified instantly about any service disruptions or scheduled maintenance.
              We'll only contact you when it matters.
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
            <Typography.Caption className="text-gray-400 mt-4">
              Also available via RSS, Twitter, and Slack
            </Typography.Caption>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <Container>
          <div className="flex items-center justify-between">
            <Typography.Caption>
              © 2024 punctual.ai Status • Updated every 30 seconds
            </Typography.Caption>
            <div className="flex space-x-6">
              <Link href="/api-status" className="text-sm text-gray-600 hover:text-gray-900">
                API Status
              </Link>
              <a href="https://twitter.com/punctualstatus" className="text-sm text-gray-600 hover:text-gray-900">
                @punctualstatus
              </a>
              <Link href="/rss" className="text-sm text-gray-600 hover:text-gray-900">
                RSS Feed
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}