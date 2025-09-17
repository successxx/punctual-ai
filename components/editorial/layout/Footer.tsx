import Link from 'next/link'

interface FooterProps {
  variant?: 'app' | 'public'
  className?: string
}

/**
 * Footer - Shared footer component for app and public pages
 * Maintains security boundaries between app and public sections
 */
export function Footer({ variant = 'public', className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={className}
      style={{
        borderTop: '1px solid var(--color-rule)',
        padding: 'var(--baseline-8) 0 var(--baseline-6)',
        marginTop: 'var(--baseline-12)',
        backgroundColor: 'var(--color-paper)',
        color: 'var(--color-ink-3)',
        fontSize: 'var(--fs-xs)'
      }}
    >
      <div style={{
        maxWidth: 'var(--container-l)',
        margin: '0 auto',
        padding: '0 var(--baseline-3)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--baseline-6)',
          marginBottom: 'var(--baseline-8)'
        }}>
          {/* Brand Column */}
          <div>
            <h3 style={{
              fontSize: 'var(--fs-s)',
              fontWeight: '400',
              color: 'var(--color-ink)',
              marginBottom: 'var(--baseline-3)',
              letterSpacing: '-0.01em'
            }}>
              punctual.ai
            </h3>
            <p style={{ lineHeight: 'var(--lh-relaxed)', maxWidth: '30ch' }}>
              Simple scheduling platform that respects your time and your clients'.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h4 style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: '600',
              color: 'var(--color-ink-2)',
              marginBottom: 'var(--baseline-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {variant === 'public' ? (
                <>
                  <li style={{ marginBottom: 'var(--baseline)' }}>
                    <Link href="/features" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Features
                    </Link>
                  </li>
                  <li style={{ marginBottom: 'var(--baseline)' }}>
                    <Link href="/pricing" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Pricing
                    </Link>
                  </li>
                  <li style={{ marginBottom: 'var(--baseline)' }}>
                    <Link href="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Sign In
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li style={{ marginBottom: 'var(--baseline)' }}>
                    <Link href="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Dashboard
                    </Link>
                  </li>
                  <li style={{ marginBottom: 'var(--baseline)' }}>
                    <Link href="/dashboard/availability" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Availability
                    </Link>
                  </li>
                  <li style={{ marginBottom: 'var(--baseline)' }}>
                    <Link href="/dashboard/bookings" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Bookings
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: '600',
              color: 'var(--color-ink-2)',
              marginBottom: 'var(--baseline-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 'var(--baseline)' }}>
                <Link href="/help" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Help Center
                </Link>
              </li>
              <li style={{ marginBottom: 'var(--baseline)' }}>
                <Link href="/docs" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Documentation
                </Link>
              </li>
              <li style={{ marginBottom: 'var(--baseline)' }}>
                <Link href="/api" style={{ color: 'inherit', textDecoration: 'none' }}>
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 style={{
              fontSize: 'var(--fs-xs)',
              fontWeight: '600',
              color: 'var(--color-ink-2)',
              marginBottom: 'var(--baseline-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 'var(--baseline)' }}>
                <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </li>
              <li style={{ marginBottom: 'var(--baseline)' }}>
                <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Terms of Service
                </Link>
              </li>
              <li style={{ marginBottom: 'var(--baseline)' }}>
                <Link href="/security" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--color-rule)',
          paddingTop: 'var(--baseline-4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--baseline-2)'
        }}>
          <p style={{ color: 'var(--color-ink-3)' }}>
            © {currentYear} punctual.ai. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--baseline-4)' }}>
            <Link
              href="https://twitter.com"
              style={{ color: 'inherit', textDecoration: 'none' }}
              aria-label="Twitter"
            >
              Twitter
            </Link>
            <Link
              href="https://github.com"
              style={{ color: 'inherit', textDecoration: 'none' }}
              aria-label="GitHub"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com"
              style={{ color: 'inherit', textDecoration: 'none' }}
              aria-label="LinkedIn"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}