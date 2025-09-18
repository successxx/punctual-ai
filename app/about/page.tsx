'use client'

import { ArrowRight, Target, Heart, Lightbulb, Award, Users, Globe, Sparkles, TrendingUp } from 'lucide-react'
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

export default function AboutPage() {
  return (
    <Layout>
      <Navigation />
      <Main>
        {/* Hero Section */}
        <Section spacing="spacious">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">About Punctual.ai</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                Transforming How the World Schedules Meetings
              </Headline>
              <Lead align="center">
                We&apos;re on a mission to eliminate the friction in professional scheduling,
                making every meeting matter and every minute count.
              </Lead>
            </div>
          </Container>
        </Section>

        {/* Our Story Section */}
        <Section>
          <Container>
            <div className="grid md:grid-cols-2 gap-[var(--space-8)] items-center mb-[var(--space-12)]">
              <div>
                <Headline level={2} size="xl" className="mb-[var(--space-4)]">
                  Our Story
                </Headline>
                <div className="space-y-[var(--space-4)] text-[var(--text-secondary)]">
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    Punctual.ai was born from a simple observation: professionals waste countless hours
                    coordinating meetings instead of having them. In 2024, our founding team of former
                    Google, Apple, and Microsoft engineers set out to solve this universal problem.
                  </p>
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    We believed that scheduling shouldn&apos;t require dozens of back-and-forth emails,
                    timezone confusion, or double-bookings. Technology should work seamlessly in the
                    background, allowing professionals to focus on what truly matters—connecting with
                    people and driving meaningful outcomes.
                  </p>
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    Today, Punctual.ai powers scheduling for over 100,000 professionals worldwide,
                    from solo entrepreneurs to Fortune 500 companies. We&apos;ve eliminated millions of
                    scheduling conflicts, saved thousands of hours, and helped our users maintain better
                    work-life balance through intelligent availability management.
                  </p>
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    But we&apos;re just getting started. As we look to the future, we&apos;re building AI-powered
                    features that don&apos;t just schedule meetings—they optimize your entire calendar to
                    maximize productivity, protect focus time, and ensure you&apos;re always meeting-ready.
                  </p>
                </div>
              </div>
              <div className="relative">
                <Card variant="glass" className="overflow-hidden">
                  <CardBody className="p-0">
                    <div className="aspect-[4/3] bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] flex items-center justify-center">
                      <Sparkles className="w-24 h-24 text-white/20" />
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Mission & Vision */}
        <Section spacing="relaxed" className="bg-[var(--bg-secondary)]">
          <Container>
            <div className="grid md:grid-cols-2 gap-[var(--space-8)]">
              <Card variant="elevated">
                <CardBody>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-4)]">
                    <Target className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <Headline level={3} size="lg" className="mb-[var(--space-3)]">
                    Our Mission
                  </Headline>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    To eliminate scheduling friction for every professional worldwide, giving them
                    back time to focus on work that matters. We believe that technology should handle
                    the logistics so humans can focus on connection, creativity, and impact.
                  </p>
                </CardBody>
              </Card>

              <Card variant="elevated">
                <CardBody>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-4)]">
                    <Lightbulb className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <Headline level={3} size="lg" className="mb-[var(--space-3)]">
                    Our Vision
                  </Headline>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    A world where scheduling is invisible—where AI understands your priorities,
                    protects your time, and ensures every meeting is purposeful. We envision calendars
                    that adapt to your life, not the other way around.
                  </p>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Core Values */}
        <Section spacing="spacious">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">What Drives Us</Eyebrow>
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Our Core Values
              </Headline>
              <Lead align="center">
                These principles guide every decision we make and every feature we build
              </Lead>
            </div>

            <div className="grid md:grid-cols-3 gap-[var(--space-6)]">
              <Card variant="bordered">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] mb-[var(--space-4)]">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <Headline level={4} size="md" className="mb-[var(--space-3)]">
                    User Obsession
                  </Headline>
                  <p className="text-[var(--text-secondary)]">
                    Every feature starts with a real user problem. We&apos;re obsessed with understanding
                    our users&apos; workflows, pain points, and aspirations. If it doesn&apos;t make our users&apos;
                    lives demonstrably better, we don&apos;t build it.
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] mb-[var(--space-4)]">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <Headline level={4} size="md" className="mb-[var(--space-3)]">
                    Elegant Simplicity
                  </Headline>
                  <p className="text-[var(--text-secondary)]">
                    Complexity is easy; simplicity is hard. We believe the best solutions are invisible—they
                    work so well that users forget they&apos;re using technology at all. Every interaction is
                    thoughtfully designed to be intuitive and delightful.
                  </p>
                </CardBody>
              </Card>

              <Card variant="bordered">
                <CardBody className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] mb-[var(--space-4)]">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <Headline level={4} size="md" className="mb-[var(--space-3)]">
                    Continuous Innovation
                  </Headline>
                  <p className="text-[var(--text-secondary)]">
                    The future of work is constantly evolving, and so are we. We embrace change, experiment
                    boldly, and aren&apos;t afraid to reimagine what scheduling could be. Our users inspire us
                    to push boundaries every day.
                  </p>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Impact Numbers */}
        <Section className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Headline level={2} size="xl" align="center" className="text-white mb-[var(--space-4)]">
                Our Impact by the Numbers
              </Headline>
              <p className="text-white/80 text-[var(--fs-lg)]">
                Measurable results that demonstrate our commitment to saving time
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-[var(--space-6)]">
              <div className="text-center">
                <div className="text-[3rem] font-[var(--fw-bold)] mb-[var(--space-2)]">100K+</div>
                <div className="text-white/80">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-[3rem] font-[var(--fw-bold)] mb-[var(--space-2)]">5M+</div>
                <div className="text-white/80">Meetings Scheduled</div>
              </div>
              <div className="text-center">
                <div className="text-[3rem] font-[var(--fw-bold)] mb-[var(--space-2)]">2M+</div>
                <div className="text-white/80">Hours Saved</div>
              </div>
              <div className="text-center">
                <div className="text-[3rem] font-[var(--fw-bold)] mb-[var(--space-2)]">99.9%</div>
                <div className="text-white/80">Uptime</div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Why Choose Us */}
        <Section spacing="spacious">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">The Punctual.ai Difference</Eyebrow>
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Why Professionals Choose Punctual.ai
              </Headline>
            </div>

            <div className="space-y-[var(--space-6)]">
              <Card variant="glass">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-[var(--brand-primary)]" />
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Global Timezone Intelligence
                      </Headline>
                      <p className="text-[var(--text-secondary)]">
                        Our AI automatically handles timezone complexities, suggesting optimal meeting times
                        that work for all participants, regardless of their location. No more mental math or
                        scheduling conflicts due to timezone confusion.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="glass">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[var(--brand-primary)]" />
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Team-First Architecture
                      </Headline>
                      <p className="text-[var(--text-secondary)]">
                        Built for collaboration from day one. Share availability across teams, coordinate
                        group meetings effortlessly, and maintain visibility into team schedules while
                        respecting individual privacy preferences.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="glass">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[var(--brand-primary)]" />
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        AI-Powered Optimization
                      </Headline>
                      <p className="text-[var(--text-secondary)]">
                        Our machine learning algorithms learn your preferences over time, automatically
                        suggesting optimal meeting slots, protecting focus time, and even predicting
                        which meetings might need rescheduling based on historical patterns.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Call to Action */}
        <Section spacing="spacious" className="bg-[var(--bg-secondary)]">
          <Container size="narrow">
            <Card variant="elevated" className="text-center">
              <CardBody className="py-[var(--space-10)]">
                <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                  Ready to Transform Your Scheduling?
                </Headline>
                <Lead align="center" className="mb-[var(--space-6)]">
                  Join thousands of professionals who&apos;ve eliminated scheduling friction forever
                </Lead>
                <div className="flex flex-col sm:flex-row gap-[var(--space-4)] justify-center">
                  <Button
                    href="/register"
                    variant="primary"
                    size="large"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    href="/contact"
                    variant="secondary"
                    size="large"
                  >
                    Contact Sales
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Container>
        </Section>
      </Main>
      <Footer />
    </Layout>
  )
}