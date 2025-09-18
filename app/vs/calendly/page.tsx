'use client'

import Link from 'next/link'
import { ArrowRight, Check, X, Star, Users, Clock, Shield, Zap, DollarSign } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate } = JonyDesign

export default function VsCalendlyPage() {
  const comparisonData = [
    {
      category: "Core Features",
      features: [
        {
          feature: "Unlimited appointments",
          punctual: true,
          calendly: "Limited on free plan"
        },
        {
          feature: "Custom booking pages",
          punctual: true,
          calendly: true
        },
        {
          feature: "Calendar sync",
          punctual: "All major platforms",
          calendly: "Limited integrations"
        },
        {
          feature: "Video conferencing",
          punctual: "15+ platforms",
          calendly: "Basic integrations"
        },
        {
          feature: "Mobile apps",
          punctual: "Native iOS & Android",
          calendly: "Web-based only"
        }
      ]
    },
    {
      category: "Advanced Features",
      features: [
        {
          feature: "AI-powered scheduling",
          punctual: true,
          calendly: false
        },
        {
          feature: "Smart conflict resolution",
          punctual: true,
          calendly: false
        },
        {
          feature: "Dynamic availability",
          punctual: true,
          calendly: "Limited"
        },
        {
          feature: "Workflow automation",
          punctual: "Visual builder",
          calendly: "Basic triggers"
        },
        {
          feature: "Custom integrations",
          punctual: "50+ integrations",
          calendly: "Limited selection"
        }
      ]
    },
    {
      category: "Security & Compliance",
      features: [
        {
          feature: "SOC 2 Type II",
          punctual: true,
          calendly: true
        },
        {
          feature: "HIPAA compliance",
          punctual: true,
          calendly: "Enterprise only"
        },
        {
          feature: "GDPR compliance",
          punctual: true,
          calendly: true
        },
        {
          feature: "End-to-end encryption",
          punctual: true,
          calendly: "Basic encryption"
        },
        {
          feature: "Audit logs",
          punctual: "All plans",
          calendly: "Enterprise only"
        }
      ]
    },
    {
      category: "Pricing & Value",
      features: [
        {
          feature: "Free plan",
          punctual: "Full-featured",
          calendly: "Very limited"
        },
        {
          feature: "Paid plan pricing",
          punctual: "From $8/month",
          calendly: "From $10/month"
        },
        {
          feature: "Payment processing",
          punctual: "All plans",
          calendly: "Paid plans only"
        },
        {
          feature: "Custom branding",
          punctual: "All plans",
          calendly: "Paid plans only"
        },
        {
          feature: "Analytics & reporting",
          punctual: "Advanced insights",
          calendly: "Basic metrics"
        }
      ]
    }
  ]

  const customerTestimonials = [
    {
      quote: "Switched from Calendly after 3 years. The AI features alone save me 5 hours per week.",
      author: "Sarah Chen",
      role: "Consultant",
      rating: 5
    },
    {
      quote: "punctual.ai's mobile app is light years ahead of Calendly's web interface on mobile.",
      author: "Marcus Rodriguez",
      role: "Sales Manager",
      rating: 5
    },
    {
      quote: "The security features were a game-changer for our healthcare practice. HIPAA compliance out of the box.",
      author: "Dr. Lisa Park",
      role: "Healthcare Provider",
      rating: 5
    }
  ]

  const migrationSteps = [
    {
      step: "1",
      title: "Export your data",
      description: "Download your existing bookings and contacts from Calendly"
    },
    {
      step: "2",
      title: "Import to punctual.ai",
      description: "One-click import wizard transfers everything seamlessly"
    },
    {
      step: "3",
      title: "Upgrade your experience",
      description: "Enjoy AI-powered features and better mobile experience"
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
              <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
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
                punctual.ai
                <br />
                <span className="text-gray-400">vs Calendly</span>
              </Typography.Display>
            </Animate.FadeIn>
            <Animate.FadeIn delay={200}>
              <Typography.Body className="text-xl max-w-3xl mx-auto mb-12">
                Both are scheduling tools, but one is built for the future. Compare features, pricing,
                and user experience to see why thousands are switching from Calendly to punctual.ai
                every month. Discover what scheduling looks like when obsessive attention to detail meets AI.
              </Typography.Body>
            </Animate.FadeIn>
            <Animate.FadeIn delay={400}>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Try punctual.ai Free <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="#comparison">
                  <GlassButton variant="secondary" size="large">
                    See Full Comparison
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Quick Stats */}
      <Section spacing="medium" className="bg-gray-50/30">
        <Container>
          <Grid cols={4} gap="medium">
            <Animate.FadeIn delay={0}>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-light text-gray-900 mb-1">10,000+</div>
                <Typography.Caption>Users switched this year</Typography.Caption>
              </div>
            </Animate.FadeIn>
            <Animate.FadeIn delay={100}>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-light text-gray-900 mb-1">85%</div>
                <Typography.Caption>Less time scheduling</Typography.Caption>
              </div>
            </Animate.FadeIn>
            <Animate.FadeIn delay={200}>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-light text-gray-900 mb-1">50+</div>
                <Typography.Caption>More integrations</Typography.Caption>
              </div>
            </Animate.FadeIn>
            <Animate.FadeIn delay={300}>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-light text-gray-900 mb-1">20%</div>
                <Typography.Caption>Lower cost</Typography.Caption>
              </div>
            </Animate.FadeIn>
          </Grid>
        </Container>
      </Section>

      {/* Feature Comparison */}
      <Section spacing="large" id="comparison">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Feature-by-feature comparison
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              See exactly how punctual.ai compares to Calendly across every feature that matters.
              Spoiler alert: we win in almost every category.
            </Typography.Body>
          </div>

          <div className="space-y-12">
            {comparisonData.map((category, categoryIndex) => (
              <Animate.FadeIn key={category.category} delay={categoryIndex * 100}>
                <Card variant="default" className="overflow-hidden">
                  <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
                    <Typography.Headline className="mb-0 text-lg">
                      {category.category}
                    </Typography.Headline>
                  </div>
                  <div className="p-0">
                    {/* Header */}
                    <div className="grid grid-cols-3 border-b border-gray-100">
                      <div className="px-8 py-4 font-medium text-gray-900">Feature</div>
                      <div className="px-8 py-4 font-medium text-gray-900 border-l border-gray-100 text-center">punctual.ai</div>
                      <div className="px-8 py-4 font-medium text-gray-600 border-l border-gray-100 text-center">Calendly</div>
                    </div>

                    {/* Features */}
                    {category.features.map((item, index) => (
                      <div key={item.feature} className={`grid grid-cols-3 ${index !== category.features.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <div className="px-8 py-4 text-gray-900">{item.feature}</div>
                        <div className="px-8 py-4 border-l border-gray-100 text-center">
                          {typeof item.punctual === 'boolean' ? (
                            item.punctual ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-900 font-medium">{item.punctual}</span>
                          )}
                        </div>
                        <div className="px-8 py-4 border-l border-gray-100 text-center">
                          {typeof item.calendly === 'boolean' ? (
                            item.calendly ? (
                              <Check className="h-5 w-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-500 mx-auto" />
                            )
                          ) : (
                            <span className="text-sm text-gray-600">{item.calendly}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Animate.FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Customer Testimonials */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              What switchers say
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Real feedback from professionals who made the switch from Calendly to punctual.ai.
            </Typography.Body>
          </div>

          <Grid cols={3} gap="medium">
            {customerTestimonials.map((testimonial, index) => (
              <Animate.FadeIn key={testimonial.author} delay={index * 100}>
                <Card variant="default" className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Typography.Body className="mb-6 italic">
                    "{testimonial.quote}"
                  </Typography.Body>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.author}</div>
                    <Typography.Caption className="text-gray-600">
                      {testimonial.role}
                    </Typography.Caption>
                  </div>
                </Card>
              </Animate.FadeIn>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Migration Guide */}
      <Section spacing="large">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Animate.FadeIn>
              <div>
                <Typography.Title className="mb-8">
                  Switch in 3 simple steps
                </Typography.Title>
                <Typography.Body className="mb-8">
                  Moving from Calendly to punctual.ai is easier than you think. Our migration wizard
                  handles the technical details while you focus on what matters—better scheduling
                  for your business.
                </Typography.Body>
                <div className="space-y-6">
                  {migrationSteps.map((step, index) => (
                    <div key={step.step} className="flex items-start">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm font-medium">
                        {step.step}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">{step.title}</div>
                        <Typography.Caption className="text-gray-600">
                          {step.description}
                        </Typography.Caption>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Animate.FadeIn>

            <Animate.FadeIn delay={200}>
              <Card variant="glass" className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <Typography.Headline className="mb-6">
                  Free migration support
                </Typography.Headline>
                <Typography.Body className="mb-8">
                  Our team will help you migrate from Calendly at no cost. We'll make sure
                  everything transfers perfectly and you're up and running in no time.
                </Typography.Body>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">One-on-one migration support</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">All data transferred safely</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Zero downtime guarantee</span>
                  </div>
                </div>
                <GlassButton variant="primary" size="large" className="w-full">
                  Start Migration
                </GlassButton>
              </Card>
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
                Ready to upgrade your scheduling?
              </Typography.Title>
              <Typography.Body className="max-w-2xl mx-auto mb-12">
                Join thousands who've already made the switch. Better features, better pricing,
                better experience. Try punctual.ai free for 14 days—no credit card required.
              </Typography.Body>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/contact">
                  <GlassButton variant="secondary" size="large">
                    Talk to Our Team
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
                Scheduling reimagined for the modern professional
              </Typography.Caption>
            </div>
            <div className="flex space-x-8">
              <Link href="/vs/cal-com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                vs Cal.com
              </Link>
              <Link href="/vs/acuity" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                vs Acuity
              </Link>
              <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <Typography.Caption>
              © 2024 punctual.ai. Better scheduling starts here.
            </Typography.Caption>
          </div>
        </Container>
      </footer>
    </div>
  )
}