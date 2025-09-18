import Link from 'next/link'
import {
  Twitter, Linkedin, Github, Youtube, Facebook,
  MapPin, Globe,
  Shield, Award, Zap
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'API Documentation', href: '/api-docs' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Download Apps', href: '/download' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers', badge: 'Hiring' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Partners', href: '/partners' },
      { label: 'Investors', href: '/investors' },
      { label: 'Contact', href: '/contact' }
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Guides & Tutorials', href: '/guides' },
      { label: 'Webinars', href: '/webinars' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Templates', href: '/templates' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Acceptable Use', href: '/acceptable-use' },
      { label: 'Data Processing', href: '/dpa' },
      { label: 'GDPR', href: '/gdpr' },
      { label: 'Security', href: '/security' }
    ],
    support: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Status', href: '/status', badge: 'Operational' },
      { label: 'Support Center', href: '/support' },
      { label: 'Service Level Agreement', href: '/sla' },
      { label: 'Report Abuse', href: '/report-abuse' },
      { label: 'Accessibility', href: '/accessibility' }
    ]
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/punctualai', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/punctualai', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/punctualai', label: 'GitHub' },
    { icon: Youtube, href: 'https://youtube.com/@punctualai', label: 'YouTube' },
    { icon: Facebook, href: 'https://facebook.com/punctualai', label: 'Facebook' }
  ]

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
      {/* Main Footer Content */}
      <div className="max-w-[var(--container-2xl)] mx-auto px-[var(--space-5)] py-[var(--space-10)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[var(--space-8)]">

          {/* Company Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-[var(--space-6)]">
              <Link href="/" className="inline-block">
                <h3 className="text-[var(--fs-lg)] font-[var(--fw-bold)] text-[var(--text-primary)]">
                  punctual.ai
                </h3>
              </Link>
              <p className="mt-[var(--space-3)] text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                The intelligent scheduling platform that saves you 5+ hours every week.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-[var(--space-3)]">
              <div className="flex items-center gap-[var(--space-2)] text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-[var(--space-2)] text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                <Award className="w-4 h-4" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-[var(--space-2)] text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                <Zap className="w-4 h-4" />
                <span>99.9% Uptime</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-[var(--space-6)] flex gap-[var(--space-3)]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-[var(--space-4)]">
              Product
            </h4>
            <ul className="space-y-[var(--space-3)]">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--fs-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-[var(--space-4)]">
              Company
            </h4>
            <ul className="space-y-[var(--space-3)]">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--fs-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-[var(--space-2)]"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-[var(--brand-primary)] text-white text-[10px] rounded-full font-[var(--fw-medium)]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-[var(--space-4)]">
              Resources
            </h4>
            <ul className="space-y-[var(--space-3)]">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--fs-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-[var(--space-4)]">
              Legal
            </h4>
            <ul className="space-y-[var(--space-3)]">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--fs-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-[var(--fs-sm)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-[var(--space-4)]">
              Support
            </h4>
            <ul className="space-y-[var(--space-3)]">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--fs-sm)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-[var(--space-2)]"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] rounded-full font-[var(--fw-medium)]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-[var(--space-10)] pt-[var(--space-8)] border-t border-[var(--border-default)]">
          <div className="grid md:grid-cols-2 gap-[var(--space-8)]">
            <div>
              <h3 className="text-[var(--fs-base)] font-[var(--fw-semibold)] text-[var(--text-primary)] mb-[var(--space-2)]">
                Stay up to date
              </h3>
              <p className="text-[var(--fs-sm)] text-[var(--text-tertiary)]">
                Get the latest updates on features, integrations, and scheduling tips.
              </p>
            </div>
            <div>
              <form className="flex gap-[var(--space-3)]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-[var(--space-4)] py-[var(--space-3)] bg-[var(--field-bg)] border border-[var(--field-border)] rounded-[var(--radius-md)] text-[var(--field-text)] placeholder:text-[var(--field-placeholder)] focus:border-[var(--field-focus-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20"
                />
                <button
                  type="submit"
                  className="px-[var(--space-5)] py-[var(--space-3)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] rounded-[var(--radius-md)] hover:bg-[var(--btn-primary-hover)] transition-colors font-[var(--fw-medium)]"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-[var(--space-2)] text-[var(--fs-xs)] text-[var(--text-quaternary)]">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--bg-tertiary)] border-t border-[var(--border-default)]">
        <div className="max-w-[var(--container-2xl)] mx-auto px-[var(--space-5)] py-[var(--space-4)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-[var(--space-4)]">
            <div className="text-[var(--fs-xs)] text-[var(--text-tertiary)]">
              © {currentYear} punctual.ai. All rights reserved.
            </div>
            <div className="flex items-center gap-[var(--space-6)]">
              <div className="flex items-center gap-[var(--space-2)] text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                <Globe className="w-4 h-4" />
                <select className="bg-transparent border-none outline-none cursor-pointer">
                  <option>English (US)</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                  <option>日本語</option>
                </select>
              </div>
              <div className="flex items-center gap-[var(--space-2)] text-[var(--fs-xs)] text-[var(--text-tertiary)]">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}