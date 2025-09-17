'use client'

import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead, Prose } from '@/components/premium/Typography'
import { Footer } from '@/components/premium/Footer'
import { Card, CardBody } from '@/components/premium/Card'
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react'

export default function TermsOfServicePage() {
  const lastUpdated = 'December 15, 2024'
  const effectiveDate = 'January 1, 2025'

  return (
    <Layout>
      <Navigation />

      <Main>
        {/* Hero Section */}
        <Section spacing="spacious" background="secondary">
          <Container size="narrow">
            <div className="text-center mb-[var(--space-8)]">
              <Eyebrow variant="accent">Legal</Eyebrow>
              <Headline level={1} size="3xl" align="center" className="mb-[var(--space-4)]">
                Terms of Service
              </Headline>
              <Lead align="center">
                The agreement between you and punctual.ai for using our scheduling platform
              </Lead>
              <div className="flex justify-center gap-[var(--space-6)] mt-[var(--space-6)] text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                <span>Last Updated: {lastUpdated}</span>
                <span>•</span>
                <span>Effective: {effectiveDate}</span>
              </div>
            </div>
          </Container>
        </Section>

        {/* Key Points */}
        <Section spacing="default">
          <Container size="narrow">
            <Card variant="bordered">
              <CardBody>
                <h2 className="text-[var(--fs-lg)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-[var(--space-4)]">
                  Key Points
                </h2>
                <div className="grid md:grid-cols-2 gap-[var(--space-4)]">
                  <div className="flex items-start gap-[var(--space-3)]">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-[var(--fw-medium)] text-[var(--text-primary)] mb-1">Free to Start</h3>
                      <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                        Basic features available forever at no cost
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[var(--space-3)]">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-[var(--fw-medium)] text-[var(--text-primary)] mb-1">Cancel Anytime</h3>
                      <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                        No long-term contracts or cancellation fees
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[var(--space-3)]">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-[var(--fw-medium)] text-[var(--text-primary)] mb-1">Your Data is Yours</h3>
                      <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                        Export or delete your data at any time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[var(--space-3)]">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-[var(--fw-medium)] text-[var(--text-primary)] mb-1">99.9% Uptime SLA</h3>
                      <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                        Service credits for any downtime
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Container>
        </Section>

        {/* Main Content */}
        <Section spacing="spacious">
          <Container size="narrow">
            <Prose>
              <h2>1. Agreement to Terms</h2>
              <p>
                These Terms of Service ("Terms") constitute a legally binding agreement between you (whether personally or on behalf of an entity) and punctual.ai, Inc. ("punctual.ai," "we," "us," or "our") concerning your access to and use of the punctual.ai website, application, and related services (collectively, the "Service").
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, you do not have permission to access or use our Service.
              </p>
              <p>
                You represent that you are over the age of 16 and have the full authority, right, and capacity to enter into this agreement. If you are accepting these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                punctual.ai provides an intelligent scheduling platform that allows users to:
              </p>
              <ul>
                <li>Create and manage online booking pages</li>
                <li>Synchronize availability across multiple calendar platforms</li>
                <li>Automate meeting scheduling and confirmations</li>
                <li>Collect payments for appointments (Premium feature)</li>
                <li>Generate analytics and insights about scheduling patterns</li>
                <li>Integrate with third-party tools and services</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of our Service at any time with reasonable notice.
              </p>

              <h2>3. Account Registration</h2>

              <h3>3.1 Account Creation</h3>
              <p>
                To use certain features of our Service, you must register for an account. When creating an account, you agree to:
              </p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security and confidentiality of your login credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Immediately notify us of any unauthorized use of your account</li>
              </ul>

              <h3>3.2 Account Security</h3>
              <p>
                You are responsible for safeguarding your password and any other credentials used to access your account. We strongly recommend enabling two-factor authentication. punctual.ai will not be liable for any loss or damage from your failure to maintain account security.
              </p>

              <h3>3.3 Account Termination</h3>
              <p>
                We reserve the right to suspend or terminate accounts that:
              </p>
              <ul>
                <li>Violate these Terms or our Acceptable Use Policy</li>
                <li>Remain inactive for extended periods (12+ months)</li>
                <li>Are associated with fraudulent or illegal activities</li>
                <li>Fail to pay applicable fees when due</li>
              </ul>

              <h2>4. Acceptable Use Policy</h2>

              <h3>4.1 Permitted Use</h3>
              <p>
                You may use our Service only for lawful purposes and in accordance with these Terms. You agree to use the Service only for its intended purpose of scheduling and managing appointments.
              </p>

              <h3>4.2 Prohibited Uses</h3>
              <p>
                You agree NOT to use the Service to:
              </p>
              <ul>
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Transmit spam, chain letters, or other unsolicited communications</li>
                <li>Impersonate or attempt to impersonate another person or entity</li>
                <li>Engage in any conduct that restricts or inhibits others' use of the Service</li>
                <li>Upload or transmit viruses, malware, or other harmful code</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Scrape, mine, or harvest data from the Service without permission</li>
                <li>Use the Service for competitive research or benchmarking</li>
                <li>Resell or redistribute the Service without authorization</li>
                <li>Use the Service for illegal activities or to promote illegal activities</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Collect personal information about other users without consent</li>
                <li>Interfere with or circumvent security features of the Service</li>
                <li>Create multiple accounts to evade restrictions or bans</li>
              </ul>

              <h3>4.3 Enforcement</h3>
              <p>
                We reserve the right to investigate and take appropriate action against anyone who violates this Acceptable Use Policy, including removing content, suspending or terminating accounts, and reporting users to law enforcement.
              </p>

              <h2>5. Subscription Plans and Billing</h2>

              <h3>5.1 Free Plan</h3>
              <p>
                We offer a free plan with basic features that you can use indefinitely. No credit card is required for the free plan.
              </p>

              <h3>5.2 Premium Plans</h3>
              <p>
                Premium plans provide additional features and are billed on a monthly or annual basis. By subscribing to a Premium plan, you agree to:
              </p>
              <ul>
                <li>Pay all applicable fees according to the selected billing cycle</li>
                <li>Provide valid payment information</li>
                <li>Authorize us to charge your payment method automatically</li>
                <li>Pay any applicable taxes</li>
              </ul>

              <h3>5.3 Billing Cycle</h3>
              <p>
                Premium subscriptions automatically renew at the end of each billing cycle unless canceled. You can change your plan or cancel at any time through your account settings. Changes take effect at the next billing cycle.
              </p>

              <h3>5.4 Price Changes</h3>
              <p>
                We reserve the right to modify pricing with 30 days' notice. Existing subscribers will maintain their current pricing for at least 12 months from the date of any price increase announcement.
              </p>

              <h3>5.5 Refunds</h3>
              <p>
                We offer a 30-day money-back guarantee for new Premium subscriptions. After 30 days, subscriptions are non-refundable except as required by law. No refunds are provided for partial months of service.
              </p>

              <h3>5.6 Failed Payments</h3>
              <p>
                If payment fails, we will attempt to process payment again. After multiple failed attempts, we may suspend Premium features until payment is resolved. Your data remains accessible during suspension.
              </p>

              <h2>6. Intellectual Property Rights</h2>

              <h3>6.1 Our Intellectual Property</h3>
              <p>
                The Service and all its components (including software, design, text, images, and logos) are owned by punctual.ai or our licensors and are protected by intellectual property laws. You may not:
              </p>
              <ul>
                <li>Copy, modify, or distribute any part of the Service</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Create derivative works based on the Service</li>
                <li>Use our trademarks without written permission</li>
                <li>Remove or alter any proprietary notices</li>
              </ul>

              <h3>6.2 Your Content</h3>
              <p>
                You retain all rights to content you upload or create using our Service ("Your Content"). By using the Service, you grant us a limited, worldwide, royalty-free license to:
              </p>
              <ul>
                <li>Store, display, and transmit Your Content as necessary to provide the Service</li>
                <li>Make backups to prevent data loss</li>
                <li>Improve our Service using aggregated, anonymized data</li>
              </ul>
              <p>
                This license ends when you delete Your Content or close your account, except for backups which may persist for a reasonable period.
              </p>

              <h3>6.3 Feedback</h3>
              <p>
                Any feedback, suggestions, or ideas you provide about the Service become our property and may be used without compensation or attribution to you.
              </p>

              <h2>7. Privacy and Data Protection</h2>
              <p>
                Your use of the Service is also governed by our Privacy Policy, which describes how we collect, use, and protect your information. By using the Service, you consent to our data practices as described in the Privacy Policy.
              </p>
              <p>
                You acknowledge that:
              </p>
              <ul>
                <li>We process data as necessary to provide the Service</li>
                <li>You are responsible for the privacy of data you collect through the Service</li>
                <li>You will comply with applicable data protection laws</li>
                <li>You will obtain necessary consents from individuals whose data you process</li>
              </ul>

              <h2>8. Third-Party Services</h2>

              <h3>8.1 Integrations</h3>
              <p>
                Our Service integrates with third-party services (e.g., Google Calendar, Stripe, Zoom). Your use of these integrations is subject to the third party's terms and policies. We are not responsible for third-party services' functionality, security, or data practices.
              </p>

              <h3>8.2 Links</h3>
              <p>
                The Service may contain links to third-party websites. We do not control and are not responsible for the content or practices of linked sites. Accessing third-party sites is at your own risk.
              </p>

              <h2>9. Service Level Agreement (Premium Plans)</h2>

              <h3>9.1 Uptime Commitment</h3>
              <p>
                We guarantee 99.9% uptime for Premium plans, measured monthly. This excludes scheduled maintenance (with 24-hour notice) and circumstances beyond our reasonable control.
              </p>

              <h3>9.2 Service Credits</h3>
              <p>If we fail to meet our uptime commitment:</p>
              <ul>
                <li>99.0% - 99.9%: 10% credit</li>
                <li>95.0% - 99.0%: 25% credit</li>
                <li>Below 95.0%: 50% credit</li>
              </ul>
              <p>
                Credits are applied to future bills and must be requested within 30 days of the downtime incident.
              </p>

              <h2>10. Disclaimers and Limitations of Liability</h2>

              <h3>10.1 Disclaimer of Warranties</h3>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
              </p>

              <h3>10.2 Limitation of Liability</h3>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, PUNCTUAL.AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
              <p>
                OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO PUNCTUAL.AI IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY.
              </p>

              <h3>10.3 Exceptions</h3>
              <p>
                Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some of the above may not apply to you.
              </p>

              <h2>11. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless punctual.ai, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorney's fees) arising from:
              </p>
              <ul>
                <li>Your use or misuse of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Your Content or any content submitted through your account</li>
              </ul>

              <h2>12. Dispute Resolution</h2>

              <h3>12.1 Informal Resolution</h3>
              <p>
                We prefer to resolve disputes informally. Before filing a formal legal claim, please contact us at legal@punctual.ai to attempt resolution.
              </p>

              <h3>12.2 Arbitration Agreement</h3>
              <p>
                Any disputes that cannot be resolved informally shall be resolved through binding arbitration under the American Arbitration Association's Commercial Arbitration Rules. Arbitration shall be conducted in San Francisco, California.
              </p>
              <p>
                YOU WAIVE YOUR RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN CLASS ACTIONS.
              </p>

              <h3>12.3 Exceptions</h3>
              <p>
                This arbitration agreement does not apply to disputes relating to intellectual property rights or claims that qualify for small claims court.
              </p>

              <h2>13. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles. Any legal action not subject to arbitration shall be brought in the courts of San Francisco County, California.
              </p>

              <h2>14. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. We will notify you of material changes by:
              </p>
              <ul>
                <li>Posting the updated Terms on our website</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending email notification for significant changes</li>
              </ul>
              <p>
                Continued use of the Service after changes constitutes acceptance of the modified Terms. If you disagree with changes, you should discontinue use of the Service.
              </p>

              <h2>15. Miscellaneous</h2>

              <h3>15.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and punctual.ai regarding the Service.
              </p>

              <h3>15.2 Severability</h3>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
              </p>

              <h3>15.3 Waiver</h3>
              <p>
                Our failure to enforce any right or provision of these Terms shall not be considered a waiver of those rights.
              </p>

              <h3>15.4 Assignment</h3>
              <p>
                You may not assign or transfer your rights under these Terms without our written consent. We may assign our rights to any successor in interest.
              </p>

              <h3>15.5 Force Majeure</h3>
              <p>
                We shall not be liable for any delay or failure to perform due to causes beyond our reasonable control, including natural disasters, war, terrorism, labor disputes, or governmental actions.
              </p>

              <h2>16. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> legal@punctual.ai</li>
                <li><strong>Phone:</strong> +1 (415) 555-0100</li>
                <li><strong>Mail:</strong> punctual.ai, Inc.<br />
                    Attn: Legal Department<br />
                    548 Market Street, Suite 42000<br />
                    San Francisco, CA 94104<br />
                    United States</li>
              </ul>

              <h2>17. Specific Terms for Different Users</h2>

              <h3>17.1 EU Residents</h3>
              <p>
                If you are a resident of the European Union, additional terms may apply to comply with EU regulations, including GDPR. These are outlined in our Privacy Policy.
              </p>

              <h3>17.2 California Residents</h3>
              <p>
                California residents have specific rights under the CCPA as detailed in our Privacy Policy. California Civil Code Section 1789.3 requires us to provide specific information to California residents.
              </p>

              <h3>17.3 Business Accounts</h3>
              <p>
                If you use punctual.ai for business purposes, you represent that you have authority to bind your organization to these Terms, and "you" includes your organization.
              </p>

            </Prose>
          </Container>
        </Section>
      </Main>

      <Footer />
    </Layout>
  )
}