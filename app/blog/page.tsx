'use client'

import { Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen, Lightbulb } from 'lucide-react'
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

const featuredPost = {
  title: 'The Future of AI-Powered Scheduling: How Machine Learning is Revolutionizing Professional Meetings',
  excerpt: 'Discover how artificial intelligence is transforming the way professionals manage their time, optimize their calendars, and make every meeting more productive.',
  author: 'Sarah Chen',
  role: 'CEO & Co-Founder',
  date: '2024-01-15',
  readTime: '8 min read',
  category: 'Innovation',
  image: '/api/placeholder/800/400'
}

const blogPosts = [
  {
    title: '10 Time Management Strategies That Top Executives Swear By',
    excerpt: 'Learn the proven techniques that successful leaders use to maximize productivity and maintain work-life balance in an increasingly demanding world.',
    author: 'David Kim',
    date: '2024-01-12',
    readTime: '6 min',
    category: 'Productivity'
  },
  {
    title: 'Remote Team Scheduling: Best Practices for Global Organizations',
    excerpt: 'Navigate the complexities of coordinating across time zones with strategies that keep distributed teams connected and productive.',
    author: 'Emma Thompson',
    date: '2024-01-10',
    readTime: '7 min',
    category: 'Team Collaboration'
  },
  {
    title: 'The Hidden Cost of Meeting Overload: A Data-Driven Analysis',
    excerpt: 'Our research reveals the true impact of excessive meetings on productivity, employee satisfaction, and company performance.',
    author: 'Marcus Rodriguez',
    date: '2024-01-08',
    readTime: '5 min',
    category: 'Research'
  },
  {
    title: 'How to Run Effective One-on-Ones: A Manager&apos;s Guide',
    excerpt: 'Transform your one-on-one meetings from routine check-ins to powerful coaching sessions that drive growth and engagement.',
    author: 'James Park',
    date: '2024-01-05',
    readTime: '9 min',
    category: 'Management'
  },
  {
    title: 'Calendar Blocking: The Secret to Deep Work in a Distracted World',
    excerpt: 'Master the art of protecting your focus time while remaining accessible and collaborative with your team.',
    author: 'Aisha Patel',
    date: '2024-01-03',
    readTime: '6 min',
    category: 'Productivity'
  },
  {
    title: 'The Psychology of Punctuality: Why Being On Time Matters',
    excerpt: 'Explore the science behind timeliness and how it impacts professional relationships, trust, and career advancement.',
    author: 'Sarah Chen',
    date: '2023-12-28',
    readTime: '7 min',
    category: 'Psychology'
  }
]

const categories = [
  { name: 'All Posts', count: 156 },
  { name: 'Productivity', count: 42 },
  { name: 'Team Collaboration', count: 38 },
  { name: 'Innovation', count: 24 },
  { name: 'Research', count: 18 },
  { name: 'Management', count: 21 },
  { name: 'Case Studies', count: 13 }
]

export default function BlogPage() {
  return (
    <Layout>
      <Navigation />
      <Main>
        {/* Hero Section */}
        <Section spacing="spacious">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">Blog</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                Insights on Time, Productivity, and the Future of Work
              </Headline>
              <Lead align="center">
                Expert perspectives on scheduling, time management, and building
                more productive professional relationships
              </Lead>
            </div>
          </Container>
        </Section>

        {/* Featured Post */}
        <Section>
          <Container>
            <Card variant="elevated" className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[16/10] bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-[var(--brand-primary)]/30" />
                </div>
                <CardBody className="flex flex-col justify-center p-[var(--space-8)]">
                  <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-3)]">
                    <span className="px-[var(--space-2)] py-[var(--space-1)] bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-[var(--fs-xs)] font-[var(--fw-medium)] rounded-full">
                      Featured
                    </span>
                    <span className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                      {featuredPost.category}
                    </span>
                  </div>
                  <Headline level={2} size="lg" className="mb-[var(--space-3)]">
                    {featuredPost.title}
                  </Headline>
                  <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-[var(--space-3)]">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]" />
                      <div>
                        <p className="text-[var(--fs-sm)] font-[var(--fw-medium)]">
                          {featuredPost.author}
                        </p>
                        <p className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                          {featuredPost.role}
                        </p>
                      </div>
                    </div>
                    <Button
                      href={`/blog/${featuredPost.title.toLowerCase().replace(/ /g, '-')}`}
                      variant="primary"
                      size="small"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Read More
                    </Button>
                  </div>
                </CardBody>
              </div>
            </Card>
          </Container>
        </Section>

        {/* Blog Posts Grid */}
        <Section spacing="spacious">
          <Container>
            <div className="grid lg:grid-cols-4 gap-[var(--space-8)]">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-[var(--space-8)]">
                  <Headline level={3} size="md" className="mb-[var(--space-4)]">
                    Categories
                  </Headline>
                  <div className="space-y-[var(--space-2)]">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        className="w-full flex items-center justify-between px-[var(--space-3)] py-[var(--space-2)] rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-left"
                      >
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          {category.name}
                        </span>
                        <span className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-[var(--space-8)]">
                    <Headline level={3} size="md" className="mb-[var(--space-4)]">
                      Newsletter
                    </Headline>
                    <Card variant="bordered">
                      <CardBody>
                        <p className="text-[var(--fs-sm)] text-[var(--text-secondary)] mb-[var(--space-3)]">
                          Get weekly insights on productivity and time management
                        </p>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-[var(--space-3)] py-[var(--space-2)] border border-[var(--border-default)] rounded-lg text-[var(--fs-sm)] mb-[var(--space-3)]"
                        />
                        <Button variant="primary" size="small" fullWidth>
                          Subscribe
                        </Button>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 gap-[var(--space-6)]">
                  {blogPosts.map((post, index) => (
                    <Card key={index} variant="elevated" className="hover:shadow-lg transition-shadow">
                      <CardBody>
                        <div className="flex items-center space-x-[var(--space-3)] mb-[var(--space-3)]">
                          <span className="text-[var(--fs-xs)] text-[var(--brand-primary)] font-[var(--fw-medium)]">
                            {post.category}
                          </span>
                          <span className="text-[var(--text-tertiary)]">•</span>
                          <div className="flex items-center space-x-1 text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <Headline level={3} size="md" className="mb-[var(--space-3)]">
                          <Link
                            href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}
                            className="hover:text-[var(--brand-primary)] transition-colors"
                          >
                            {post.title}
                          </Link>
                        </Headline>
                        <p className="text-[var(--text-secondary)] text-[var(--fs-sm)] mb-[var(--space-4)]">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-[var(--space-4)] border-t border-[var(--border-default)]">
                          <div className="flex items-center space-x-[var(--space-2)]">
                            <User className="w-4 h-4 text-[var(--text-tertiary)]" />
                            <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                              {post.author}
                            </span>
                          </div>
                          <div className="flex items-center space-x-[var(--space-2)]">
                            <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                            <span className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-[var(--space-2)] mt-[var(--space-8)]">
                  <button className="px-[var(--space-3)] py-[var(--space-2)] text-[var(--fs-sm)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors">
                    Previous
                  </button>
                  <button className="px-[var(--space-3)] py-[var(--space-2)] text-[var(--fs-sm)] bg-[var(--brand-primary)] text-white rounded-lg">
                    1
                  </button>
                  <button className="px-[var(--space-3)] py-[var(--space-2)] text-[var(--fs-sm)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors">
                    2
                  </button>
                  <button className="px-[var(--space-3)] py-[var(--space-2)] text-[var(--fs-sm)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors">
                    3
                  </button>
                  <span className="text-[var(--text-tertiary)]">...</span>
                  <button className="px-[var(--space-3)] py-[var(--space-2)] text-[var(--fs-sm)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors">
                    12
                  </button>
                  <button className="px-[var(--space-3)] py-[var(--space-2)] text-[var(--fs-sm)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white">
          <Container size="narrow">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-[var(--space-4)]">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <Headline level={2} size="xl" align="center" className="text-white mb-[var(--space-4)]">
                Have a Story to Share?
              </Headline>
              <p className="text-white/90 text-[var(--fs-lg)] mb-[var(--space-6)]">
                We&apos;re always looking for guest contributors who can share
                valuable insights on productivity, time management, and the future of work
              </p>
              <Button
                href="/blog/write-for-us"
                variant="secondary"
                size="large"
                className="bg-white text-[var(--brand-primary)] hover:bg-white/90"
              >
                Write for Us
              </Button>
            </div>
          </Container>
        </Section>
      </Main>
      <Footer />
    </Layout>
  )
}