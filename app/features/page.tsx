'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Users, Video, CreditCard, Mail, Smartphone, Globe, Zap, BarChart3, Shield, Settings, CheckCircle } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate } = JonyDesign

export default function FeaturesPage() {
  const coreFeatures = [
    {
      category: "Smart Scheduling",
      icon: Calendar,
      features: [
        {
          name: "Intelligent Availability",
          description: "AI-powered scheduling that learns your patterns and preferences. Automatically suggests optimal meeting times based on your history and productivity patterns.",
          highlight: "Reduces scheduling time by 85%"
        },
        {
          name: "Buffer Time Management",
          description: "Automatic buffer time between meetings to prevent back-to-back scheduling. Customizable prep and travel time for different meeting types.",
          highlight: "No more rushed transitions"
        },
        {
          name: "Time Zone Intelligence",
          description: "Seamlessly handle global scheduling with automatic time zone detection and conversion. Show availability in your guests' local time zones.",
          highlight: "Works across 400+ time zones"
        },
        {
          name: "Recurring Appointments",
          description: "Set up weekly, monthly, or custom recurring schedules with intelligent conflict detection. Perfect for ongoing coaching, consulting, or team meetings.",
          highlight: "Set once, book forever"
        }
      ]
    },
    {
      category: "Communication",
      icon: Mail,
      features: [
        {
          name: "Automated Reminders",
          description: "Customizable email and SMS reminders sent at optimal times. Reduce no-shows by up to 90% with smart reminder scheduling based on meeting importance.",
          highlight: "90% reduction in no-shows"
        },
        {
          name: "Booking Confirmations",
          description: "Instant confirmation emails with calendar attachments, meeting details, and personalized messages. Branded communications that reflect your professionalism.",
          highlight: "Instant delivery guaranteed"
        },
        {
          name: "Follow-up Sequences",
          description: "Automated follow-up emails after meetings with custom content, feedback forms, and next step suggestions. Keep the conversation going effortlessly.",
          highlight: "5x higher engagement rates"
        },
        {
          name: "Multi-language Support",
          description: "Send communications in your guest's preferred language. Automatic language detection with professional translations for global audiences.",
          highlight: "25+ languages supported"
        }
      ]
    },
    {
      category: "Video Integration",
      icon: Video,
      features: [
        {
          name: "Universal Video Calling",
          description: "Seamless integration with Zoom, Google Meet, Microsoft Teams, and more. Automatic meeting room creation with unique links for every appointment.",
          highlight: "Works with 15+ platforms"
        },
        {
          name: "One-Click Join",
          description: "Guests join meetings with a single click—no downloads, no complex setup. Browser-based calling for the smoothest possible experience.",
          highlight: "Zero friction joining"
        },
        {
          name: "Recording Integration",
          description: "Automatic meeting recording with cloud storage and sharing capabilities. Searchable transcripts and highlight reels for easy review.",
          highlight: "Searchable transcripts included"
        },
        {
          name: "Waiting Rooms",
          description: "Professional waiting rooms with your branding and custom messages. Control when guests enter and create the perfect first impression.",
          highlight: "Fully customizable experience"
        }
      ]
    },
    {
      category: "Payments",
      icon: CreditCard,
      features: [
        {
          name: "Secure Payment Processing",
          description: "Accept payments during booking with enterprise-grade security. Support for all major credit cards, PayPal, and digital wallets worldwide.",
          highlight: "PCI DSS Level 1 compliant"
        },
        {
          name: "Flexible Pricing",
          description: "Set different prices for different services, durations, and booking times. Dynamic pricing based on demand, availability, and customer segments.",
          highlight: "Increase revenue by 40%"
        },
        {
          name: "Subscription Management",
          description: "Offer package deals, subscriptions, and membership tiers. Automatic billing with intelligent dunning management for failed payments.",
          highlight: "95% payment success rate"
        },
        {
          name: "Global Currency Support",
          description: "Accept payments in 135+ currencies with automatic conversion. Real-time exchange rates and transparent fee structures.",
          highlight: "135+ currencies supported"
        }
      ]
    },
    {
      category: "Analytics",
      icon: BarChart3,
      features: [
        {
          name: "Revenue Analytics",
          description: "Comprehensive revenue tracking with trend analysis, forecasting, and growth insights. Understand your business performance at a glance.",
          highlight: "Real-time revenue tracking"
        },
        {
          name: "Booking Patterns",
          description: "Deep insights into when and how clients book with you. Optimize your availability and pricing based on demand patterns.",
          highlight: "Optimize for 30% more bookings"
        },
        {
          name: "Client Analytics",
          description: "Track client lifetime value, booking frequency, and satisfaction scores. Identify your most valuable relationships and growth opportunities.",
          highlight: "Increase client retention by 50%"
        },
        {
          name: "Performance Metrics",
          description: "Monitor key performance indicators like conversion rates, no-show rates, and booking lead times. Data-driven decisions for business growth.",
          highlight: "20+ KPIs tracked automatically"
        }
      ]
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      features: [
        {
          name: "Enterprise Security",
          description: "Bank-level encryption, SOC 2 Type II certification, and GDPR compliance. Your data and your clients' data is protected with military-grade security.",
          highlight: "SOC 2 Type II certified"
        },
        {
          name: "HIPAA Compliance",
          description: "Healthcare-ready security and privacy controls. Business Associate Agreements available for healthcare providers and related businesses.",
          highlight: "Healthcare-grade privacy"
        },
        {
          name: "Data Ownership",
          description: "You own your data, always. Export everything at any time, delete when you want, and maintain complete control over your information.",
          highlight: "Complete data control"
        },
        {
          name: "Audit Logs",
          description: "Comprehensive audit trails for all actions and changes. Perfect for compliance requirements and security investigations.",
          highlight: "Complete accountability"
        }
      ]
    }
  ]

  const integrationHighlights = [
    { name: "Google Calendar", icon: "📅" },
    { name: "Zoom", icon: "📹" },
    { name: "Stripe", icon: "💳" },
    { name: "Mailchimp", icon: "📧" },
    { name: "Salesforce", icon: "💼" },
    { name: "Slack", icon: "💬" },
    { name: "Outlook", icon: "📧" },
    { name: "HubSpot", icon: "📊" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 border-b border-gray-100/60">
        <Container>
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo size="default" />
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              <Link href="/integrations" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Integrations
              </Link>
              <Link href="/security" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Security
              </Link>
              <Link href="/login">
                <GlassButton variant="ghost" size="small">Sign In</GlassButton>
              </Link>
              <Link href="/register">
                <GlassButton variant="primary" size="small">Get Started</GlassButton>
              </Link>
            </div>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <Section spacing="huge" className="pt-24">
        <Container size="default">
          <div className="text-center mb-20">
            <Animate.FadeIn>
              <Typography.Display className="mb-8">
                Every feature
                <br />
                <span className="text-gray-400">perfected</span>
              </Typography.Display>
            </Animate.FadeIn>
            <Animate.FadeIn delay={200}>
              <Typography.Body className="text-xl max-w-3xl mx-auto mb-12">
                We didn't just build another scheduling tool. We reimagined what appointment booking
                could be when every detail is crafted with obsessive attention to user experience.
                These aren't just features—they're solutions to real problems.
              </Typography.Body>
            </Animate.FadeIn>
            <Animate.FadeIn delay={400}>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Try All Features Free <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="#core-features">
                  <GlassButton variant="secondary" size="large">
                    Explore Features
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Feature Categories */}
      <Section spacing="large" id="core-features">
        <Container>
          {coreFeatures.map((category, categoryIndex) => (
            <div key={category.category} className="mb-32 last:mb-0">
              <div className="text-center mb-16">
                <Animate.FadeIn delay={categoryIndex * 100}>
                  <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <category.icon className="h-8 w-8 text-gray-700" />
                  </div>
                  <Typography.Title className="mb-6">
                    {category.category}
                  </Typography.Title>
                </Animate.FadeIn>
              </div>

              <Grid cols={2} gap="large">
                {category.features.map((feature, featureIndex) => (
                  <Animate.FadeIn key={feature.name} delay={(categoryIndex * 100) + (featureIndex * 50)}>
                    <Card variant="default" className="p-8 h-full hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <Typography.Headline className="text-xl mb-0">
                          {feature.name}
                        </Typography.Headline>
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-4" />
                      </div>
                      <Typography.Body className="mb-6">
                        {feature.description}
                      </Typography.Body>
                      <div className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        <Zap className="h-3 w-3 mr-2" />
                        {feature.highlight}
                      </div>
                    </Card>
                  </Animate.FadeIn>
                ))}
              </Grid>
            </div>
          ))}
        </Container>
      </Section>

      {/* Integrations Showcase */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Works with everything
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Connect punctual.ai with the tools you already use. From calendar sync to payment processing,
              create a unified experience that feels effortless.
            </Typography.Body>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 mb-12">
            {integrationHighlights.map((integration, index) => (
              <Animate.FadeIn key={integration.name} delay={index * 50}>
                <Card variant="default" className="p-6 text-center hover:shadow-md transition-all duration-300">
                  <div className="text-3xl mb-3">{integration.icon}</div>
                  <Typography.Caption className="text-gray-600">
                    {integration.name}
                  </Typography.Caption>
                </Card>
              </Animate.FadeIn>
            ))}
          </div>

          <div className="text-center">
            <Link href="/integrations">
              <GlassButton variant="secondary" size="large">
                View All 50+ Integrations <ArrowRight className="ml-2 h-5 w-5" />
              </GlassButton>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Advanced Features */}
      <Section spacing="large">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Animate.FadeIn>
              <div>
                <Typography.Title className="mb-8">
                  Advanced automation
                </Typography.Title>
                <Typography.Body className="mb-8">
                  Go beyond basic scheduling with intelligent automation that learns from your behavior.
                  Our AI-powered features handle the complex logistics so you can focus on what matters
                  most—your work and your relationships.
                </Typography.Body>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Smart Conflict Resolution</div>
                      <Typography.Caption className="text-gray-600">
                        Automatically detect and resolve scheduling conflicts across multiple calendars
                      </Typography.Caption>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Dynamic Availability</div>
                      <Typography.Caption className="text-gray-600">
                        Adjust availability based on workload, energy levels, and productivity patterns
                      </Typography.Caption>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Predictive Scheduling</div>
                      <Typography.Caption className="text-gray-600">
                        AI suggestions for optimal meeting times based on historical data and preferences
                      </Typography.Caption>
                    </div>
                  </div>
                </div>
              </div>
            </Animate.FadeIn>

            <Animate.FadeIn delay={200}>
              <Card variant="glass" className="p-8">
                <Typography.Headline className="mb-6">
                  Workflow automation
                </Typography.Headline>
                <Typography.Body className="mb-8">
                  Create custom workflows that trigger based on booking events, client behavior,
                  and business rules. No coding required.
                </Typography.Body>
                <div className="space-y-4">
                  <div className="flex items-center p-4 border border-gray-100 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">New booking → Send welcome email</div>
                      <div className="text-gray-600">Automatically triggered</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border border-gray-100 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">24h before → Send reminder + prep docs</div>
                      <div className="text-gray-600">Scheduled trigger</div>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border border-gray-100 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">Meeting complete → Request feedback</div>
                      <div className="text-gray-600">Event-based trigger</div>
                    </div>
                  </div>
                </div>
              </Card>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Mobile Experience */}
      <Section spacing="medium" className="bg-gray-50/30">
        <Container>
          <div className="text-center">
            <Animate.FadeIn>
              <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-8 w-8 text-gray-700" />
              </div>
              <Typography.Title className="mb-8">
                Mobile-first design
              </Typography.Title>
              <Typography.Body className="max-w-2xl mx-auto mb-12">
                Every feature works perfectly on mobile. Native apps for iOS and Android provide
                offline access, push notifications, and the same beautiful experience everywhere.
              </Typography.Body>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">98%</div>
                  <Typography.Caption>Mobile satisfaction score</Typography.Caption>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">&lt;2s</div>
                  <Typography.Caption>Average load time</Typography.Caption>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">4.9★</div>
                  <Typography.Caption>App store rating</Typography.Caption>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/mobile">
                  <GlassButton variant="secondary" size="large">
                    Download Apps <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/demo">
                  <GlassButton variant="ghost" size="large">
                    Try Web App
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large">
        <Container>
          <div className="text-center">
            <Animate.FadeIn>
              <Typography.Title className="mb-8">
                Experience every feature
              </Typography.Title>
              <Typography.Body className="max-w-2xl mx-auto mb-12">
                Start with our free plan and explore every feature. No credit card required,
                no hidden limits, no compromise on quality.
              </Typography.Body>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/contact">
                  <GlassButton variant="secondary" size="large">
                    Request Demo
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-100">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Logo size="default" />
              <Typography.Caption className="mt-2">
                Features designed for perfection
              </Typography.Caption>
            </div>
            <div className="flex space-x-8">
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
              <Link href="/integrations" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Integrations
              </Link>
              <Link href="/security" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Security
              </Link>
              <Link href="/api-docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                API
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <Typography.Caption>
              © 2024 punctual.ai. Every pixel, every interaction, perfected.
            </Typography.Caption>
          </div>
        </Container>
      </footer>
    </div>
  )
}