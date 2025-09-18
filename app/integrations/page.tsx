'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Video, CreditCard, Mail, Smartphone, Users, Zap, Globe, Shield, CheckCircle } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate } = JonyDesign

export default function IntegrationsPage() {
  const integrations = [
    {
      category: "Calendar Sync",
      icon: Calendar,
      items: [
        { name: "Google Calendar", description: "Two-way sync with unlimited calendars", status: "available" },
        { name: "Outlook Calendar", description: "Microsoft 365 and Outlook.com support", status: "available" },
        { name: "Apple Calendar", description: "iCloud calendar integration", status: "available" },
        { name: "CalDAV", description: "Universal calendar protocol support", status: "available" }
      ]
    },
    {
      category: "Video Conferencing",
      icon: Video,
      items: [
        { name: "Zoom", description: "Automatic meeting room creation", status: "available" },
        { name: "Google Meet", description: "Seamless G Suite integration", status: "available" },
        { name: "Microsoft Teams", description: "Enterprise video calling", status: "available" },
        { name: "GoToMeeting", description: "Professional webinar support", status: "coming-soon" }
      ]
    },
    {
      category: "Payment Processing",
      icon: CreditCard,
      items: [
        { name: "Stripe", description: "Global payment processing", status: "available" },
        { name: "PayPal", description: "Worldwide payment acceptance", status: "available" },
        { name: "Square", description: "Point-of-sale integration", status: "coming-soon" },
        { name: "Braintree", description: "Advanced payment solutions", status: "coming-soon" }
      ]
    },
    {
      category: "Email & Marketing",
      icon: Mail,
      items: [
        { name: "Mailchimp", description: "Automated email campaigns", status: "available" },
        { name: "ConvertKit", description: "Creator-focused email marketing", status: "available" },
        { name: "HubSpot", description: "CRM and marketing automation", status: "available" },
        { name: "ActiveCampaign", description: "Advanced marketing automation", status: "coming-soon" }
      ]
    },
    {
      category: "Communication",
      icon: Smartphone,
      items: [
        { name: "Twilio", description: "SMS reminders and notifications", status: "available" },
        { name: "WhatsApp Business", description: "Global messaging platform", status: "coming-soon" },
        { name: "Telegram", description: "Secure messaging integration", status: "coming-soon" },
        { name: "Slack", description: "Team collaboration and alerts", status: "available" }
      ]
    },
    {
      category: "CRM & Sales",
      icon: Users,
      items: [
        { name: "Salesforce", description: "Enterprise CRM integration", status: "available" },
        { name: "HubSpot CRM", description: "Free CRM with powerful features", status: "available" },
        { name: "Pipedrive", description: "Sales-focused pipeline management", status: "available" },
        { name: "Airtable", description: "Flexible database integration", status: "coming-soon" }
      ]
    }
  ]

  const webhooks = [
    { name: "Booking Created", description: "Triggered when a new booking is made" },
    { name: "Booking Cancelled", description: "Fired when an appointment is cancelled" },
    { name: "Booking Rescheduled", description: "Sent when meeting time changes" },
    { name: "Payment Completed", description: "Triggered after successful payment" },
    { name: "Reminder Sent", description: "Fired when automated reminders go out" }
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
              <Link href="/api-docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                API
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
                Connect
                <br />
                <span className="text-gray-400">everything</span>
              </Typography.Display>
            </Animate.FadeIn>
            <Animate.FadeIn delay={200}>
              <Typography.Body className="text-xl max-w-3xl mx-auto mb-12">
                Punctual.ai seamlessly integrates with the tools you already use. From calendar sync to payment processing,
                create a unified scheduling experience that feels effortless. Over 50 integrations and growing.
              </Typography.Body>
            </Animate.FadeIn>
            <Animate.FadeIn delay={400}>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Start Integrating <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/api-docs">
                  <GlassButton variant="secondary" size="large">
                    View API Docs
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Integration Categories */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center mb-20">
            <Typography.Title>
              Integrations that matter
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Connect with the tools that power your business. Every integration is built with the same obsessive
              attention to detail that defines our scheduling experience.
            </Typography.Body>
          </div>

          <div className="space-y-16">
            {integrations.map((category, categoryIndex) => (
              <Animate.FadeIn key={category.category} delay={categoryIndex * 100}>
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mr-4">
                      <category.icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <Typography.Headline className="mb-0">
                      {category.category}
                    </Typography.Headline>
                  </div>

                  <Grid cols={2} gap="medium">
                    {category.items.map((integration, index) => (
                      <Card key={integration.name} variant="default" className="p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h4 className="text-lg font-medium text-gray-900">{integration.name}</h4>
                              {integration.status === 'available' && (
                                <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                              )}
                              {integration.status === 'coming-soon' && (
                                <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded-md">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                            <Typography.Caption className="text-gray-600">
                              {integration.description}
                            </Typography.Caption>
                          </div>
                          {integration.status === 'available' && (
                            <GlassButton variant="ghost" size="small" className="ml-4">
                              Connect
                            </GlassButton>
                          )}
                        </div>
                      </Card>
                    ))}
                  </Grid>
                </div>
              </Animate.FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Webhooks & API */}
      <Section spacing="large">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            <Animate.FadeIn>
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-gray-700" />
                  </div>
                  <Typography.Headline className="mb-0">
                    Webhooks
                  </Typography.Headline>
                </div>

                <Typography.Body className="mb-8">
                  Real-time notifications for every booking event. Build custom workflows and automations
                  that respond instantly to changes in your schedule.
                </Typography.Body>

                <div className="space-y-4">
                  {webhooks.map((webhook, index) => (
                    <div key={webhook.name} className="flex items-start">
                      <div className="w-2 h-2 bg-black rounded-full mt-2 mr-4 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900">{webhook.name}</div>
                        <Typography.Caption className="text-gray-600">
                          {webhook.description}
                        </Typography.Caption>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/api-docs">
                    <GlassButton variant="secondary">
                      View Webhook Docs <ArrowRight className="ml-2 h-4 w-4" />
                    </GlassButton>
                  </Link>
                </div>
              </div>
            </Animate.FadeIn>

            <Animate.FadeIn delay={200}>
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-gray-700" />
                  </div>
                  <Typography.Headline className="mb-0">
                    REST API
                  </Typography.Headline>
                </div>

                <Typography.Body className="mb-8">
                  Build custom scheduling experiences with our comprehensive REST API. Full CRUD operations
                  for bookings, availability, and user management.
                </Typography.Body>

                <Card variant="glass" className="p-6 font-mono text-sm">
                  <div className="text-gray-600 mb-2"># Create a new booking</div>
                  <div className="text-gray-900">
                    <span className="text-blue-600">POST</span> /api/v1/bookings
                  </div>
                  <div className="mt-4 text-gray-600 mb-2"># Get availability</div>
                  <div className="text-gray-900">
                    <span className="text-green-600">GET</span> /api/v1/availability
                  </div>
                  <div className="mt-4 text-gray-600 mb-2"># Update booking</div>
                  <div className="text-gray-900">
                    <span className="text-yellow-600">PUT</span> /api/v1/bookings/:id
                  </div>
                </Card>

                <div className="mt-8">
                  <Link href="/api-docs">
                    <GlassButton variant="secondary">
                      Explore API <ArrowRight className="ml-2 h-4 w-4" />
                    </GlassButton>
                  </Link>
                </div>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Security & Compliance */}
      <Section spacing="medium" className="bg-gray-50/30">
        <Container>
          <div className="text-center">
            <Animate.FadeIn>
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-gray-700" />
                </div>
              </div>
              <Typography.Headline>
                Enterprise-grade security
              </Typography.Headline>
              <Typography.Body className="max-w-2xl mx-auto mb-12">
                Every integration is built with security-first principles. SOC 2 Type II certified,
                GDPR compliant, and audited by leading security firms.
              </Typography.Body>
              <div className="flex items-center justify-center space-x-8 text-gray-500">
                <div className="text-center">
                  <div className="font-medium">SOC 2</div>
                  <div className="text-sm">Type II</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">GDPR</div>
                  <div className="text-sm">Compliant</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">HIPAA</div>
                  <div className="text-sm">Ready</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">ISO 27001</div>
                  <div className="text-sm">Certified</div>
                </div>
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
                Ready to connect everything?
              </Typography.Title>
              <Typography.Body className="max-w-2xl mx-auto mb-12">
                Start with our free plan and add integrations as you grow. No setup fees,
                no hidden costs, no complexity.
              </Typography.Body>
              <Link href="/register">
                <GlassButton variant="primary" size="large">
                  Start Integrating Free <ArrowRight className="ml-2 h-5 w-5" />
                </GlassButton>
              </Link>
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
                Scheduling perfected through integration
              </Typography.Caption>
            </div>
            <div className="flex space-x-8">
              <Link href="/api-docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                API Docs
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
              © 2024 punctual.ai. Crafted with obsessive attention to detail.
            </Typography.Caption>
          </div>
        </Container>
      </footer>
    </div>
  )
}