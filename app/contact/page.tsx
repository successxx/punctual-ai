'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Building, Users, HelpCircle, Briefcase } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead } from '@/components/premium/Typography'
import { Button } from '@/components/premium/Button'
import { Card, CardBody } from '@/components/premium/Card'
import { FormField, Label, Input } from '@/components/premium/Form'
import { Footer } from '@/components/premium/Footer'

// Load design tokens
import '@/styles/design-tokens.css'

const contactReasons = [
  { value: 'sales', label: 'Sales Inquiry', icon: Briefcase },
  { value: 'support', label: 'Technical Support', icon: HelpCircle },
  { value: 'partnership', label: 'Partnership Opportunity', icon: Users },
  { value: 'enterprise', label: 'Enterprise Solutions', icon: Building },
  { value: 'other', label: 'Other', icon: MessageSquare }
]

const offices = [
  {
    location: 'San Francisco (HQ)',
    address: '100 Montgomery St, Suite 2000\nSan Francisco, CA 94104',
    phone: '+1 (415) 555-0100',
    email: 'hello@punctual.ai'
  },
  {
    location: 'New York',
    address: '350 Fifth Avenue, Suite 7500\nNew York, NY 10118',
    phone: '+1 (212) 555-0200',
    email: 'ny@punctual.ai'
  },
  {
    location: 'London',
    address: '1 Canada Square, Level 39\nLondon E14 5AB, UK',
    phone: '+44 20 7555 0300',
    email: 'uk@punctual.ai'
  }
]

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    reason: 'sales',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        company: '',
        reason: 'sales',
        message: ''
      })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--fs-sm)',
          },
        }}
      />

      <Navigation />
      <Main>
        {/* Hero Section */}
        <Section spacing="spacious" className="bg-gradient-to-br from-[var(--brand-primary)]/5 to-[var(--brand-secondary)]/5">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">Contact Us</Eyebrow>
              <Headline level={1} size="2xl" align="center" className="mb-[var(--space-4)]">
                Let&apos;s Start a Conversation
              </Headline>
              <Lead align="center">
                Whether you need support, want to explore enterprise solutions, or have
                questions about Punctual.ai, we&apos;re here to help.
              </Lead>
            </div>
          </Container>
        </Section>

        {/* Contact Options */}
        <Section>
          <Container>
            <div className="grid md:grid-cols-3 gap-[var(--space-6)] mb-[var(--space-10)]">
              <Card variant="bordered" className="text-center">
                <CardBody>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-4)]">
                    <Mail className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <Headline level={4} size="md" className="mb-[var(--space-2)]">
                    Email Us
                  </Headline>
                  <p className="text-[var(--text-secondary)] mb-[var(--space-3)]">
                    For general inquiries and support
                  </p>
                  <a
                    href="mailto:hello@punctual.ai"
                    className="text-[var(--brand-primary)] hover:underline"
                  >
                    hello@punctual.ai
                  </a>
                </CardBody>
              </Card>

              <Card variant="bordered" className="text-center">
                <CardBody>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-4)]">
                    <MessageSquare className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <Headline level={4} size="md" className="mb-[var(--space-2)]">
                    Live Chat
                  </Headline>
                  <p className="text-[var(--text-secondary)] mb-[var(--space-3)]">
                    Available Mon-Fri, 9am-6pm PST
                  </p>
                  <button className="text-[var(--brand-primary)] hover:underline">
                    Start Chat
                  </button>
                </CardBody>
              </Card>

              <Card variant="bordered" className="text-center">
                <CardBody>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--brand-primary)]/10 mb-[var(--space-4)]">
                    <Phone className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <Headline level={4} size="md" className="mb-[var(--space-2)]">
                    Call Us
                  </Headline>
                  <p className="text-[var(--text-secondary)] mb-[var(--space-3)]">
                    For urgent enterprise inquiries
                  </p>
                  <a
                    href="tel:+14155550100"
                    className="text-[var(--brand-primary)] hover:underline"
                  >
                    +1 (415) 555-0100
                  </a>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Contact Form */}
        <Section className="bg-[var(--bg-secondary)]" spacing="spacious">
          <Container>
            <div className="grid lg:grid-cols-2 gap-[var(--space-10)]">
              {/* Form */}
              <div>
                <Headline level={2} size="xl" className="mb-[var(--space-4)]">
                  Send Us a Message
                </Headline>
                <p className="text-[var(--text-secondary)] mb-[var(--space-6)]">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                  For immediate assistance, please use our live chat.
                </p>

                <form onSubmit={handleSubmit} className="space-y-[var(--space-5)]">
                  <div className="grid md:grid-cols-2 gap-[var(--space-5)]">
                    <FormField>
                      <Label htmlFor="name" required>
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </FormField>

                    <FormField>
                      <Label htmlFor="email" required>
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </FormField>
                  </div>

                  <FormField>
                    <Label htmlFor="company">
                      Company
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="reason" required>
                      How Can We Help?
                    </Label>
                    <select
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      className="w-full px-[var(--space-3)] py-[var(--space-2)] border border-[var(--border-default)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)]"
                      required
                    >
                      {contactReasons.map(reason => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField>
                    <Label htmlFor="message" required>
                      Message
                    </Label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-[var(--space-3)] py-[var(--space-2)] border border-[var(--border-default)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] resize-none"
                      placeholder="Tell us more about how we can help you..."
                      required
                    />
                  </FormField>

                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={loading}
                    icon={<Send className="w-5 h-5" />}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>

              {/* Additional Info */}
              <div className="lg:pl-[var(--space-10)]">
                <Card variant="glass" className="mb-[var(--space-6)]">
                  <CardBody>
                    <Headline level={3} size="lg" className="mb-[var(--space-4)]">
                      Response Times
                    </Headline>
                    <div className="space-y-[var(--space-3)]">
                      <div className="flex items-center justify-between pb-[var(--space-3)] border-b border-[var(--border-default)]">
                        <span className="text-[var(--text-secondary)]">General Inquiries</span>
                        <span className="text-[var(--text-primary)] font-[var(--fw-medium)]">24 hours</span>
                      </div>
                      <div className="flex items-center justify-between pb-[var(--space-3)] border-b border-[var(--border-default)]">
                        <span className="text-[var(--text-secondary)]">Technical Support</span>
                        <span className="text-[var(--text-primary)] font-[var(--fw-medium)]">4 hours</span>
                      </div>
                      <div className="flex items-center justify-between pb-[var(--space-3)] border-b border-[var(--border-default)]">
                        <span className="text-[var(--text-secondary)]">Enterprise Sales</span>
                        <span className="text-[var(--text-primary)] font-[var(--fw-medium)]">2 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--text-secondary)]">Premium Support</span>
                        <span className="text-[var(--text-primary)] font-[var(--fw-medium)]">1 hour</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card variant="glass">
                  <CardBody>
                    <Headline level={3} size="lg" className="mb-[var(--space-4)]">
                      Enterprise Solutions
                    </Headline>
                    <p className="text-[var(--text-secondary)] mb-[var(--space-4)]">
                      Looking for a custom solution for your organization? Our enterprise team
                      can help you implement Punctual.ai at scale with advanced features:
                    </p>
                    <ul className="space-y-[var(--space-2)] mb-[var(--space-4)]">
                      <li className="flex items-start space-x-2">
                        <span className="text-[var(--brand-primary)] mt-1">•</span>
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Custom integrations and API access
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[var(--brand-primary)] mt-1">•</span>
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Dedicated account management
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[var(--brand-primary)] mt-1">•</span>
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Advanced security and compliance features
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-[var(--brand-primary)] mt-1">•</span>
                        <span className="text-[var(--fs-sm)] text-[var(--text-secondary)]">
                          Priority support and SLA guarantees
                        </span>
                      </li>
                    </ul>
                    <Button
                      href="/enterprise"
                      variant="secondary"
                      size="medium"
                      fullWidth
                    >
                      Learn About Enterprise
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* Office Locations */}
        <Section spacing="spacious">
          <Container>
            <div className="text-center mb-[var(--space-10)]">
              <Eyebrow variant="accent">Our Offices</Eyebrow>
              <Headline level={2} size="xl" align="center" className="mb-[var(--space-4)]">
                Visit Us Around the World
              </Headline>
              <Lead align="center">
                With offices in major cities globally, we&apos;re always nearby
              </Lead>
            </div>

            <div className="grid md:grid-cols-3 gap-[var(--space-6)]">
              {offices.map((office, index) => (
                <Card key={index} variant="elevated">
                  <CardBody>
                    <div className="flex items-start space-x-[var(--space-3)] mb-[var(--space-4)]">
                      <MapPin className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-1" />
                      <div>
                        <Headline level={4} size="md" className="mb-[var(--space-2)]">
                          {office.location}
                        </Headline>
                        <p className="text-[var(--fs-sm)] text-[var(--text-secondary)] whitespace-pre-line">
                          {office.address}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-[var(--space-2)]">
                      <div className="flex items-center space-x-[var(--space-2)]">
                        <Phone className="w-4 h-4 text-[var(--text-tertiary)]" />
                        <a
                          href={`tel:${office.phone.replace(/\D/g, '')}`}
                          className="text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                        >
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-[var(--space-2)]">
                        <Mail className="w-4 h-4 text-[var(--text-tertiary)]" />
                        <a
                          href={`mailto:${office.email}`}
                          className="text-[var(--fs-sm)] text-[var(--text-secondary)] hover:text-[var(--brand-primary)]"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>

                    <div className="mt-[var(--space-4)] pt-[var(--space-4)] border-t border-[var(--border-default)]">
                      <div className="flex items-center space-x-[var(--space-2)] text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                        <Clock className="w-4 h-4" />
                        <span>Mon-Fri, 9am-6pm local time</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ Teaser */}
        <Section className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white">
          <Container size="narrow">
            <div className="text-center">
              <Headline level={2} size="xl" align="center" className="text-white mb-[var(--space-4)]">
                Have More Questions?
              </Headline>
              <p className="text-white/90 text-[var(--fs-lg)] mb-[var(--space-6)]">
                Check out our comprehensive FAQ section for instant answers
                to common questions about Punctual.ai
              </p>
              <Button
                href="/faq"
                variant="secondary"
                size="large"
                className="bg-white text-[var(--brand-primary)] hover:bg-white/90"
              >
                Browse FAQs
              </Button>
            </div>
          </Container>
        </Section>
      </Main>
      <Footer />
    </Layout>
  )
}