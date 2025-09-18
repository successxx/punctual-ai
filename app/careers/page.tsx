'use client'

import { ArrowRight, MapPin, Clock, DollarSign, Heart, Home, Rocket, Users, Code, Palette, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead } from '@/components/premium/Typography'
import { Button } from '@/components/premium/Button'
import { Card, CardBody } from '@/components/premium/Card'
import { Footer } from '@/components/premium/Footer'

// Load design tokens
import '@/styles/design-tokens.css'

const openPositions = [
  {
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    icon: Code,
    description: 'Build delightful user experiences using React, TypeScript, and modern web technologies.',
    requirements: [
      '5+ years of frontend development experience',
      'Expert-level React and TypeScript skills',
      'Experience with real-time applications',
      'Strong understanding of web performance'
    ]
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    icon: Palette,
    description: 'Design intuitive interfaces that millions of professionals will use daily.',
    requirements: [
      '3+ years of product design experience',
      'Strong portfolio of consumer or SaaS products',
      'Proficiency in Figma and design systems',
      'Experience with user research and testing'
    ]
  },
  {
    title: 'Machine Learning Engineer',
    department: 'AI/ML',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    icon: Rocket,
    description: 'Build AI systems that understand and optimize professional schedules.',
    requirements: [
      'MS/PhD in ML, CS, or related field',
      'Experience with production ML systems',
      'Strong Python and TensorFlow/PyTorch skills',
      'Background in NLP or time-series analysis'
    ]
  },
  {
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco / Remote',
    type: 'Full-time',
    icon: TrendingUp,
    description: 'Drive user acquisition and engagement through data-driven marketing strategies.',
    requirements: [
      '4+ years in growth or performance marketing',
      'Experience with B2B SaaS growth',
      'Strong analytical and SQL skills',
      'Track record of scaling user acquisition'
    ]
  },
  {
    title: 'Security Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    icon: Shield,
    description: 'Protect user data and ensure our infrastructure meets the highest security standards.',
    requirements: [
      '3+ years of security engineering experience',
      'Experience with cloud security (AWS/Azure)',
      'Knowledge of compliance frameworks (SOC2, GDPR)',
      'Security certifications are a plus'
    ]
  }
]

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Compensation',
    description: 'Top-of-market salary and equity packages that reflect your impact'
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: '100% coverage for medical, dental, vision, and mental health support'
  },
  {
    icon: Home,
    title: 'Flexible Work',
    description: 'Work from anywhere with quarterly team gatherings in San Francisco'
  },
  {
    icon: Clock,
    title: 'Time Off',
    description: 'Unlimited PTO, sabbaticals, and company-wide recharge weeks'
  },
  {
    icon: Rocket,
    title: 'Growth Budget',
    description: '$2,000 annual budget for learning, conferences, and development'
  },
  {
    icon: Users,
    title: 'Team Culture',
    description: 'Regular team events, offsites, and a culture of continuous learning'
  }
]

export default function CareersPage() {
  return (
    <Layout>
      <Navigation />
      <Main>
        {/* Hero Section */}
        <Section spacing="spacious">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">Careers at Punctual.ai</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                Build the Future of Professional Scheduling
              </Headline>
              <Lead align="center">
                Join a team that&apos;s eliminating scheduling friction for millions of professionals
                worldwide. We&apos;re looking for exceptional people who want to do the best work
                of their careers.
              </Lead>
            </div>
          </Container>
        </Section>

        {/* Why Join Us */}
        <Section className="bg-[var(--bg-secondary)]">
          <Container>
            <div className="grid md:grid-cols-2 gap-[var(--space-8)] items-center">
              <div>
                <Headline level={2} size="xl" className="mb-[var(--space-4)]">
                  Why Join Punctual.ai?
                </Headline>
                <div className="space-y-[var(--space-4)] text-[var(--text-secondary)]">
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    We&apos;re not just building another scheduling tool—we&apos;re reimagining how
                    professionals manage their time and connect with others. Our product touches
                    millions of lives, saving countless hours that can be spent on meaningful work.
                  </p>
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    At Punctual.ai, you&apos;ll work on challenging technical problems at scale, from
                    distributed systems handling millions of bookings to AI that understands the
                    nuances of professional schedules. You&apos;ll collaborate with a world-class team
                    that values craftsmanship, user obsession, and continuous learning.
                  </p>
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    We believe great products come from diverse teams. We actively seek people from
                    all backgrounds, experiences, and perspectives. If you&apos;re passionate about
                    building products that matter and want to work with kind, brilliant people,
                    we want to hear from you.
                  </p>
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    Our culture emphasizes ownership, impact, and growth. Every team member has
                    significant autonomy and the opportunity to shape not just our product, but
                    our company culture and trajectory. Your voice matters here.
                  </p>
                </div>
              </div>
              <div>
                <Card variant="glass">
                  <CardBody>
                    <div className="space-y-[var(--space-6)]">
                      <div>
                        <div className="text-[3rem] font-[var(--fw-bold)] text-[var(--brand-primary)] mb-[var(--space-2)]">
                          $180M
                        </div>
                        <p className="text-[var(--text-secondary)]">Series B funding from top-tier VCs</p>
                      </div>
                      <div>
                        <div className="text-[3rem] font-[var(--fw-bold)] text-[var(--brand-primary)] mb-[var(--space-2)]">
                          100K+
                        </div>
                        <p className="text-[var(--text-secondary)]">Active users growing 20% month-over-month</p>
                      </div>
                      <div>
                        <div className="text-[3rem] font-[var(--fw-bold)] text-[var(--brand-primary)] mb-[var(--space-2)]">
                          45
                        </div>
                        <p className="text-[var(--text-secondary)]">Team members across 12 countries</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Benefits */}
        <Section spacing="spacious">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">Perks & Benefits</Eyebrow>
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                We Take Care of Our Team
              </Headline>
              <Lead align="center">
                Comprehensive benefits that support your health, growth, and life outside work
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6)]">
              {benefits.map((benefit, index) => (
                <Card key={index} variant="bordered">
                  <CardBody>
                    <div className="flex items-start space-x-[var(--space-4)]">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                          <benefit.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                        </div>
                      </div>
                      <div>
                        <Headline level={4} size="md" className="mb-[var(--space-2)]">
                          {benefit.title}
                        </Headline>
                        <p className="text-[var(--text-secondary)] text-[var(--fs-sm)]">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Open Positions */}
        <Section className="bg-[var(--bg-secondary)]" spacing="spacious">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">Open Positions</Eyebrow>
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Find Your Role
              </Headline>
              <Lead align="center">
                We&apos;re growing fast and looking for exceptional talent across all departments
              </Lead>
            </div>

            <div className="space-y-[var(--space-6)]">
              {openPositions.map((position, index) => (
                <Card key={index} variant="elevated" className="hover:shadow-lg transition-shadow">
                  <CardBody>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="flex items-start space-x-[var(--space-4)] mb-[var(--space-4)] md:mb-0">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] flex items-center justify-center">
                            <position.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <Headline level={3} size="md" className="mb-[var(--space-2)]">
                            {position.title}
                          </Headline>
                          <div className="flex flex-wrap items-center gap-[var(--space-3)] text-[var(--fs-sm)] text-[var(--text-tertiary)] mb-[var(--space-3)]">
                            <span>{position.department}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{position.location}</span>
                            </div>
                            <span>•</span>
                            <span>{position.type}</span>
                          </div>
                          <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                            {position.description}
                          </p>
                          <div className="space-y-[var(--space-2)]">
                            {position.requirements.map((req, reqIndex) => (
                              <div key={reqIndex} className="flex items-start space-x-2">
                                <span className="text-[var(--brand-primary)] mt-1">•</span>
                                <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                                  {req}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-[var(--space-4)] md:mt-0 md:ml-[var(--space-6)]">
                        <Button
                          href={`/careers/apply?position=${encodeURIComponent(position.title)}`}
                          variant="primary"
                          size="medium"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Interview Process */}
        <Section spacing="spacious">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">What to Expect</Eyebrow>
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Our Interview Process
              </Headline>
              <Lead align="center">
                Designed to be thorough yet respectful of your time
              </Lead>
            </div>

            <div className="space-y-[var(--space-6)]">
              <Card variant="glass">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-[var(--fs-sm)] font-[var(--fw-semibold)]">
                        1
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Application Review
                      </Headline>
                      <p className="text-[var(--text-secondary)]">
                        We review every application carefully. If your background aligns with what we&apos;re
                        looking for, we&apos;ll reach out within 3-5 business days to schedule an initial call.
                        We value quality over speed and want to ensure we give your application the attention
                        it deserves.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="glass">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-[var(--fs-sm)] font-[var(--fw-semibold)]">
                        2
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Initial Conversation
                      </Headline>
                      <p className="text-[var(--text-secondary)]">
                        A 30-minute video call with someone from our team to discuss your background,
                        interests, and what you&apos;re looking for in your next role. This is also your chance
                        to learn about Punctual.ai, our culture, and ask any questions you have.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="glass">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-[var(--fs-sm)] font-[var(--fw-semibold)]">
                        3
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Technical Assessment
                      </Headline>
                      <p className="text-[var(--text-secondary)]">
                        For technical roles, we&apos;ll have a practical assessment relevant to the position.
                        This could be a take-home project, pair programming session, or design challenge.
                        We focus on real-world problems similar to what you&apos;d work on at Punctual.ai.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="glass">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-[var(--fs-sm)] font-[var(--fw-semibold)]">
                        4
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Team Interviews
                      </Headline>
                      <p className="text-[var(--text-secondary)]">
                        You&apos;ll meet with 3-4 team members across different functions. These conversations
                        dive deeper into your experience, problem-solving approach, and how you collaborate.
                        We&apos;ll also share more about our challenges and opportunities ahead.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="glass">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-[var(--fs-sm)] font-[var(--fw-semibold)]">
                        5
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Decision & Offer
                      </Headline>
                      <p className="text-[var(--text-secondary)]">
                        We move quickly on decisions and will get back to you within 2-3 days. If we extend
                        an offer, we&apos;ll work with you to ensure all your questions are answered and you
                        have everything needed to make the best decision for your career.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Don't See Your Role */}
        <Section className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white">
          <Container size="narrow">
            <div className="text-center">
              <Headline level={2} size="xl" align="center" className="text-white mb-[var(--space-4)]">
                Don&apos;t See Your Perfect Role?
              </Headline>
              <p className="text-white/90 text-[var(--fs-lg)] mb-[var(--space-6)]">
                We&apos;re always looking for exceptional talent. Send us your resume and
                tell us how you&apos;d contribute to our mission.
              </p>
              <Button
                href="mailto:careers@punctual.ai"
                variant="secondary"
                size="large"
                className="bg-white text-[var(--brand-primary)] hover:bg-white/90"
              >
                Send Us Your Resume
              </Button>
            </div>
          </Container>
        </Section>
      </Main>
      <Footer />
    </Layout>
  )
}