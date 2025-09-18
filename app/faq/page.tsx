'use client'

import { useState } from 'react'
import { ChevronDown, Search, MessageCircle, CreditCard, Calendar, Settings, Shield, Zap, ThumbsUp, ThumbsDown } from 'lucide-react'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead, Prose } from '@/components/premium/Typography'
import { Button } from '@/components/premium/Button'
import { Card, CardBody } from '@/components/premium/Card'

// Load design tokens
import '@/styles/design-tokens.css'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'How do I get started with punctual.ai?',
    answer: `Getting started with punctual.ai is incredibly simple and takes less than 60 seconds. Here's exactly how:

    1. Sign up for your free account using email or Google authentication
    2. Connect your calendar (Google Calendar, Outlook, or iCal)
    3. Set your availability (working hours, meeting duration, buffer times)
    4. Share your unique booking link via email, website, or social media

    That's it! People can now book time with you instantly. No credit card required for the free plan, and you can start accepting bookings immediately. Our intuitive onboarding process guides you through each step, ensuring you're up and running in no time.`
  },
  {
    category: 'Getting Started',
    question: 'Do I need technical skills to use punctual.ai?',
    answer: `Absolutely not! punctual.ai is designed for everyone, regardless of technical expertise. If you can use email, you can use punctual.ai. Our interface is intuitive and user-friendly, with helpful tooltips and guides throughout.

    We've eliminated all technical complexity:
    • No coding or website knowledge required
    • One-click calendar integration
    • Simple copy-and-paste link sharing
    • Automatic timezone detection and conversion
    • Mobile-friendly for managing on the go

    Over 50,000 professionals use punctual.ai daily, from tech-savvy developers to coaches who've never built a website. Our support team is also available to help if you ever get stuck.`
  },
  {
    category: 'Getting Started',
    question: 'Can I try punctual.ai before committing to a paid plan?',
    answer: `Yes! We believe in letting you experience the value firsthand. Our free plan is not a trial—it's a fully functional tier that you can use forever. It includes unlimited bookings, basic availability management, and email notifications.

    When you're ready for premium features like custom URLs, advanced analytics, and priority support, you can upgrade anytime. Plus, all premium plans come with a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your payment—no questions asked.

    This approach lets you test punctual.ai with real clients and meetings, ensuring it fits your workflow perfectly before spending a dime.`
  },

  // Features & Functionality
  {
    category: 'Features',
    question: 'What makes punctual.ai different from other scheduling tools?',
    answer: `punctual.ai stands out in several key ways:

    **Simplicity First**: While others add complexity, we focus on making scheduling effortless. Our interface is clean, intuitive, and works perfectly without configuration overload.

    **Intelligent Scheduling**: Our AI-powered system learns from your patterns, suggests optimal meeting times, and automatically prevents conflicts across all your calendars.

    **Professional Polish**: Your booking page looks stunning out of the box. Custom branding options ensure it matches your professional image perfectly.

    **Fair Pricing**: No per-user fees, no booking limits, no hidden costs. One simple price that scales with you.

    **Speed & Reliability**: 99.9% uptime SLA, instant booking confirmation, and lightning-fast page loads ensure a smooth experience for everyone.

    **Privacy Focused**: Your data is yours. We don't sell it, share it, or use it for advertising. GDPR and CCPA compliant by design.`
  },
  {
    category: 'Features',
    question: 'Can I customize my booking page appearance?',
    answer: `Yes! punctual.ai offers extensive customization options to match your brand:

    **Free Plan Customization**:
    • Add your photo or logo
    • Write a custom welcome message
    • Set your display name and title
    • Choose meeting locations (office, phone, video)

    **Premium Customization**:
    • Custom domain/URL (punctual.ai/yourname)
    • Brand colors and themes
    • Custom CSS for complete control
    • Remove punctual.ai branding
    • Add custom fields and questions
    • Embed booking widget on your website
    • Custom confirmation and reminder messages

    Your booking page is often the first impression clients have of your professionalism. We ensure it represents you perfectly.`
  },
  {
    category: 'Features',
    question: 'How does the calendar integration work?',
    answer: `punctual.ai integrates seamlessly with all major calendar platforms:

    **Supported Calendars**:
    • Google Calendar (including G Suite/Workspace)
    • Microsoft Outlook/Office 365
    • Apple Calendar (via iCal)
    • Any CalDAV-compatible calendar

    **How It Works**:
    1. Connect your calendar with one click (OAuth secure authentication)
    2. punctual.ai checks your calendar in real-time for busy times
    3. Only available slots are shown to people booking with you
    4. New bookings automatically appear in your calendar
    5. Changes sync instantly in both directions

    **Multiple Calendar Support** (Premium):
    • Check multiple calendars for conflicts
    • Book to different calendars based on meeting type
    • Perfect for managing work/personal separation

    Your calendar data is encrypted and never stored on our servers. We only check availability in real-time when someone views your booking page.`
  },

  // Scheduling & Bookings
  {
    category: 'Scheduling',
    question: 'How do I prevent double-bookings?',
    answer: `Double-booking is literally impossible with punctual.ai. Here's how we prevent it:

    **Real-Time Calendar Sync**: We check your calendar the moment someone views your booking page, not just when you set availability. If a meeting gets added to your calendar from any source, that time instantly becomes unavailable.

    **Conflict Detection**: Before confirming any booking, we perform a final check across all connected calendars to ensure the slot is still free.

    **Buffer Time Protection**: Set buffer times between meetings (e.g., 15 minutes) to prevent back-to-back scheduling. This ensures you have time to prepare, take breaks, or travel between appointments.

    **Instant Updates**: If someone books while another person is viewing your page, available times update immediately without requiring a page refresh.

    **Manual Overrides**: You can always manually block time or mark yourself as busy, and these changes reflect instantly for anyone trying to book.`
  },
  {
    category: 'Scheduling',
    question: 'Can clients reschedule or cancel appointments?',
    answer: `Yes, and it's completely automated! punctual.ai handles the entire rescheduling process:

    **For Rescheduling**:
    • Clients receive a rescheduling link in their confirmation email
    • They can pick a new time from your available slots
    • Old time is automatically freed up for others
    • Both parties receive updated confirmations
    • Calendar events update automatically

    **For Cancellations**:
    • Clients can cancel with one click
    • You set cancellation policies (e.g., 24-hour notice)
    • Time slot becomes available for others immediately
    • Optional cancellation reasons collection
    • Automatic notification to both parties

    **Your Control**:
    • Set rescheduling limits (e.g., only once per booking)
    • Require cancellation reasons
    • Block rescheduling within certain timeframes
    • Customize cancellation/rescheduling messages

    This self-service approach saves hours of back-and-forth emails while keeping you in control of your policies.`
  },
  {
    category: 'Scheduling',
    question: 'How do timezone conversions work?',
    answer: `punctual.ai handles all timezone complexity automatically—neither you nor your clients need to think about it:

    **Automatic Detection**: We detect each visitor's timezone based on their browser settings, displaying times in their local timezone automatically.

    **Clear Display**: Times are always shown with clear timezone indicators (e.g., "2:00 PM EST") to prevent confusion.

    **Smart Conversion**: When someone books from a different timezone, the appointment appears correctly in both calendars, accounting for the time difference.

    **Daylight Saving Time**: We automatically adjust for DST changes, ensuring appointments stay at the correct time even when clocks change.

    **Manual Override**: Visitors can manually change their timezone if needed (useful for planning future travel).

    **International Support**: Works with all global timezones, perfect for international businesses and remote teams.

    You set your availability in your timezone, and we handle all the conversion magic behind the scenes.`
  },

  // Pricing & Billing
  {
    category: 'Billing',
    question: 'How does billing work?',
    answer: `punctual.ai billing is simple, transparent, and flexible:

    **Free Plan**: Completely free forever. No trial period, no credit card required. Includes unlimited bookings and core features.

    **Premium Plan**: $9.99/month (or $95.88/year with 20% discount)
    • Billed monthly or annually
    • Cancel anytime—no contracts or commitments
    • Changes take effect immediately (upgrades) or at cycle end (downgrades)
    • Prorated billing for mid-cycle upgrades

    **Payment Methods**:
    • All major credit/debit cards (Visa, Mastercard, Amex, Discover)
    • Secure processing via Stripe
    • Bank transfers available for annual enterprise plans

    **Billing Security**:
    • PCI-compliant payment processing
    • We never store your card details
    • Encrypted billing portal for managing payment methods
    • Automatic receipts for expense tracking

    **Refund Policy**: 30-day money-back guarantee on all paid plans. Not satisfied? Get a full refund, no questions asked.`
  },
  {
    category: 'Billing',
    question: 'Can I change or cancel my plan anytime?',
    answer: `Absolutely! You have complete control over your subscription:

    **Upgrading**:
    • Instant access to premium features
    • Prorated charge for the current billing period
    • Keep all your data and settings

    **Downgrading**:
    • Changes apply at the next billing cycle
    • No refund for unused time (but no additional charges)
    • Keep all data—only premium features are disabled

    **Cancellation**:
    • Cancel anytime from account settings
    • Continue using premium features until period ends
    • Data retained for 90 days (re-activate anytime)
    • Export all data before cancellation if desired

    **No Penalties**: No cancellation fees, no questions asked, no hoops to jump through. We believe in earning your business every month, not locking you in with contracts.

    **Pausing**: Need to take a break? You can pause your subscription for up to 3 months while keeping your data intact.`
  },
  {
    category: 'Billing',
    question: 'Do you offer discounts for nonprofits or education?',
    answer: `Yes! We believe in supporting organizations that make a difference:

    **Nonprofit Discount**: 50% off premium plans for registered 501(c)(3) organizations. Simply email proof of nonprofit status to support@punctual.ai.

    **Education Discount**:
    • Students: 60% off with valid .edu email
    • Educators: 40% off for teachers and professors
    • Schools/Universities: Custom pricing for institution-wide accounts

    **Volume Discounts**: Teams of 5+ get progressive discounts:
    • 5-10 users: 15% off
    • 11-25 users: 25% off
    • 26+ users: Contact for enterprise pricing

    **Startup Program**: Early-stage startups (less than 2 years, under $1M funding) get 50% off for the first year.

    **Annual Savings**: Save 20% with annual billing on any plan.

    All discounts are applied on top of our already competitive pricing, making punctual.ai accessible to organizations of all sizes and budgets.`
  },

  // Technical & Integration
  {
    category: 'Technical',
    question: 'Is punctual.ai secure?',
    answer: `Security is our top priority. punctual.ai employs enterprise-grade security measures:

    **Data Protection**:
    • 256-bit SSL encryption for all data transmission
    • AES-256 encryption for data at rest
    • Regular security audits by independent firms
    • SOC 2 Type II certified
    • GDPR and CCPA compliant

    **Infrastructure Security**:
    • Hosted on AWS with 99.9% uptime SLA
    • Redundant backups across multiple regions
    • DDoS protection and firewall monitoring
    • Regular penetration testing

    **Access Control**:
    • OAuth 2.0 for calendar integrations (we never see passwords)
    • Two-factor authentication available
    • Session management and automatic timeouts
    • IP allowlisting for enterprise accounts

    **Privacy First**:
    • We never sell or share your data
    • You own all your data and can export/delete anytime
    • Minimal data collection (only what's needed for the service)
    • Transparent privacy policy

    Your trust is everything to us. We handle your data with the same care we'd want for our own.`
  },
  {
    category: 'Technical',
    question: 'What integrations does punctual.ai support?',
    answer: `punctual.ai integrates with all the tools you already use:

    **Calendar Systems**:
    • Google Calendar/G Suite
    • Microsoft Outlook/Office 365
    • Apple Calendar (iCal)
    • CalDAV-compatible calendars

    **Video Conferencing**:
    • Zoom (automatic meeting creation)
    • Google Meet
    • Microsoft Teams
    • Custom video links

    **Payment Processing** (Premium):
    • Stripe for payment collection
    • PayPal integration
    • Square for in-person payments

    **CRM & Marketing**:
    • Zapier (connects to 5000+ apps)
    • Webhooks for custom integrations
    • API access for developers
    • Direct integrations coming soon: Salesforce, HubSpot, Mailchimp

    **Communication**:
    • Email notifications (customizable)
    • SMS reminders (premium)
    • Calendar invites (automatic)
    • Slack notifications

    All integrations are optional and designed to enhance your workflow without adding complexity.`
  },
  {
    category: 'Technical',
    question: 'Can I embed the scheduler on my website?',
    answer: `Yes! punctual.ai can be embedded on any website:

    **Embedding Options**:
    1. **Inline Widget**: Shows your scheduler directly on your page
    2. **Popup Button**: Floating button that opens scheduler in modal
    3. **Text Link**: Simple link that opens scheduler in new tab

    **How to Embed**:
    • Copy the embed code from your dashboard
    • Paste into your website HTML
    • Works with all platforms: WordPress, Squarespace, Wix, custom sites
    • No coding knowledge required

    **Customization**:
    • Match your website colors and fonts
    • Choose widget size and position
    • Hide or show different elements
    • Mobile-responsive automatically

    **Advanced Features** (Premium):
    • Remove punctual.ai branding
    • Custom CSS for perfect matching
    • JavaScript API for custom behaviors
    • Prefill client information

    The embedded scheduler updates in real-time, so changes to your availability reflect immediately on your website.`
  },

  // Support & Account
  {
    category: 'Support',
    question: 'What kind of support do you offer?',
    answer: `We pride ourselves on exceptional customer support:

    **Free Plan Support**:
    • Comprehensive help center with 100+ articles
    • Video tutorials and guides
    • Community forum with active users
    • Email support (48-hour response time)

    **Premium Support**:
    • Priority email support (4-hour response time)
    • Live chat during business hours
    • Phone support for urgent issues
    • Dedicated onboarding specialist
    • Monthly office hours with product team

    **Enterprise Support**:
    • Dedicated account manager
    • 24/7 phone support
    • 1-hour response SLA
    • Custom training sessions
    • Priority feature requests

    **Self-Service Resources**:
    • Detailed documentation
    • API reference
    • Video library
    • Best practices guide
    • Regular webinars

    Our support team consists of real humans who understand your business needs, not scripted responses. We're here to ensure your success.`
  },
  {
    category: 'Support',
    question: 'Can I migrate from another scheduling tool?',
    answer: `Absolutely! We make switching to punctual.ai seamless:

    **Free Migration Assistance**:
    • Import your existing data (clients, appointments, settings)
    • Redirect your old scheduling links to punctual.ai
    • Maintain your booking history
    • Transfer recurring appointments

    **Supported Migrations From**:
    • Calendly
    • Acuity Scheduling
    • SimplyBook.me
    • Cal.com
    • Google Calendar appointment slots
    • Microsoft Bookings
    • And many more...

    **Migration Process**:
    1. Export your data from current tool (we'll guide you)
    2. Import to punctual.ai with one click
    3. Verify and adjust settings
    4. Redirect old links (we provide instructions)
    5. Start using punctual.ai immediately

    **Zero Downtime**: Continue accepting bookings throughout migration. We can even run both systems in parallel while you transition.

    **Premium Benefit**: Premium users get white-glove migration service—our team handles everything for you.`
  },
  {
    category: 'Support',
    question: 'What happens to my data if I stop using punctual.ai?',
    answer: `Your data always belongs to you, and we respect that completely:

    **Data Retention**:
    • Active accounts: Data kept indefinitely
    • Cancelled accounts: Data retained for 90 days
    • After 90 days: Permanently deleted unless you request otherwise
    • Reactivation: Can restore account within retention period

    **Data Export**:
    • Export all data anytime (even on free plan)
    • Multiple formats: CSV, JSON, iCal
    • Includes all bookings, clients, settings
    • Bulk download with one click
    • API access for programmatic export

    **What's Included in Export**:
    • Complete booking history
    • Client contact information
    • Meeting notes and custom fields
    • Availability settings
    • Analytics and reports

    **Privacy Guarantee**:
    • We never sell or share your data
    • Deletion is permanent and complete
    • Backups are also purged after retention period
    • GDPR-compliant data handling

    We want you to stay because you love punctual.ai, not because your data is held hostage.`
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, 'yes' | 'no' | null>>({})

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  const handleHelpful = (index: number, vote: 'yes' | 'no') => {
    setHelpfulVotes({ ...helpfulVotes, [index]: vote })
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Getting Started': return <Zap className="w-5 h-5" />
      case 'Features': return <Settings className="w-5 h-5" />
      case 'Scheduling': return <Calendar className="w-5 h-5" />
      case 'Billing': return <CreditCard className="w-5 h-5" />
      case 'Technical': return <Shield className="w-5 h-5" />
      case 'Support': return <MessageCircle className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <Layout>
      <Navigation />

      <Main>
        {/* Hero Section */}
        <Section spacing="spacious" background="secondary">
          <Container size="narrow">
            <div className="text-center">
              <Eyebrow variant="accent">Help Center</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                Frequently Asked Questions
              </Headline>
              <Lead align="center" className="mb-[var(--space-8)]">
                Everything you need to know about punctual.ai. Can't find what you're looking for?
                Our support team is just a click away.
              </Lead>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-[var(--space-8)]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--text-quaternary)] w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-[var(--radius-lg)] text-[var(--text-primary)] placeholder-[var(--text-quaternary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-[var(--space-2)]">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-[var(--space-4)] py-[var(--space-2)] rounded-full transition-all flex items-center gap-[var(--space-2)] ${
                      selectedCategory === category
                        ? 'bg-[var(--brand-primary)] text-white'
                        : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-default)]'
                    }`}
                  >
                    {category !== 'All' && getCategoryIcon(category)}
                    {category}
                    {category === 'All' && <span className="ml-1 text-[var(--fs-xs)]">({faqs.length})</span>}
                  </button>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ Items */}
        <Section spacing="spacious">
          <Container size="narrow">
            <div className="space-y-[var(--space-4)]">
              {filteredFAQs.length === 0 ? (
                <Card variant="bordered" className="text-center py-[var(--space-10)]">
                  <CardBody>
                    <p className="text-[var(--text-secondary)] text-[var(--fs-lg)] mb-[var(--space-2)]">
                      No questions found matching your search.
                    </p>
                    <p className="text-[var(--text-tertiary)] text-[var(--fs-sm)]">
                      Try different keywords or browse all categories.
                    </p>
                  </CardBody>
                </Card>
              ) : (
                filteredFAQs.map((faq, _index) => {
                  const globalIndex = faqs.indexOf(faq)
                  const isExpanded = expandedItems.has(globalIndex)

                  return (
                    <Card
                      key={globalIndex}
                      variant="bordered"
                      className="hover:shadow-md transition-all"
                    >
                      <button
                        onClick={() => toggleExpanded(globalIndex)}
                        className="w-full text-left focus:outline-none focus:bg-[var(--bg-secondary)] transition-colors"
                      >
                        <CardBody className="flex items-start justify-between">
                          <div className="flex items-start gap-[var(--space-3)] pr-[var(--space-4)]">
                            <div className="mt-1 flex-shrink-0 text-[var(--brand-primary)]">
                              {getCategoryIcon(faq.category)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-[var(--fw-semibold)] text-[var(--text-primary)] text-[var(--fs-base)] mb-[var(--space-2)]">
                                {faq.question}
                              </h3>
                              {!isExpanded && (
                                <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)] line-clamp-2">
                                  {faq.answer.split('\n')[0].substring(0, 150)}...
                                </p>
                              )}
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-[var(--text-quaternary)] flex-shrink-0 transition-transform ${
                              isExpanded ? 'transform rotate-180' : ''
                            }`}
                          />
                        </CardBody>
                      </button>

                      {isExpanded && (
                        <CardBody className="pt-0">
                          <div className="pl-[calc(var(--space-3)+1.25rem)] pr-[var(--space-8)]">
                            <Prose className="text-[var(--text-secondary)]">
                              {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                                <p key={pIndex} className="mb-[var(--space-4)] whitespace-pre-wrap">
                                  {paragraph}
                                </p>
                              ))}
                            </Prose>

                            <div className="mt-[var(--space-6)] pt-[var(--space-4)] border-t border-[var(--border-subtle)]">
                              <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)] flex items-center gap-[var(--space-4)]">
                                Was this helpful?
                                <button
                                  onClick={() => handleHelpful(globalIndex, 'yes')}
                                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
                                    helpfulVotes[globalIndex] === 'yes'
                                      ? 'bg-green-500/10 text-green-600'
                                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                                  }`}
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  Yes
                                </button>
                                <button
                                  onClick={() => handleHelpful(globalIndex, 'no')}
                                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
                                    helpfulVotes[globalIndex] === 'no'
                                      ? 'bg-red-500/10 text-red-600'
                                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                                  }`}
                                >
                                  <ThumbsDown className="w-4 h-4" />
                                  No
                                </button>
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      )}
                    </Card>
                  )
                })
              )}
            </div>
          </Container>
        </Section>

        {/* Contact Support CTA */}
        <Section spacing="spacious" background="gradient">
          <Container size="narrow">
            <Card variant="glass" className="text-center">
              <CardBody className="py-[var(--space-10)]">
                <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                  Still have questions?
                </Headline>
                <Lead align="center" className="mb-[var(--space-8)] max-w-2xl mx-auto">
                  Can't find what you're looking for? Our support team is here to help.
                </Lead>
                <div className="flex flex-col sm:flex-row gap-[var(--space-4)] justify-center">
                  <Button
                    href="mailto:support@punctual.ai"
                    variant="secondary"
                    size="large"
                  >
                    Contact Support
                  </Button>
                  <Button
                    href="/docs"
                    variant="primary"
                    size="large"
                  >
                    View Documentation
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Container>
        </Section>
      </Main>
    </Layout>
  )
}