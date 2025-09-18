'use client'

import Link from 'next/link'
import { ArrowRight, Star, Quote, TrendingUp, Users, Clock, CheckCircle, Play } from 'lucide-react'
import { JonyDesign } from '@/components/ui/design-system'
import { Logo } from '@/components/ui/logo'

const { Typography, GlassButton, Card, Section, Container, Grid, Animate } = JonyDesign

export default function CustomersPage() {
  const featuredStories = [
    {
      customer: "Sarah Chen",
      company: "Chen Consulting Group",
      industry: "Business Consulting",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c9e0?w=400&h=400&fit=crop&crop=face",
      challenge: "Managing 200+ client meetings per month across different time zones was overwhelming. Double bookings and manual scheduling consumed 15 hours weekly.",
      solution: "punctual.ai's AI scheduling and global timezone intelligence completely automated the process. Clients can now book instantly in their preferred timezone.",
      results: [
        "90% reduction in scheduling time",
        "Zero double bookings in 8 months",
        "40% increase in client satisfaction",
        "$50K additional revenue from freed-up time"
      ],
      quote: "punctual.ai didn't just save me time—it transformed my entire business model. I can now focus on high-value consulting instead of calendar management.",
      videoUrl: "/testimonials/sarah-chen.mp4"
    },
    {
      customer: "Dr. Marcus Rodriguez",
      company: "Rodriguez Family Medicine",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      challenge: "HIPAA compliance requirements made most scheduling tools unusable. Manual phone scheduling led to 30% no-show rates and frustrated patients.",
      solution: "punctual.ai's healthcare-grade security and automated reminders created a compliant, efficient system that patients love using.",
      results: [
        "65% reduction in no-show rates",
        "Full HIPAA compliance maintained",
        "200% increase in online bookings",
        "Staff time reduced by 12 hours/week"
      ],
      quote: "The security features give me complete peace of mind, while patients love the convenience. It's the perfect balance of compliance and user experience.",
      videoUrl: "/testimonials/marcus-rodriguez.mp4"
    },
    {
      customer: "Lisa Park",
      company: "Park & Associates Law",
      industry: "Legal Services",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      challenge: "High-stakes legal consultations required precise scheduling. Clients expected premium service but existing tools felt cheap and unreliable.",
      solution: "punctual.ai's premium design and enterprise features projected the professional image clients expected while ensuring reliability.",
      results: [
        "100% booking reliability achieved",
        "Premium brand perception enhanced",
        "45% faster case onboarding",
        "Client retention up 25%"
      ],
      quote: "Our clients expect perfection, and punctual.ai delivers. The attention to detail in every interaction reflects our firm's values.",
      videoUrl: "/testimonials/lisa-park.mp4"
    }
  ]

  const stats = [
    { value: "50,000+", label: "Active users worldwide" },
    { value: "2M+", label: "Meetings scheduled monthly" },
    { value: "98%", label: "Customer satisfaction rate" },
    { value: "85%", label: "Average time savings" }
  ]

  const industries = [
    {
      name: "Consulting",
      customers: 12500,
      growth: "+45%",
      topUseCase: "Client discovery calls"
    },
    {
      name: "Healthcare",
      customers: 8200,
      growth: "+65%",
      topUseCase: "Patient appointments"
    },
    {
      name: "Legal",
      customers: 3400,
      growth: "+38%",
      topUseCase: "Legal consultations"
    },
    {
      name: "Sales",
      customers: 15600,
      growth: "+52%",
      topUseCase: "Prospect demos"
    },
    {
      name: "Coaching",
      customers: 9800,
      growth: "+72%",
      topUseCase: "1:1 coaching sessions"
    },
    {
      name: "Education",
      customers: 5900,
      growth: "+43%",
      topUseCase: "Student meetings"
    }
  ]

  const quickWins = [
    {
      metric: "Time Saved",
      average: "12 hours/week",
      description: "Professionals save an average of 12 hours weekly on scheduling tasks"
    },
    {
      metric: "Revenue Impact",
      average: "+$35K annually",
      description: "Additional revenue generated from time freed up for billable work"
    },
    {
      metric: "Client Satisfaction",
      average: "+40%",
      description: "Improvement in client satisfaction scores after implementing punctual.ai"
    },
    {
      metric: "No-show Reduction",
      average: "85%",
      description: "Reduction in missed appointments through automated reminders"
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
                Success
                <br />
                <span className="text-gray-400">stories</span>
              </Typography.Display>
            </Animate.FadeIn>
            <Animate.FadeIn delay={200}>
              <Typography.Body className="text-xl max-w-3xl mx-auto mb-12">
                Real professionals. Real results. Real transformation. See how punctual.ai has helped
                thousands of businesses replace scheduling chaos with systematic excellence. These aren't
                just testimonials—they're blueprints for what's possible when technology serves humanity.
              </Typography.Body>
            </Animate.FadeIn>
            <Animate.FadeIn delay={400}>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Start Your Success Story <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="#stories">
                  <GlassButton variant="secondary" size="large">
                    Explore Stories
                  </GlassButton>
                </Link>
              </div>
            </Animate.FadeIn>
          </div>
        </Container>
      </Section>

      {/* Stats Overview */}
      <Section spacing="medium" className="bg-gray-50/30">
        <Container>
          <Grid cols={4} gap="medium">
            {stats.map((stat, index) => (
              <Animate.FadeIn key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl font-light text-gray-900 mb-2">{stat.value}</div>
                  <Typography.Caption className="text-gray-600">
                    {stat.label}
                  </Typography.Caption>
                </div>
              </Animate.FadeIn>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Featured Customer Stories */}
      <Section spacing="large" id="stories">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Transformation stories
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              Every customer has a unique story, but they all share one thing: dramatic improvement
              in how they manage their most valuable asset—time.
            </Typography.Body>
          </div>

          <div className="space-y-20">
            {featuredStories.map((story, index) => (
              <Animate.FadeIn key={story.customer} delay={index * 200}>
                <Card variant="default" className="overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <img
                          src={story.image}
                          alt={story.customer}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <Typography.Headline className="mb-1 text-lg">
                            {story.customer}
                          </Typography.Headline>
                          <Typography.Caption className="text-gray-600">
                            {story.company} • {story.industry}
                          </Typography.Caption>
                        </div>
                      </div>

                      <div className="mb-6">
                        <Quote className="h-8 w-8 text-gray-300 mb-4" />
                        <Typography.Body className="text-lg italic mb-4">
                          "{story.quote}"
                        </Typography.Body>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Typography.Caption className="text-gray-500 uppercase tracking-wide text-xs font-medium mb-2">
                            Challenge
                          </Typography.Caption>
                          <Typography.Body className="text-sm">
                            {story.challenge}
                          </Typography.Body>
                        </div>
                        <div>
                          <Typography.Caption className="text-gray-500 uppercase tracking-wide text-xs font-medium mb-2">
                            Solution
                          </Typography.Caption>
                          <Typography.Body className="text-sm">
                            {story.solution}
                          </Typography.Body>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-gray-50/50">
                      <Typography.Caption className="text-gray-500 uppercase tracking-wide text-xs font-medium mb-4">
                        Results Achieved
                      </Typography.Caption>
                      <div className="space-y-3 mb-8">
                        {story.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <Typography.Body className="text-sm">
                              {result}
                            </Typography.Body>
                          </div>
                        ))}
                      </div>

                      <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
                        <Play className="h-16 w-16 text-white opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                          <Typography.Caption>
                            Watch {story.customer.split(' ')[0]}'s full story
                          </Typography.Caption>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Animate.FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Industry Breakdown */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Trusted across industries
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              From healthcare to consulting, legal to education—professionals in every field are
              discovering what's possible with truly intelligent scheduling.
            </Typography.Body>
          </div>

          <Grid cols={3} gap="medium">
            {industries.map((industry, index) => (
              <Animate.FadeIn key={industry.name} delay={index * 100}>
                <Card variant="default" className="text-center p-6">
                  <Typography.Headline className="mb-4 text-lg">
                    {industry.name}
                  </Typography.Headline>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-2xl font-light text-gray-900">{industry.customers.toLocaleString()}</div>
                      <Typography.Caption className="text-gray-600">Active users</Typography.Caption>
                    </div>
                    <div>
                      <div className="text-2xl font-light text-green-600">{industry.growth}</div>
                      <Typography.Caption className="text-gray-600">Growth this year</Typography.Caption>
                    </div>
                  </div>
                  <Typography.Caption className="text-gray-600">
                    Top use case: {industry.topUseCase}
                  </Typography.Caption>
                </Card>
              </Animate.FadeIn>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Quick Wins */}
      <Section spacing="large">
        <Container>
          <div className="text-center mb-16">
            <Typography.Title>
              Immediate impact
            </Typography.Title>
            <Typography.Body className="max-w-2xl mx-auto">
              These results aren't aspirational—they're typical. See what our customers achieve
              in their first 30 days with punctual.ai.
            </Typography.Body>
          </div>

          <Grid cols={2} gap="large">
            {quickWins.map((win, index) => (
              <Animate.FadeIn key={win.metric} delay={index * 100}>
                <Card variant="elevated" className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <Typography.Headline className="mb-2">
                    {win.metric}
                  </Typography.Headline>
                  <div className="text-3xl font-light text-gray-900 mb-4">{win.average}</div>
                  <Typography.Body className="text-sm">
                    {win.description}
                  </Typography.Body>
                </Card>
              </Animate.FadeIn>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="large" className="bg-gray-50/30">
        <Container>
          <div className="text-center">
            <Animate.FadeIn>
              <Typography.Title className="mb-8">
                Write your success story
              </Typography.Title>
              <Typography.Body className="max-w-2xl mx-auto mb-12">
                Join thousands of professionals who have transformed their businesses with intelligent
                scheduling. Your story of transformation starts with a single click.
              </Typography.Body>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/register">
                  <GlassButton variant="primary" size="large">
                    Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
                  </GlassButton>
                </Link>
                <Link href="/contact">
                  <GlassButton variant="secondary" size="large">
                    Share Your Story
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
                Transforming businesses through intelligent scheduling
              </Typography.Caption>
            </div>
            <div className="flex space-x-8">
              <Link href="/case-studies" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Case Studies
              </Link>
              <Link href="/testimonials" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Testimonials
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
              © 2024 punctual.ai. Every success story starts with perfect scheduling.
            </Typography.Caption>
          </div>
        </Container>
      </footer>
    </div>
  )
}