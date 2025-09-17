'use client'

import { Layout, Navigation, Main, Container } from '@/components/premium/Layout'
import { Section } from '@/components/premium/Section'
import { Headline, Eyebrow, Lead, Prose } from '@/components/premium/Typography'
import { Footer } from '@/components/premium/Footer'
import { Card, CardBody } from '@/components/premium/Card'
import { Shield, Lock, Eye, UserCheck, Database, Globe } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </Headline>
              <Lead align="center">
                Your privacy is fundamental to how we build and operate punctual.ai
              </Lead>
              <div className="flex justify-center gap-[var(--space-6)] mt-[var(--space-6)] text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                <span>Last Updated: {lastUpdated}</span>
                <span>•</span>
                <span>Effective: {effectiveDate}</span>
              </div>
            </div>
          </Container>
        </Section>

        {/* Quick Overview */}
        <Section spacing="default">
          <Container size="narrow">
            <Card variant="bordered">
              <CardBody>
                <h2 className="text-[var(--fs-lg)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-[var(--space-4)]">
                  Privacy at a Glance
                </h2>
                <div className="grid md:grid-cols-3 gap-[var(--space-6)]">
                  <div className="flex items-start gap-[var(--space-3)]">
                    <Shield className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-[var(--fw-medium)] text-[var(--text-primary)] mb-1">We Never Sell Your Data</h3>
                      <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                        Your information is never sold, rented, or shared for advertising.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[var(--space-3)]">
                    <Lock className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-[var(--fw-medium)] text-[var(--text-primary)] mb-1">Encrypted & Secure</h3>
                      <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                        All data is encrypted in transit and at rest using industry standards.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[var(--space-3)]">
                    <UserCheck className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-[var(--fw-medium)] text-[var(--text-primary)] mb-1">You Own Your Data</h3>
                      <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                        Export or delete your data anytime. We respect your ownership.
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
              <h2>1. Introduction</h2>
              <p>
                punctual.ai ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our scheduling platform and related services (collectively, the "Service").
              </p>
              <p>
                By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not use our Service.
              </p>

              <h2>2. Information We Collect</h2>

              <h3>2.1 Information You Provide</h3>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, password, profile picture, and timezone preferences.</li>
                <li><strong>Calendar Data:</strong> Calendar events, availability settings, and scheduling preferences necessary to provide our core Service.</li>
                <li><strong>Booking Information:</strong> Details about meetings you schedule or attend, including participant names, email addresses, and meeting descriptions.</li>
                <li><strong>Payment Information:</strong> Credit card details and billing address (processed securely through Stripe; we do not store full credit card numbers).</li>
                <li><strong>Communications:</strong> Support tickets, feedback, and other communications you send to us.</li>
                <li><strong>Custom Fields:</strong> Any additional information you choose to collect through custom booking forms.</li>
              </ul>

              <h3>2.2 Information Collected Automatically</h3>
              <ul>
                <li><strong>Usage Data:</strong> Pages visited, features used, actions taken, and time spent on our Service.</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information.</li>
                <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to maintain sessions, remember preferences, and analyze usage patterns.</li>
                <li><strong>Log Data:</strong> Server logs that record access times, pages viewed, crashes, and system activity.</li>
                <li><strong>Location Information:</strong> Approximate location based on IP address for timezone detection and service optimization.</li>
              </ul>

              <h3>2.3 Information from Third Parties</h3>
              <ul>
                <li><strong>OAuth Providers:</strong> Basic profile information when you sign in with Google, Microsoft, or other OAuth providers.</li>
                <li><strong>Calendar Services:</strong> Calendar data from integrated services like Google Calendar, Outlook, or Apple Calendar.</li>
                <li><strong>Payment Processors:</strong> Transaction information from Stripe for payment processing and fraud prevention.</li>
                <li><strong>Analytics Services:</strong> Aggregated data about Service usage from analytics providers.</li>
              </ul>

              <h2>3. How We Use Your Information</h2>

              <h3>3.1 To Provide and Maintain Our Service</h3>
              <ul>
                <li>Process and manage your bookings and calendar integrations</li>
                <li>Send booking confirmations, reminders, and notifications</li>
                <li>Synchronize your availability across connected calendars</li>
                <li>Prevent scheduling conflicts and double-bookings</li>
                <li>Provide customer support and respond to inquiries</li>
              </ul>

              <h3>3.2 To Improve and Personalize Our Service</h3>
              <ul>
                <li>Analyze usage patterns to improve features and user experience</li>
                <li>Personalize your experience based on preferences and usage history</li>
                <li>Develop new features and services</li>
                <li>Conduct research and analysis to improve our algorithms</li>
                <li>Test new features with select user groups</li>
              </ul>

              <h3>3.3 To Communicate with You</h3>
              <ul>
                <li>Send service-related announcements and updates</li>
                <li>Provide customer support and respond to your requests</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Request feedback and conduct surveys</li>
                <li>Send security alerts and account notifications</li>
              </ul>

              <h3>3.4 For Legal and Safety Purposes</h3>
              <ul>
                <li>Comply with legal obligations and government requests</li>
                <li>Enforce our Terms of Service and other agreements</li>
                <li>Protect against fraud, abuse, and illegal activities</li>
                <li>Protect the rights, property, and safety of punctual.ai and our users</li>
                <li>Respond to legal process and law enforcement requests</li>
              </ul>

              <h2>4. How We Share Your Information</h2>

              <h3>4.1 We Do Not Sell Your Personal Information</h3>
              <p>
                We do not, and will never, sell your personal information to third parties. We do not share your information with third parties for their direct marketing purposes.
              </p>

              <h3>4.2 Sharing with Your Consent</h3>
              <ul>
                <li><strong>Meeting Participants:</strong> Your name, email, and scheduling information are shared with people you schedule meetings with.</li>
                <li><strong>Calendar Integrations:</strong> Information necessary to sync with your connected calendar services.</li>
                <li><strong>Third-Party Integrations:</strong> Data shared with services you explicitly connect (e.g., Zoom, Slack).</li>
                <li><strong>Public Profiles:</strong> Information you choose to make public on your booking page.</li>
              </ul>

              <h3>4.3 Service Providers</h3>
              <p>
                We share information with trusted third-party service providers who assist us in operating our Service:
              </p>
              <ul>
                <li><strong>Infrastructure:</strong> Amazon Web Services (AWS) for hosting and data storage</li>
                <li><strong>Payments:</strong> Stripe for payment processing</li>
                <li><strong>Communications:</strong> SendGrid for email delivery</li>
                <li><strong>Analytics:</strong> Google Analytics for usage analysis (anonymized)</li>
                <li><strong>Support:</strong> Intercom for customer support</li>
                <li><strong>Security:</strong> Cloudflare for DDoS protection and CDN services</li>
              </ul>
              <p>
                These providers are contractually obligated to protect your information and use it only for the purposes we specify.
              </p>

              <h3>4.4 Legal Requirements</h3>
              <p>
                We may disclose your information if required by law or in response to valid legal requests, including:
              </p>
              <ul>
                <li>Court orders, subpoenas, or other legal process</li>
                <li>Government or regulatory requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>To prevent fraud or illegal activities</li>
              </ul>

              <h3>4.5 Business Transfers</h3>
              <p>
                If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any change in ownership or control of your personal information.
              </p>

              <h2>5. Data Security</h2>

              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul>
                <li><strong>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption</li>
                <li><strong>Access Controls:</strong> Strict access controls and authentication for all internal systems</li>
                <li><strong>Regular Audits:</strong> Annual security audits and penetration testing by independent firms</li>
                <li><strong>SOC 2 Compliance:</strong> We maintain SOC 2 Type II certification</li>
                <li><strong>Secure Infrastructure:</strong> All data stored in secure, redundant data centers</li>
                <li><strong>Incident Response:</strong> Comprehensive incident response plan with 24-hour notification policy</li>
                <li><strong>Employee Training:</strong> Regular security training for all employees</li>
                <li><strong>Vulnerability Management:</strong> Continuous monitoring and prompt patching of security vulnerabilities</li>
              </ul>

              <h2>6. Data Retention</h2>

              <p>
                We retain your information for as long as necessary to provide our Service and fulfill the purposes outlined in this Privacy Policy:
              </p>
              <ul>
                <li><strong>Active Accounts:</strong> Information retained as long as your account is active</li>
                <li><strong>Deleted Accounts:</strong> Personal information deleted within 90 days of account deletion</li>
                <li><strong>Backups:</strong> Backup data purged within 30 days following primary deletion</li>
                <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
                <li><strong>Anonymized Data:</strong> We may retain anonymized, aggregated data indefinitely for analytics</li>
              </ul>

              <h2>7. Your Rights and Choices</h2>

              <h3>7.1 Access and Portability</h3>
              <p>
                You can access and export your data at any time through your account settings. We provide data in standard formats (CSV, JSON, iCal) for easy portability.
              </p>

              <h3>7.2 Correction and Update</h3>
              <p>
                You can update your personal information through your account settings or by contacting support.
              </p>

              <h3>7.3 Deletion</h3>
              <p>
                You can delete your account and associated data at any time. Some information may be retained as required by law or for legitimate business purposes.
              </p>

              <h3>7.4 Marketing Communications</h3>
              <p>
                You can opt out of marketing emails through the unsubscribe link in any marketing message or through your account settings. Service-related communications cannot be opted out of while you maintain an account.
              </p>

              <h3>7.5 Cookies</h3>
              <p>
                You can control cookies through your browser settings. Note that disabling cookies may limit functionality of our Service.
              </p>

              <h3>7.6 Do Not Track</h3>
              <p>
                We respect Do Not Track signals and do not track users across third-party websites when DNT is enabled.
              </p>

              <h2>8. International Data Transfers</h2>

              <p>
                Our Service is operated from the United States. If you are located outside the United States, your information will be transferred to and processed in the United States. We ensure appropriate safeguards are in place for international transfers:
              </p>
              <ul>
                <li>EU-US Data Privacy Framework certification</li>
                <li>Standard Contractual Clauses for EU data transfers</li>
                <li>Compliance with GDPR requirements for EU residents</li>
                <li>Compliance with CCPA for California residents</li>
                <li>Adherence to PIPEDA for Canadian residents</li>
              </ul>

              <h2>9. Children's Privacy</h2>

              <p>
                Our Service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If we discover that we have collected information from a child under 16, we will promptly delete it.
              </p>

              <h2>10. Regional Privacy Rights</h2>

              <h3>10.1 European Economic Area (GDPR)</h3>
              <p>If you are in the EEA, you have additional rights:</p>
              <ul>
                <li>Right to be informed about data processing</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Rights related to automated decision-making</li>
              </ul>
              <p>Legal basis for processing: consent, contract performance, legal obligations, and legitimate interests.</p>

              <h3>10.2 California (CCPA/CPRA)</h3>
              <p>California residents have the right to:</p>
              <ul>
                <li>Know what personal information is collected</li>
                <li>Know whether personal information is sold or disclosed</li>
                <li>Say no to the sale of personal information</li>
                <li>Access personal information</li>
                <li>Request deletion of personal information</li>
                <li>Equal service and price, even if you exercise privacy rights</li>
                <li>Correct inaccurate personal information</li>
                <li>Limit use and disclosure of sensitive personal information</li>
              </ul>

              <h3>10.3 Other Jurisdictions</h3>
              <p>
                We comply with applicable privacy laws in all jurisdictions where we operate. Contact us for specific information about your regional rights.
              </p>

              <h2>11. Third-Party Links</h2>

              <p>
                Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any information.
              </p>

              <h2>12. Changes to This Privacy Policy</h2>

              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by:
              </p>
              <ul>
                <li>Posting the new Privacy Policy on this page</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending an email notification for significant changes</li>
                <li>Obtaining consent where required by law</li>
              </ul>
              <p>
                Your continued use of our Service after changes indicates acceptance of the updated Privacy Policy.
              </p>

              <h2>13. Contact Information</h2>

              <p>
                If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> privacy@punctual.ai</li>
                <li><strong>Phone:</strong> +1 (415) 555-0100</li>
                <li><strong>Mail:</strong> punctual.ai, Inc.<br />
                    Attn: Privacy Officer<br />
                    548 Market Street, Suite 42000<br />
                    San Francisco, CA 94104<br />
                    United States</li>
              </ul>

              <h3>Data Protection Officer</h3>
              <p>
                For EU residents, you may also contact our Data Protection Officer at: dpo@punctual.ai
              </p>

              <h3>Supervisory Authority</h3>
              <p>
                EU residents have the right to lodge a complaint with their local supervisory authority if they believe their rights under GDPR have been violated.
              </p>

            </Prose>
          </Container>
        </Section>
      </Main>

      <Footer />
    </Layout>
  )
}