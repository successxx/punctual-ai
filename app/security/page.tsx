'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Lock, Eye, Globe, Server, FileCheck, Users, Zap, Download } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate } = JonyDesign

export default function SecurityPage() {
  const certifications = [
    {
      title: "SOC 2 Type II",
      description: "Annual third-party security audits verify our controls",
      icon: FileCheck,
      status: "Certified"
    },
    {
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations",
      icon: Globe,
      status: "Compliant"
    },
    {
      title: "HIPAA Ready",
      description: "Healthcare-grade security for sensitive appointments",
      icon: Shield,
      status: "Available"
    },
    {
      title: "ISO 27001",
      description: "International standard for information security management",
      icon: Lock,
      status: "Certified"
    }
  ]

  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using AES-256 encryption. Your sensitive information never leaves our systems unprotected.",
      icon: Lock
    },
    {
      title: "Zero-Trust Architecture",
      description: "Every request is verified and authenticated. We assume no inherent trust and validate every interaction with our systems.",
      icon: Shield
    },
    {
      title: "Continuous Monitoring",
      description: "24/7 security monitoring with real-time threat detection. Our systems are constantly watched for anomalous behavior.",
      icon: Eye
    },
    {
      title: "Access Controls",
      description: "Granular permissions and role-based access ensure users only see what they need. Multi-factor authentication is enforced.",
      icon: Users
    },
    {
      title: "Infrastructure Security",
      description: "Hosted on enterprise-grade cloud infrastructure with automatic security updates and hardened server configurations.",
      icon: Server
    },
    {
      title: "Incident Response",
      description: "Dedicated security team with 15-minute response times. Full incident documentation and transparent communication.",
      icon: Zap
    }
  ]

  const dataProtection = [
    {
      principle: "Data Minimization",
      description: "We collect only the data necessary to provide our service. No tracking, no behavioral analytics, no data mining."
    },
    {
      principle: "Purpose Limitation",
      description: "Your data is used solely for scheduling functionality. We never sell, rent, or share your information with third parties."
    },
    {
      principle: "Storage Limitation",
      description: "Data is retained only as long as necessary. Automatic deletion policies ensure old data doesn't accumulate."
    },
    {
      principle: "User Control",
      description: "Complete control over your data. Export, delete, or modify your information at any time through our dashboard."
    }
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
              <div className="w-20 h-20 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Shield className="h-10 w-10 text-gray-700" />
              </div>
            </Animate.FadeIn>
            <Animate.FadeIn delay={100}>
              <Typography.Display className="mb-8">
                Security
                <br />
                <span className="text-gray-400">by design</span>
              </Typography.Display>
            </Animate.FadeIn>
            <Animate.FadeIn delay={200}>
              <Typography.Body className="text-xl max-w-3xl mx-auto mb-12">
                Trust is earned through transparency. Every line of code, every server configuration,
                every data decision is made with security as the highest priority. Your information
                deserves nothing less than perfection.
              </Typography.Body>
            </Animate.FadeIn>
            <Animate.FadeIn delay={400}>
              <div className="flex items-center justify-center space-x-4">
                <Link href="#certifications">
                  <GlassButton variant="primary" size="large">
                    View Certifications <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/compliance">
                  <GlassButton variant="secondary" size="large">
                    Compliance Center
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Certifications */}
      <Section spacing="large" className="bg-gray-50/30" id="certifications">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Industry certifications
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              We don't just talk about security—we prove it. Regular third-party audits and
              certifications validate our commitment to protecting your data.
            </Typography.Body>
          </div>

          <Grid cols={2} gap="large">
            {certifications.map((cert, index) => (
              <Animate.FadeIn key={cert.title} delay={index * 100}>
                <Card variant="elevated" className="text-center p-8">
                  <div className="w-16 h-16 bg-black/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <cert.icon className="h-8 w-8 text-gray-700" />
                  </div>
                  <Typography.Headline className="mb-4">
                    {cert.title}
                  </Typography.Headline>
                  <Typography.Body className="mb-6">
                    {cert.description}
                  </Typography.Body>
                  <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    {cert.status}
                  </div>
                </Card>
              </Animate.FadeIn>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Security Features */}
      <Section spacing="large">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Security architecture
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Built from the ground up with security-first principles. Every component is designed
              to protect your data while maintaining the seamless experience you expect.
            </Typography.Body>
          </div>

          <Grid cols={2} gap="medium">
            {securityFeatures.map((feature, index) => (
              <Animate.FadeIn key={feature.title} delay={index * 100}>
                <Card variant="default" className="p-8 h-full">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <Typography.Headline className="mb-4 text-xl">
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

      {/* Data Protection */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Animate.FadeIn>
              <div>
                <Typography.Title className="mb-8">
                  Your data, your control
                </Typography.Title>
                <Typography.Body className="mb-8">
                  We believe privacy is a fundamental right, not a feature. Our data protection
                  practices go beyond compliance requirements—they reflect our values and commitment
                  to earning your trust every single day.
                </Typography.Body>
                <div className="space-y-6">
                  {dataProtection.map((principle, index) => (
                    <div key={principle.principle} className="flex items-start">
                      <div className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 mb-1">{principle.principle}</div>
                        <Typography.Caption className="text-gray-600">
                          {principle.description}
                        </Typography.Caption>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Animate.FadeIn>

            <Animate.FadeIn delay={200}>
              <Card variant="glass" className="p-8">
                <Typography.Headline className="mb-6">
                  Security reports
                </Typography.Headline>
                <Typography.Body className="mb-8">
                  Access our latest security documentation, audit reports, and compliance certificates.
                  Complete transparency in how we protect your information.
                </Typography.Body>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">SOC 2 Type II Report</div>
                      <div className="text-sm text-gray-600">Latest audit: Q4 2024</div>
                    </div>
                    <GlassButton variant="ghost" size="small">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </GlassButton>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Penetration Test Results</div>
                      <div className="text-sm text-gray-600">Quarterly assessment</div>
                    </div>
                    <GlassButton variant="ghost" size="small">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </GlassButton>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Security Policies</div>
                      <div className="text-sm text-gray-600">Updated monthly</div>
                    </div>
                    <GlassButton variant="ghost" size="small">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </GlassButton>
                  </div>
                </div>
              </Card>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Incident Response */}
      <Section spacing="medium">
        <Container>
          <div className="text-center">
            <Animate.FadeIn>
              <Typography.Title className="mb-8">
                24/7 security monitoring
              </Typography.Title>
              <Typography.Body className="max-w-3xl mx-auto mb-12">
                Our dedicated security team monitors every aspect of our infrastructure around the clock.
                In the unlikely event of an incident, we have detailed response procedures and
                transparent communication protocols.
              </Typography.Body>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">15min</div>
                  <Typography.Caption>Average response time</Typography.Caption>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">99.9%</div>
                  <Typography.Caption>Uptime guarantee</Typography.Caption>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 mb-2">0</div>
                  <Typography.Caption>Major breaches to date</Typography.Caption>
                </div>
              </div>
              <Link href="/status">
                <GlassButton variant="secondary" size="large">
                  View System Status <ArrowRight className="ml-2 h-5 w-5" />
                </GlassButton>
              </Link>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center">
            <Animate.FadeIn>
              <Typography.Title className="mb-8">
                Security you can trust
              </Typography.Title>
              <Typography.Body className="max-w-2xl mx-auto mb-12">
                Join thousands of professionals who trust punctual.ai with their most important
                scheduling needs. Enterprise-grade security, consumer-friendly experience.
              </Typography.Body>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Start Securely <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/contact">
                  <GlassButton variant="secondary" size="large">
                    Contact Security Team
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
                Security through transparency
              </Typography.Caption>
            </div>
            <div className="flex space-x-8">
              <Link href="/compliance" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Compliance
              </Link>
              <Link href="/status" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Status
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
              © 2024 punctual.ai. Security is not an afterthought—it's our foundation.
            </Typography.Caption>
          </div>
        </Container>
      </footer>
    </div>
  )
}