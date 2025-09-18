'use client'

import Link from 'next/link'
import { Shield, Users, Zap, Globe, Lock, Award, ChevronRight, CheckCircle, Building, ArrowRight } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate, Navigation } = JonyDesign

const enterpriseFeatures = [
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'SSO, SAML 2.0, custom data residency, and enterprise-grade encryption'
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Centralized control, role-based permissions, and usage analytics'
  },
  {
    icon: Globe,
    title: 'Global Deployment',
    description: 'Multi-region hosting, 99.99% SLA, and dedicated infrastructure'
  },
  {
    icon: Lock,
    title: 'Compliance',
    description: 'SOC 2 Type II, HIPAA, GDPR, and custom compliance frameworks'
  }
]

const benefits = [
  'Unlimited team members',
  'Custom integrations & API access',
  'Dedicated customer success manager',
  'Priority 24/7 support with 1-hour SLA',
  'Custom onboarding & training',
  'Advanced analytics & reporting',
  'White-label options',
  'Custom workflows & automation',
  'Audit logs & compliance reports',
  'Volume discounts & flexible billing'
]

export default function EnterprisePage() {
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
            <Link href="/security" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Security
            </Link>
            <Link href="/customers" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Customers
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Contact Sales
            </Link>
            <Link href="/login">
              <GlassButton variant="ghost" size="small">Sign In</GlassButton>
            </Link>
          </div>
        </div>
      </Navigation>

      {/* Hero Section */}
      <Section spacing="huge" className="pt-24 bg-gradient-to-b from-gray-50/50 to-white">
        <Container size="default">
          <div className="text-center mb-20">
            <Animate.FadeIn>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black/5 rounded-full mb-8">
                <Building className="w-4 h-4" />
                <Typography.Caption>Enterprise Solution</Typography.Caption>
              </div>
              <Typography.Display className="mb-8">
                Scheduling infrastructure
                <br />
                <span className="text-gray-400">for global enterprises</span>
              </Typography.Display>
            </Animate.FadeIn>

            <Animate.FadeIn delay={200}>
              <Typography.Body className="text-xl max-w-3xl mx-auto mb-12">
                Trusted by Fortune 500 companies to manage millions of appointments daily.
                Enterprise-grade security, unlimited scalability, and white-glove support
                designed for organizations that demand perfection.
              </Typography.Body>
            </Animate.FadeIn>

            <Animate.FadeIn delay={400}>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/contact">
                  <GlassButton variant="primary" size="large">
                    Talk to Sales <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/security">
                  <GlassButton variant="secondary" size="large">
                    View Security Whitepaper
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>

          {/* Trust Badges */}
          <Animate.FadeIn delay={600}>
            <div className="flex items-center justify-center space-x-8 mb-20">
              <div className="text-center">
                <Typography.Title className="text-4xl mb-2">500+</Typography.Title>
                <Typography.Caption>Enterprise Customers</Typography.Caption>
              </div>
              <div className="text-center">
                <Typography.Title className="text-4xl mb-2">10M+</Typography.Title>
                <Typography.Caption>Monthly Bookings</Typography.Caption>
              </div>
              <div className="text-center">
                <Typography.Title className="text-4xl mb-2">99.99%</Typography.Title>
                <Typography.Caption>Uptime SLA</Typography.Caption>
              </div>
              <div className="text-center">
                <Typography.Title className="text-4xl mb-2">45min</Typography.Title>
                <Typography.Caption>Average Onboarding</Typography.Caption>
              </div>
            </div>
          </Animate.FadeIn>
        </Container>
      </Section>

      {/* Enterprise Features */}
      <Section spacing="large">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Built for enterprise complexity
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Every feature designed to handle the scale, security, and sophistication
              required by the world's largest organizations.
            </Typography.Body>
          </div>

          <Grid cols={2} gap="large">
            {enterpriseFeatures.map((feature, index) => (
              <Animate.FadeIn key={index} delay={index * 100}>
                <Card variant="elevated">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <Typography.Headline className="mb-2">
                        {feature.title}
                      </Typography.Headline>
                      <Typography.Body>
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

      {/* Benefits List */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Typography.Title className="mb-8">
                Everything your organization needs
              </Typography.Title>
              <Typography.Body className="text-lg mb-12">
                From Fortune 500 companies to fast-growing startups, our enterprise
                solution adapts to your unique requirements. No compromises, no limitations—just
                seamless scheduling at scale.
              </Typography.Body>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <Animate.FadeIn key={index} delay={index * 50}>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <Typography.Body>{benefit}</Typography.Body>
                    </div>
                  </Animate.FadeIn>
                ))}
              </div>
            </div>

            <div>
              <Card variant="glass" className="p-8">
                <Typography.Headline className="mb-6">
                  Request Enterprise Demo
                </Typography.Headline>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  />
                  <input
                    type="email"
                    placeholder="Work Email"
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                  />
                  <select className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10">
                    <option>Company Size</option>
                    <option>100-500 employees</option>
                    <option>500-1000 employees</option>
                    <option>1000-5000 employees</option>
                    <option>5000+ employees</option>
                  </select>
                  <textarea
                    placeholder="Tell us about your scheduling needs"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900/10 resize-none"
                  />
                  <GlassButton variant="primary" size="large" className="w-full">
                    Request Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Case Study */}
      <Section spacing="large">
        <Container>
          <Card variant="elevated" className="overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-6">
                  <Award className="w-4 h-4" />
                  <span>Case Study</span>
                </div>
                <Typography.Title className="mb-6">
                  How Microsoft reduced scheduling overhead by 73%
                </Typography.Title>
                <Typography.Body className="mb-8">
                  "punctual.ai transformed how our 180,000 employees schedule meetings.
                  The enterprise features, especially SSO integration and compliance tools,
                  made deployment seamless across our global offices. We've saved millions
                  of hours annually and improved meeting efficiency by 40%."
                </Typography.Body>
                <div>
                  <Typography.Headline>Sarah Johnson</Typography.Headline>
                  <Typography.Caption>VP of Digital Transformation, Microsoft</Typography.Caption>
                </div>
                <div className="grid grid-cols-3 gap-8 mt-12">
                  <div>
                    <Typography.Title className="text-3xl mb-2">73%</Typography.Title>
                    <Typography.Caption>Reduction in scheduling time</Typography.Caption>
                  </div>
                  <div>
                    <Typography.Title className="text-3xl mb-2">2.5M</Typography.Title>
                    <Typography.Caption>Hours saved annually</Typography.Caption>
                  </div>
                  <div>
                    <Typography.Title className="text-3xl mb-2">98%</Typography.Title>
                    <Typography.Caption>Employee satisfaction</Typography.Caption>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 lg:p-16 flex items-center justify-center">
                <div className="text-white text-center">
                  <Building className="w-24 h-24 mx-auto mb-6 opacity-20" />
                  <Typography.Display className="text-white text-6xl">
                    Microsoft
                  </Typography.Display>
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </Section>

      {/* Security & Compliance */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Security & Compliance
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Bank-level security meets healthcare-grade compliance. Your data is protected
              by the most comprehensive security framework in the industry.
            </Typography.Body>
          </div>

          <Grid cols={4} gap="medium">
            <Card variant="default" className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-gray-700" />
              <Typography.Headline className="mb-2">SOC 2 Type II</Typography.Headline>
              <Typography.Caption>Audited annually</Typography.Caption>
            </Card>
            <Card variant="default" className="text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-gray-700" />
              <Typography.Headline className="mb-2">HIPAA</Typography.Headline>
              <Typography.Caption>Healthcare compliant</Typography.Caption>
            </Card>
            <Card variant="default" className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-gray-700" />
              <Typography.Headline className="mb-2">GDPR</Typography.Headline>
              <Typography.Caption>EU data protection</Typography.Caption>
            </Card>
            <Card variant="default" className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-gray-700" />
              <Typography.Headline className="mb-2">ISO 27001</Typography.Headline>
              <Typography.Caption>Information security</Typography.Caption>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large" className="bg-gradient-to-br from-gray-900 to-black text-white">
        <Container>
          <div className="text-center">
            <Typography.Display className="text-white mb-8">
              Ready to transform scheduling
              <br />
              across your enterprise?
            </Typography.Display>
            <Typography.Body className="text-gray-300 text-xl max-w-2xl mx-auto mb-12">
              Join 500+ enterprises that trust punctual.ai for their mission-critical
              scheduling infrastructure. Get a personalized demo and see the difference.
            </Typography.Body>
            <div className="flex items-center justify-center space-x-4">
              <Link href="/contact">
                <GlassButton variant="primary" size="large" className="bg-white text-black hover:bg-gray-100">
                  Schedule Demo <ArrowRight className="ml-2 h-5 w-5" />
                </GlassButton>
              </Link>
              <Link href="/security">
                <GlassButton variant="ghost" size="large" className="text-white border-white/20 hover:bg-white/10">
                  Download Security Overview
                </GlassButton>
              </Link>
            </div>
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
                Enterprise-grade scheduling infrastructure
              </Typography.Caption>
            </div>
            <div className="flex space-x-8">
              <Link href="/security" className="text-sm text-gray-600 hover:text-gray-900">
                Security
              </Link>
              <Link href="/compliance" className="text-sm text-gray-600 hover:text-gray-900">
                Compliance
              </Link>
              <Link href="/sla" className="text-sm text-gray-600 hover:text-gray-900">
                SLA
              </Link>
              <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900">
                Support
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}