'use client'

import { useState } from 'react'
import { Search, Book, MessageCircle, Video, FileText, HelpCircle, Zap, Shield, CreditCard, Users, Calendar, Settings, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead } from '@/components/premium/Typography'
import { Button } from '@/components/premium/Button'
import { Card, CardBody } from '@/components/premium/Card'
import { FormField, Input } from '@/components/premium/Form'
import { Footer } from '@/components/premium/Footer'

// Load design tokens
import '@/styles/design-tokens.css'

const helpCategories = [
  {
    icon: Zap,
    title: 'Getting Started',
    description: 'Learn the basics of setting up your account and scheduling your first meeting',
    articles: 12,
    popular: [
      'How to create your first booking page',
      'Setting up your availability',
      'Connecting your calendar',
      'Customizing your booking link'
    ]
  },
  {
    icon: Calendar,
    title: 'Managing Bookings',
    description: 'Everything about creating, editing, and managing your bookings',
    articles: 18,
    popular: [
      'How to reschedule a meeting',
      'Canceling bookings',
      'Setting buffer times between meetings',
      'Managing recurring appointments'
    ]
  },
  {
    icon: Users,
    title: 'Team Features',
    description: 'Collaborate with your team and manage group scheduling',
    articles: 15,
    popular: [
      'Adding team members',
      'Round-robin scheduling',
      'Team availability pages',
      'Managing team permissions'
    ]
  },
  {
    icon: Shield,
    title: 'Security & Privacy',
    description: 'Keep your data safe and understand our security practices',
    articles: 10,
    popular: [
      'Two-factor authentication',
      'Data encryption and storage',
      'GDPR compliance',
      'Managing data exports'
    ]
  },
  {
    icon: CreditCard,
    title: 'Billing & Plans',
    description: 'Manage your subscription and understand pricing',
    articles: 8,
    popular: [
      'Upgrading to Premium',
      'Managing your subscription',
      'Understanding billing cycles',
      'Getting invoices and receipts'
    ]
  },
  {
    icon: Settings,
    title: 'Account Settings',
    description: 'Customize your profile and account preferences',
    articles: 14,
    popular: [
      'Updating your profile',
      'Changing your timezone',
      'Email notification settings',
      'Integrations and API access'
    ]
  }
]

const popularArticles = [
  {
    title: 'Quick Start Guide: Schedule Your First Meeting in 3 Minutes',
    category: 'Getting Started',
    readTime: '3 min',
    helpful: 2847
  },
  {
    title: 'How to Integrate with Google Calendar',
    category: 'Integrations',
    readTime: '5 min',
    helpful: 2103
  },
  {
    title: 'Setting Up Automatic Reminders for Your Meetings',
    category: 'Managing Bookings',
    readTime: '4 min',
    helpful: 1892
  },
  {
    title: 'Understanding Different Booking Types',
    category: 'Features',
    readTime: '6 min',
    helpful: 1654
  },
  {
    title: 'Troubleshooting Calendar Sync Issues',
    category: 'Troubleshooting',
    readTime: '4 min',
    helpful: 1432
  }
]

const videoTutorials = [
  {
    title: 'Getting Started with Punctual.ai',
    duration: '8:32',
    thumbnail: '/api/placeholder/400/225'
  },
  {
    title: 'Advanced Scheduling Features',
    duration: '12:45',
    thumbnail: '/api/placeholder/400/225'
  },
  {
    title: 'Team Collaboration Tools',
    duration: '10:18',
    thumbnail: '/api/placeholder/400/225'
  },
  {
    title: 'Customizing Your Booking Page',
    duration: '6:24',
    thumbnail: '/api/placeholder/400/225'
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Layout>
      <Navigation />
      <Main>
        {/* Hero Section */}
        <Section spacing="spacious" className="bg-gradient-to-br from-[var(--brand-primary)]/5 to-[var(--brand-secondary)]/5">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-8)]">
              <Eyebrow variant="accent">Help Center</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                How Can We Help You?
              </Headline>
              <Lead align="center">
                Find answers, watch tutorials, and learn how to get the most out of Punctual.ai
              </Lead>
            </div>

            {/* Search Bar */}
            <Card variant="elevated" className="max-w-2xl mx-auto">
              <CardBody>
                <FormField>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                    <Input
                      type="text"
                      placeholder="Search for help articles, tutorials, or topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4"
                    />
                  </div>
                </FormField>
                <div className="mt-[var(--space-3)] flex flex-wrap gap-[var(--space-2)]">
                  <span className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">Popular searches:</span>
                  <button className="text-[var(--fs-sm)] text-[var(--brand-primary)] hover:underline">
                    calendar sync
                  </button>
                  <span className="text-[var(--text-tertiary)]">•</span>
                  <button className="text-[var(--fs-sm)] text-[var(--brand-primary)] hover:underline">
                    timezone settings
                  </button>
                  <span className="text-[var(--text-tertiary)]">•</span>
                  <button className="text-[var(--fs-sm)] text-[var(--brand-primary)] hover:underline">
                    team scheduling
                  </button>
                </div>
              </CardBody>
            </Card>
          </Container>
        </Section>

        {/* Quick Links */}
        <Section>
          <Container>
            <div className="grid md:grid-cols-3 gap-[var(--space-6)]">
              <Card variant="bordered" className="hover:shadow-md transition-shadow">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                        <Book className="w-5 h-5 text-[var(--brand-primary)]" />
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Documentation
                      </Headline>
                      <p className="text-[var(--text-secondary)] text-[var(--fs-sm)] mb-[var(--space-3)]">
                        Comprehensive guides and API references
                      </p>
                      <Link href="/docs" className="text-[var(--brand-primary)] text-[var(--fs-sm)] hover:underline flex items-center space-x-1">
                        <span>Browse docs</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="bordered" className="hover:shadow-md transition-shadow">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                        <Video className="w-5 h-5 text-[var(--brand-primary)]" />
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Video Tutorials
                      </Headline>
                      <p className="text-[var(--text-secondary)] text-[var(--fs-sm)] mb-[var(--space-3)]">
                        Step-by-step video guides
                      </p>
                      <Link href="#tutorials" className="text-[var(--brand-primary)] text-[var(--fs-sm)] hover:underline flex items-center space-x-1">
                        <span>Watch videos</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="bordered" className="hover:shadow-md transition-shadow">
                <CardBody>
                  <div className="flex items-start space-x-[var(--space-4)]">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-[var(--brand-primary)]" />
                      </div>
                    </div>
                    <div>
                      <Headline level={4} size="md" className="mb-[var(--space-2)]">
                        Contact Support
                      </Headline>
                      <p className="text-[var(--text-secondary)] text-[var(--fs-sm)] mb-[var(--space-3)]">
                        Get help from our support team
                      </p>
                      <Link href="/contact" className="text-[var(--brand-primary)] text-[var(--fs-sm)] hover:underline flex items-center space-x-1">
                        <span>Get support</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Help Categories */}
        <Section spacing="spacious" className="bg-[var(--bg-secondary)]">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Browse by Category
              </Headline>
              <Lead align="center">
                Find detailed guides and answers organized by topic
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6)]">
              {helpCategories.map((category, index) => (
                <Card key={index} variant="elevated" className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardBody>
                    <div className="flex items-start space-x-[var(--space-4)] mb-[var(--space-4)]">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] flex items-center justify-center">
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Headline level={3} size="md" className="mb-[var(--space-2)]">
                          {category.title}
                        </Headline>
                        <p className="text-[var(--text-secondary)] text-[var(--fs-sm)] mb-[var(--space-1)]">
                          {category.description}
                        </p>
                        <p className="text-[var(--text-tertiary)] text-[var(--fs-xs)]">
                          {category.articles} articles
                        </p>
                      </div>
                    </div>

                    <div className="space-y-[var(--space-2)]">
                      {category.popular.map((article, articleIndex) => (
                        <Link
                          key={articleIndex}
                          href={`/help/${category.title.toLowerCase().replace(' ', '-')}/${article.toLowerCase().replace(/ /g, '-')}`}
                          className="flex items-center justify-between text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors"
                        >
                          <span>{article}</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      ))}
                    </div>

                    <div className="mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[var(--border-default)]">
                      <Link
                        href={`/help/${category.title.toLowerCase().replace(' ', '-')}`}
                        className="text-[var(--brand-primary)] text-[var(--fs-sm)] font-[var(--fw-medium)] hover:underline flex items-center space-x-1"
                      >
                        <span>View all articles</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Popular Articles */}
        <Section spacing="relaxed">
          <Container size="narrow">
            <div className="mb-[var(--space-8)]">
              <Headline level={2} size="xl" className="mb-[var(--space-4)]">
                Most Popular Articles
              </Headline>
              <p className="text-[var(--text-secondary)]">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-[var(--space-4)]">
              {popularArticles.map((article, index) => (
                <Card key={index} variant="bordered" className="hover:shadow-md transition-shadow">
                  <CardBody>
                    <Link
                      href={`/help/article/${article.title.toLowerCase().replace(/ /g, '-')}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-2)]">
                          <span className="text-[var(--fs-xs)] text-[var(--brand-primary)] font-[var(--fw-medium)]">
                            {article.category}
                          </span>
                          <span className="text-[var(--text-tertiary)]">•</span>
                          <span className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                            {article.readTime} read
                          </span>
                        </div>
                        <Headline level={4} size="md" className="text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors">
                          {article.title}
                        </Headline>
                        <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)] mt-[var(--space-2)]">
                          {article.helpful.toLocaleString()} people found this helpful
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[var(--text-tertiary)]" />
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Video Tutorials */}
        <Section id="tutorials" spacing="spacious" className="bg-[var(--bg-secondary)]">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">Learn by Watching</Eyebrow>
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Video Tutorials
              </Headline>
              <Lead align="center">
                Visual guides to help you master Punctual.ai features
              </Lead>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-6)]">
              {videoTutorials.map((video, index) => (
                <Card key={index} variant="elevated" className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 flex items-center justify-center">
                    <Video className="w-12 h-12 text-[var(--brand-primary)]/40" />
                  </div>
                  <CardBody>
                    <Headline level={4} size="sm" className="mb-[var(--space-2)]">
                      {video.title}
                    </Headline>
                    <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                      Duration: {video.duration}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div className="text-center mt-[var(--space-8)]">
              <Button
                href="/help/videos"
                variant="secondary"
                size="large"
                icon={<Video className="w-5 h-5" />}
              >
                View All Tutorials
              </Button>
            </div>
          </Container>
        </Section>

        {/* Still Need Help */}
        <Section spacing="spacious">
          <Container size="narrow">
            <Card variant="glass" className="text-center">
              <CardBody className="py-[var(--space-10)]">
                <HelpCircle className="w-16 h-16 text-[var(--brand-primary)] mx-auto mb-[var(--space-4)]" />
                <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                  Still Need Help?
                </Headline>
                <Lead align="center" className="mb-[var(--space-6)]">
                  Our support team is here to help you succeed with Punctual.ai
                </Lead>

                <div className="grid md:grid-cols-2 gap-[var(--space-6)] max-w-2xl mx-auto mb-[var(--space-6)]">
                  <div>
                    <Headline level={4} size="md" className="mb-[var(--space-2)]">
                      Email Support
                    </Headline>
                    <p className="text-[var(--text-secondary)] mb-[var(--space-3)]">
                      Get help via email within 24 hours
                    </p>
                    <Button
                      href="mailto:support@punctual.ai"
                      variant="secondary"
                      size="medium"
                      fullWidth
                    >
                      Email Support
                    </Button>
                  </div>

                  <div>
                    <Headline level={4} size="md" className="mb-[var(--space-2)]">
                      Live Chat
                    </Headline>
                    <p className="text-[var(--text-secondary)] mb-[var(--space-3)]">
                      Chat with our team in real-time
                    </p>
                    <Button
                      variant="primary"
                      size="medium"
                      fullWidth
                      onClick={() => {
                        // Initialize chat widget
                        console.log('Opening chat...')
                      }}
                    >
                      Start Chat
                    </Button>
                  </div>
                </div>

                <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                  Premium users get priority support with faster response times
                </p>
              </CardBody>
            </Card>
          </Container>
        </Section>
      </Main>
      <Footer />
    </Layout>
  )
}