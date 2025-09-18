'use client'

import { Linkedin, Twitter, Github, Award, Briefcase, GraduationCap, Quote } from 'lucide-react'
import Link from 'next/link'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead } from '@/components/premium/Typography'
import { Card, CardBody } from '@/components/premium/Card'
import { Button } from '@/components/premium/Button'
import { Footer } from '@/components/premium/Footer'

// Load design tokens
import '@/styles/design-tokens.css'

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Co-Founder & CEO',
    image: '/api/placeholder/400/400',
    bio: 'Former Google product lead with 15 years building consumer products used by millions. Passionate about removing friction from professional workflows.',
    education: 'Stanford MBA, MIT Computer Science',
    experience: 'Google, Microsoft, Two successful exits',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Co-Founder & CTO',
    image: '/api/placeholder/400/400',
    bio: 'Architecture visionary who led infrastructure teams at Apple and Netflix. Expert in building scalable systems that handle millions of requests.',
    education: 'Carnegie Mellon CS, Berkeley PhD',
    experience: 'Apple, Netflix, YC Alumni',
    linkedin: '#',
    twitter: '#',
    github: '#'
  },
  {
    name: 'Emma Thompson',
    role: 'Head of Design',
    image: '/api/placeholder/400/400',
    bio: 'Award-winning designer who believes great design is invisible. Previously designed products at Airbnb and Figma.',
    education: 'RISD Design, Parsons',
    experience: 'Airbnb, Figma, IDEO',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'James Park',
    role: 'Head of Engineering',
    image: '/api/placeholder/400/400',
    bio: 'Full-stack expert who built real-time systems at Meta and Uber. Advocates for engineering excellence and developer happiness.',
    education: 'MIT Computer Science',
    experience: 'Meta, Uber, Amazon',
    linkedin: '#',
    github: '#'
  },
  {
    name: 'Aisha Patel',
    role: 'Head of AI/ML',
    image: '/api/placeholder/400/400',
    bio: 'Machine learning researcher focused on practical AI applications. Published 20+ papers on NLP and predictive modeling.',
    education: 'Stanford AI Lab, Oxford Mathematics',
    experience: 'DeepMind, OpenAI, Microsoft Research',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'David Kim',
    role: 'Head of Growth',
    image: '/api/placeholder/400/400',
    bio: 'Growth strategist who scaled three startups from 0 to 1M users. Believes in sustainable, user-centric growth.',
    education: 'Wharton Business, UCLA Economics',
    experience: 'Stripe, Notion, Dropbox',
    linkedin: '#',
    twitter: '#'
  }
]

const advisors = [
  {
    name: 'Reid Hoffman',
    role: 'LinkedIn Co-Founder',
    expertise: 'Scaling & Strategy'
  },
  {
    name: 'Julie Zhuo',
    role: 'Former Facebook VP Design',
    expertise: 'Product Design'
  },
  {
    name: 'Elad Gil',
    role: 'Serial Entrepreneur',
    expertise: 'High-Growth Companies'
  }
]

export default function TeamPage() {
  return (
    <Layout>
      <Navigation />
      <Main>
        {/* Hero Section */}
        <Section spacing="spacious">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">Our Team</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                Meet the Minds Behind Punctual.ai
              </Headline>
              <Lead align="center">
                A diverse team of builders, dreamers, and problem-solvers united by a mission
                to make scheduling effortless for everyone.
              </Lead>
            </div>
          </Container>
        </Section>

        {/* Culture Section */}
        <Section className="bg-[var(--bg-secondary)]">
          <Container>
            <div className="grid md:grid-cols-2 gap-[var(--space-8)] items-center">
              <div>
                <Headline level={2} size="xl" className="mb-[var(--space-4)]">
                  Building the Future of Work
                </Headline>
                <div className="space-y-[var(--space-4)] text-[var(--text-secondary)]">
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    We&apos;re a team of experienced professionals who&apos;ve felt the pain of scheduling
                    chaos firsthand. Our diverse backgrounds—from enterprise software to consumer
                    apps, from AI research to design studios—give us unique perspectives on solving
                    this universal problem.
                  </p>
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    What unites us is a shared belief: technology should reduce friction, not create it.
                    Every team member is empowered to challenge assumptions, propose bold ideas, and
                    shape the future of how professionals connect and collaborate.
                  </p>
                  <p className="text-[var(--fs-base)] leading-relaxed">
                    We value intellectual curiosity, user empathy, and the courage to build something
                    truly transformative. Our culture emphasizes continuous learning, transparent
                    communication, and celebrating both individual excellence and team achievements.
                  </p>
                </div>
              </div>
              <div>
                <Card variant="glass">
                  <CardBody className="text-center py-[var(--space-8)]">
                    <Quote className="w-12 h-12 text-[var(--brand-primary)] mx-auto mb-[var(--space-4)]" />
                    <p className="text-[var(--fs-lg)] text-[var(--text-primary)] italic mb-[var(--space-4)]">
                      &quot;The best teams are built on trust, fueled by purpose, and united by
                      a vision bigger than any individual. That&apos;s what we&apos;re building at Punctual.ai.&quot;
                    </p>
                    <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                      — Sarah Chen, CEO
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Team Grid */}
        <Section spacing="spacious">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Leadership Team
              </Headline>
              <Lead align="center">
                Experienced builders who&apos;ve shipped products used by billions
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-8)]">
              {teamMembers.map((member, index) => (
                <Card key={index} variant="elevated" className="overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10" />
                  <CardBody>
                    <Headline level={3} size="md" className="mb-[var(--space-2)]">
                      {member.name}
                    </Headline>
                    <p className="text-[var(--brand-primary)] text-[var(--fs-sm)] font-[var(--fw-medium)] mb-[var(--space-3)]">
                      {member.role}
                    </p>
                    <p className="text-[var(--text-secondary)] text-[var(--fs-sm)] mb-[var(--space-4)]">
                      {member.bio}
                    </p>

                    <div className="space-y-[var(--space-2)] mb-[var(--space-4)]">
                      <div className="flex items-start space-x-2">
                        <GraduationCap className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" />
                        <span className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                          {member.education}
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Briefcase className="w-4 h-4 text-[var(--text-tertiary)] mt-0.5" />
                        <span className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                          {member.experience}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-[var(--space-3)]">
                      {member.linkedin && (
                        <Link
                          href={member.linkedin}
                          className="text-[var(--text-tertiary)] hover:text-[var(--brand-primary)] transition-colors"
                        >
                          <Linkedin className="w-5 h-5" />
                        </Link>
                      )}
                      {member.twitter && (
                        <Link
                          href={member.twitter}
                          className="text-[var(--text-tertiary)] hover:text-[var(--brand-primary)] transition-colors"
                        >
                          <Twitter className="w-5 h-5" />
                        </Link>
                      )}
                      {member.github && (
                        <Link
                          href={member.github}
                          className="text-[var(--text-tertiary)] hover:text-[var(--brand-primary)] transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Advisors Section */}
        <Section className="bg-[var(--bg-secondary)]">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-8)]">
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                World-Class Advisors
              </Headline>
              <Lead align="center">
                Guided by leaders who&apos;ve built and scaled iconic companies
              </Lead>
            </div>

            <div className="grid md:grid-cols-3 gap-[var(--space-6)]">
              {advisors.map((advisor, index) => (
                <Card key={index} variant="bordered">
                  <CardBody className="text-center">
                    <Award className="w-10 h-10 text-[var(--brand-primary)] mx-auto mb-[var(--space-3)]" />
                    <Headline level={4} size="md" className="mb-[var(--space-2)]">
                      {advisor.name}
                    </Headline>
                    <p className="text-[var(--fs-sm)] text-[var(--text-secondary)] mb-[var(--space-2)]">
                      {advisor.role}
                    </p>
                    <p className="text-[var(--fs-xs)] text-[var(--brand-primary)] font-[var(--fw-medium)]">
                      {advisor.expertise}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Values Section */}
        <Section spacing="spacious">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">How We Work</Eyebrow>
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Our Team Values
              </Headline>
              <Lead align="center">
                The principles that guide how we build, collaborate, and grow together
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 gap-[var(--space-8)]">
              <div>
                <Card variant="glass">
                  <CardBody>
                    <Headline level={3} size="lg" className="mb-[var(--space-3)]">
                      Ship Fast, Learn Faster
                    </Headline>
                    <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                      We believe in rapid iteration and learning from real user feedback. Perfect is the
                      enemy of good—we ship early, measure impact, and improve continuously. Every team
                      member is empowered to make decisions and move quickly.
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      This doesn&apos;t mean compromising on quality. It means focusing on what matters most
                      to users, validating assumptions quickly, and having the courage to change course
                      when data shows us a better path.
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div>
                <Card variant="glass">
                  <CardBody>
                    <Headline level={3} size="lg" className="mb-[var(--space-3)]">
                      Radical Transparency
                    </Headline>
                    <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                      Information flows freely at Punctual.ai. We share context broadly, communicate
                      challenges openly, and celebrate both wins and learnings from failures. Everyone
                      has access to the data and insights they need to do their best work.
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      This transparency extends to our users too. We&apos;re open about our roadmap, honest
                      about our limitations, and always eager to hear feedback—even when it&apos;s critical.
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div>
                <Card variant="glass">
                  <CardBody>
                    <Headline level={3} size="lg" className="mb-[var(--space-3)]">
                      User-Obsessed, Always
                    </Headline>
                    <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                      Every decision starts with the user. We regularly talk to customers, observe how
                      they use our product, and deeply understand their workflows. We&apos;re not building
                      for imaginary users—we&apos;re solving real problems for real professionals.
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      This obsession means saying no to features that don&apos;t serve our core mission,
                      even if they&apos;re technically interesting. It means choosing simplicity over
                      complexity, every single time.
                    </p>
                  </CardBody>
                </Card>
              </div>

              <div>
                <Card variant="glass">
                  <CardBody>
                    <Headline level={3} size="lg" className="mb-[var(--space-3)]">
                      Growth Through Challenge
                    </Headline>
                    <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                      We believe the best work happens when smart people tackle hard problems together.
                      We encourage healthy debate, welcome diverse perspectives, and view disagreement
                      as a path to better solutions.
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      Every team member is both a teacher and a student. We invest in each other&apos;s growth,
                      share knowledge generously, and create space for everyone to do the best work of
                      their careers.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Join Us CTA */}
        <Section spacing="spacious" className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white">
          <Container size="narrow">
            <div className="text-center">
              <Headline level={2} size="xl" align="center" className="text-white mb-[var(--space-4)]">
                Join Our Mission
              </Headline>
              <p className="text-white/90 text-[var(--fs-lg)] mb-[var(--space-6)]">
                We&apos;re always looking for exceptional people who want to build
                the future of professional scheduling
              </p>
              <Button
                href="/careers"
                variant="secondary"
                size="large"
                className="bg-white text-[var(--brand-primary)] hover:bg-white/90"
              >
                View Open Positions
              </Button>
            </div>
          </Container>
        </Section>
      </Main>
      <Footer />
    </Layout>
  )
}