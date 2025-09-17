'use client'

import Link from 'next/link'
import { Calendar, Clock, Users, CheckCircle, ArrowRight, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-900">
                {/* Modern minimalist clock icon */}
                <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1" fill="none"/>
                <path d="M16 16 L13.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 16 L23 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="1" fill="currentColor"/>
                <line x1="16" y1="2.5" x2="16" y2="4" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
                {/* Modern lowercase typography */}
                <text x="36" y="21" fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif" fontSize="18" fontWeight="400" letterSpacing="-0.01em" fill="currentColor">punctual</text>
                <circle cx="112" cy="19" r="1.5" fill="currentColor" opacity="0.3"/>
                <text x="118" y="21" fontFamily="system-ui, -apple-system, 'SF Pro Display', sans-serif" fontSize="18" fontWeight="300" letterSpacing="-0.01em" fill="currentColor" opacity="0.8">ai</text>
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <button
                  style={{
                    padding: '8px 20px',
                    backgroundColor: 'transparent',
                    color: '#1a1a1a',
                    border: '1px solid #e5e7eb',
                    borderRadius: '2px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  Sign In
                </button>
              </Link>
              <Link href="/register">
                <button
                  style={{
                    padding: '8px 20px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '2px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                  }}
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6">
            Simple scheduling,
            <br />
            <span className="text-blue-600">without the hassle</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let your clients book appointments with you instantly. No back-and-forth emails, no confusion.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link href="/register">
              <button
                style={{
                  padding: '12px 32px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#1a1a1a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                }}
              >
                Start Free <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/demo">
              <button
                style={{
                  padding: '12px 32px',
                  backgroundColor: 'transparent',
                  color: '#1a1a1a',
                  border: '1px solid #d1d5db',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                View Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Everything you need to manage bookings
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Scheduling
              </h4>
              <p className="text-gray-600">
                Set your availability once, and let clients book times that work for both of you.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                No Double Booking
              </h4>
              <p className="text-gray-600">
                Automatic conflict detection ensures you never have overlapping appointments.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Professional & Simple
              </h4>
              <p className="text-gray-600">
                A beautiful booking page that makes you look professional and organized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            How it works
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sign Up</h4>
              <p className="text-sm text-gray-600">Create your free account in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Set Availability</h4>
              <p className="text-sm text-gray-600">Define when you're available to meet</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Your Link</h4>
              <p className="text-sm text-gray-600">Send your unique booking link to clients</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Booked</h4>
              <p className="text-sm text-gray-600">Clients book times that work for everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl text-gray-900 mb-6">
            "punctual.ai has completely transformed how I manage client meetings. No more email tennis!"
          </blockquote>
          <cite className="text-gray-600">
            Sarah Chen, Consultant
          </cite>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-white mb-4">
            Ready to simplify your scheduling?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've ditched the back-and-forth
          </p>
          <Link href="/register">
            <button
              style={{
                padding: '12px 32px',
                backgroundColor: '#ffffff',
                color: '#0066ff',
                border: 'none',
                borderRadius: '2px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              Get Started Free <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">punctual.ai</h4>
              <p className="text-sm text-gray-600">Simple scheduling for everyone</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/api/v1/docs" className="text-sm text-gray-600 hover:text-gray-900">
                API Docs
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © 2024 punctual.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
