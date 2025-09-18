'use client'

// Premium Components
import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Lead } from '@/components/premium/Typography'
import { Button } from '@/components/premium/Button'
import { Card, CardBody } from '@/components/premium/Card'
import { FormField, Label, Input, HelperText } from '@/components/premium/Form'
import { ArrowRight, Check, X, Sparkles } from 'lucide-react'

// Load design tokens
import '@/styles/design-tokens.css'

export default function DesignTestPage() {
  return (
    <Layout>
      <Navigation />

      <Main>
        {/* Test all backgrounds */}
        <Section background="primary" spacing="default">
          <Container size="wide">
            <Headline level={1} size="2xl">Primary Background Test</Headline>
            <Lead>This section uses primary background - should be #0a0a0a</Lead>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Card variant="default">
                <CardBody>
                  <p>Default Card - bg should be #171717</p>
                </CardBody>
              </Card>
              <Card variant="elevated">
                <CardBody>
                  <p>Elevated Card - bg should be #262626</p>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        <Section background="secondary" spacing="default">
          <Container size="wide">
            <Headline level={2} size="xl">Secondary Background Test</Headline>
            <Lead>This section uses secondary background - should be #171717</Lead>
            <div className="mt-8 space-y-4">
              <Card variant="bordered">
                <CardBody>
                  <p>Bordered Card - bg should be #0a0a0a with border</p>
                </CardBody>
              </Card>
              <Card variant="glass">
                <CardBody>
                  <p>Glass Card - semi-transparent with backdrop blur</p>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        <Section background="tertiary" spacing="default">
          <Container size="wide">
            <Headline level={2} size="xl">Tertiary Background Test</Headline>
            <Lead>This section uses tertiary background - should be #262626</Lead>
            <div className="mt-8">
              <Card variant="gradient">
                <CardBody>
                  <p>Gradient Card - gradient from #171717 to #262626</p>
                </CardBody>
              </Card>
            </div>
          </Container>
        </Section>

        {/* Test all button variants */}
        <Section background="primary" spacing="default">
          <Container size="wide">
            <Headline level={2} size="xl">Button Visibility Test</Headline>
            <Lead>All buttons should have proper contrast</Lead>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-[var(--text-primary)] mb-4">Primary Buttons</h3>
                <div className="flex gap-4">
                  <Button variant="primary" size="small">
                    Small Primary
                  </Button>
                  <Button variant="primary" size="default">
                    Default Primary
                  </Button>
                  <Button variant="primary" size="large">
                    Large Primary
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled Primary
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-[var(--text-primary)] mb-4">Secondary Buttons</h3>
                <div className="flex gap-4">
                  <Button variant="secondary" size="small">
                    Small Secondary
                  </Button>
                  <Button variant="secondary" size="default">
                    Default Secondary
                  </Button>
                  <Button variant="secondary" size="large">
                    Large Secondary
                  </Button>
                  <Button variant="secondary" disabled>
                    Disabled Secondary
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-[var(--text-primary)] mb-4">Ghost Buttons</h3>
                <div className="flex gap-4">
                  <Button variant="ghost" size="small">
                    Small Ghost
                  </Button>
                  <Button variant="ghost" size="default">
                    Default Ghost
                  </Button>
                  <Button variant="ghost" size="large">
                    Large Ghost
                  </Button>
                  <Button variant="ghost" disabled>
                    Disabled Ghost
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-[var(--text-primary)] mb-4">Minimal Buttons</h3>
                <div className="flex gap-4">
                  <Button variant="minimal">
                    Minimal Link Style
                  </Button>
                  <Button variant="minimal" disabled>
                    Disabled Minimal
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Test form fields */}
        <Section background="secondary" spacing="default">
          <Container size="narrow">
            <Headline level={2} size="xl">Form Field Test</Headline>
            <Lead>All form fields should be visible with proper contrast</Lead>

            <Card variant="default" className="mt-8">
              <CardBody>
                <form className="space-y-6">
                  <FormField>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <HelperText>We'll never share your email</HelperText>
                  </FormField>

                  <FormField>
                    <Label htmlFor="password" required>Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="disabled">Disabled Field</Label>
                    <Input
                      id="disabled"
                      placeholder="This field is disabled"
                      disabled
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="error">Field with Error</Label>
                    <Input
                      id="error"
                      placeholder="This has an error"
                      error="This field is required"
                    />
                  </FormField>

                  <div className="flex gap-4">
                    <Button variant="primary" type="submit">
                      Submit Form
                    </Button>
                    <Button variant="secondary" type="button">
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Container>
        </Section>

        {/* Text contrast test */}
        <Section background="primary" spacing="default">
          <Container size="narrow">
            <Headline level={2} size="xl">Text Contrast Test</Headline>
            <div className="space-y-4 mt-8">
              <p className="text-[var(--text-primary)]">
                Primary text - should be #fafafa on dark backgrounds
              </p>
              <p className="text-[var(--text-secondary)]">
                Secondary text - should be #a3a3a3 with good contrast
              </p>
              <p className="text-[var(--text-tertiary)]">
                Tertiary text - should be #737373 still readable
              </p>
              <p className="text-[var(--text-quaternary)]">
                Quaternary text - should be #525252 for least emphasis
              </p>
            </div>
          </Container>
        </Section>

        {/* Icons and interactive elements */}
        <Section background="secondary" spacing="default">
          <Container size="narrow">
            <Headline level={2} size="xl">Icons and Interactive Elements</Headline>
            <div className="mt-8 space-y-6">
              <div className="flex gap-4 text-[var(--text-primary)]">
                <Check className="w-6 h-6 text-green-500" />
                <X className="w-6 h-6 text-red-500" />
                <Sparkles className="w-6 h-6 text-[var(--brand-primary)]" />
                <ArrowRight className="w-6 h-6 text-[var(--text-secondary)]" />
              </div>

              <div className="space-y-2">
                <a href="#" className="text-[var(--brand-primary)] hover:underline">
                  Primary link color
                </a>
                <br />
                <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Secondary link with hover
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </Main>
    </Layout>
  )
}