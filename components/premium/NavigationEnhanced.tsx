'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from './Button'
import { Logo } from '@/components/ui/logo'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    label: 'Product',
    items: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'API Docs', href: '/api-docs' },
      { label: 'Integrations', href: '/integrations' }
    ]
  },
  {
    label: 'Solutions',
    items: [
      { label: 'For Teams', href: '/solutions/teams' },
      { label: 'For Enterprise', href: '/enterprise' },
      { label: 'For Freelancers', href: '/solutions/freelancers' },
      { label: 'Case Studies', href: '/case-studies' }
    ]
  },
  {
    label: 'Resources',
    items: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '/help' },
      { label: 'Documentation', href: '/docs' },
      { label: 'FAQ', href: '/faq' }
    ]
  },
  {
    label: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' }
    ]
  }
]

export function NavigationEnhanced() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  return (
    <nav className={cn(
      'fixed top-0 z-[var(--z-sticky)]',
      'w-full',
      'transition-all duration-200',
      scrolled ? [
        'bg-[var(--bg-primary)]/95',
        'backdrop-blur-xl backdrop-saturate-150',
        'shadow-sm'
      ] : 'bg-[var(--bg-primary)]',
      'border-b border-[var(--border-default)]'
    )}>
      <div className="max-w-[var(--container-2xl)] mx-auto px-[var(--space-5)]">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo size="small" variant="dark" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-[var(--space-8)]">
            {/* Main Nav Items */}
            <div className="flex items-center space-x-[var(--space-6)]">
              {navigationItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className={cn(
                      'flex items-center space-x-1',
                      'text-[var(--fs-sm)] text-[var(--text-secondary)]',
                      'hover:text-[var(--text-primary)] transition-colors',
                      'py-2'
                    )}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === item.label && (
                    <div
                      className="absolute top-full left-0 mt-2 w-48"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-lg shadow-lg py-[var(--space-2)]">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              'block px-[var(--space-4)] py-[var(--space-2)]',
                              'text-[var(--fs-sm)] text-[var(--text-secondary)]',
                              'hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]',
                              'transition-colors',
                              pathname === subItem.href && 'text-[var(--brand-primary)]'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-[var(--space-3)]">
              <Button
                href="/login"
                variant="ghost"
                size="small"
              >
                Sign In
              </Button>
              <Button
                href="/register"
                variant="primary"
                size="small"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[var(--text-primary)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--text-primary)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-[var(--bg-primary)] border-t border-[var(--border-default)]">
          <div className="px-[var(--space-5)] py-[var(--space-4)]">
            {navigationItems.map((item) => (
              <div key={item.label} className="mb-[var(--space-4)]">
                <div className="text-[var(--fs-sm)] font-[var(--fw-medium)] text-[var(--text-primary)] mb-[var(--space-2)]">
                  {item.label}
                </div>
                <div className="space-y-[var(--space-1)] pl-[var(--space-3)]">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        'block py-[var(--space-1)]',
                        'text-[var(--fs-sm)] text-[var(--text-secondary)]',
                        'hover:text-[var(--brand-primary)]',
                        pathname === subItem.href && 'text-[var(--brand-primary)]'
                      )}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col space-y-[var(--space-3)] mt-[var(--space-6)]">
              <Button
                href="/login"
                variant="secondary"
                size="medium"
                fullWidth
              >
                Sign In
              </Button>
              <Button
                href="/register"
                variant="primary"
                size="medium"
                fullWidth
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}