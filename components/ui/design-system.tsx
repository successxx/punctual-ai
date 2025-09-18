'use client'

import React from 'react'
import { cn } from '@/lib/utils'

// Jony Ive-inspired Design System
// Ultra-minimalist with extreme attention to detail
// Perfect whitespace and breathing room
// Subtle animations and micro-interactions
// Premium materials metaphor (glass, metal, fabric textures)

// Typography System - Large, bold, perfectly kerned
export const Typography = {
  // Display - For hero headlines
  Display: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "text-6xl md:text-8xl font-light tracking-[-0.04em] leading-[0.9] text-gray-900",
        "font-['SF_Pro_Display',_system-ui,_-apple-system,_sans-serif]",
        className
      )}
      style={{
        fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
        textRendering: 'optimizeLegibility',
        fontOpticalSizing: 'auto'
      }}
      {...props}
    >
      {children}
    </h1>
  ),

  // Title - For section headlines
  Title: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "text-4xl md:text-5xl font-light tracking-[-0.03em] leading-[1.1] text-gray-900 mb-6",
        "font-['SF_Pro_Display',_system-ui,_-apple-system,_sans-serif]",
        className
      )}
      style={{
        fontFeatureSettings: '"kern" 1, "liga" 1',
        textRendering: 'optimizeLegibility'
      }}
      {...props}
    >
      {children}
    </h2>
  ),

  // Headline - For subsections
  Headline: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "text-2xl md:text-3xl font-normal tracking-[-0.02em] leading-[1.2] text-gray-900 mb-4",
        "font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),

  // Body - For content
  Body: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "text-lg leading-[1.6] text-gray-600 font-normal tracking-[-0.01em]",
        "font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  ),

  // Caption - For small text
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
      className={cn(
        "text-sm leading-[1.4] text-gray-500 font-normal tracking-[0.01em]",
        "font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Glass Button - Premium material with subtle depth
export const GlassButton = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const baseClasses = cn(
    "relative inline-flex items-center justify-center",
    "font-medium transition-all duration-300 ease-out",
    "border-0 outline-none focus:outline-none",
    "transform-gpu will-change-transform",
    "active:scale-[0.98] active:duration-75",
    "font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]"
  )

  const variants = {
    primary: cn(
      "bg-black text-white",
      "shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)]",
      "hover:shadow-[0_4px_6px_rgba(0,0,0,0.16),0_1px_3px_rgba(0,0,0,0.24)]",
      "hover:bg-gray-900"
    ),
    secondary: cn(
      "bg-white/80 backdrop-blur-md text-gray-900 border border-gray-200/60",
      "shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.10)]",
      "hover:bg-white/90 hover:border-gray-300/60",
      "hover:shadow-[0_4px_6px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.12)]"
    ),
    ghost: cn(
      "bg-transparent text-gray-700 border border-transparent",
      "hover:bg-gray-50/80 hover:text-gray-900"
    )
  }

  const sizes = {
    small: "px-4 py-2 text-sm tracking-[0.005em] rounded-[6px]",
    medium: "px-6 py-3 text-base tracking-[-0.005em] rounded-[8px]",
    large: "px-8 py-4 text-lg tracking-[-0.01em] rounded-[10px]"
  }

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

// Card - Premium material with subtle elevation
export const Card = ({
  children,
  variant = 'default',
  className,
  ...props
}: {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'glass'
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const variants = {
    default: cn(
      "bg-white border border-gray-100",
      "shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.05)]"
    ),
    elevated: cn(
      "bg-white border border-gray-50",
      "shadow-[0_4px_6px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.08)]"
    ),
    glass: cn(
      "bg-white/70 backdrop-blur-md border border-white/20",
      "shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
    )
  }

  return (
    <div
      className={cn(
        "rounded-2xl p-8 transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Input - Minimal with focus states
export const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "w-full px-4 py-3 text-base bg-white border border-gray-200",
        "rounded-lg transition-all duration-200",
        "font-['SF_Pro_Text',_system-ui,_-apple-system,_sans-serif]",
        "placeholder:text-gray-400 placeholder:font-normal",
        "focus:outline-none focus:ring-0 focus:border-gray-900",
        "hover:border-gray-300",
        className
      )}
      {...props}
    />
  )
}

// Navigation - Invisible UI with perfect spacing
export const Navigation = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50",
        "bg-white/80 backdrop-blur-lg border-b border-gray-100/60",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        {children}
      </div>
    </nav>
  )
}

// Section - Perfect spacing and rhythm
export const Section = ({
  children,
  spacing = 'large',
  className,
  ...props
}: {
  children: React.ReactNode
  spacing?: 'small' | 'medium' | 'large' | 'huge'
  className?: string
} & React.HTMLAttributes<HTMLElement>) => {
  const spacings = {
    small: "py-12",
    medium: "py-20",
    large: "py-32",
    huge: "py-48"
  }

  return (
    <section
      className={cn(
        "px-6",
        spacings[spacing],
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}

// Container - Consistent max-width and centering
export const Container = ({
  children,
  size = 'default',
  className,
  ...props
}: {
  children: React.ReactNode
  size?: 'small' | 'default' | 'large' | 'full'
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const sizes = {
    small: "max-w-3xl",
    default: "max-w-7xl",
    large: "max-w-[90rem]",
    full: "max-w-none"
  }

  return (
    <div
      className={cn(
        "mx-auto px-6",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Grid - Responsive grid system
export const Grid = ({
  children,
  cols = 'auto',
  gap = 'medium',
  className,
  ...props
}: {
  children: React.ReactNode
  cols?: 'auto' | 1 | 2 | 3 | 4 | 5 | 6
  gap?: 'small' | 'medium' | 'large'
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
  const colClasses = {
    auto: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6"
  }

  const gapClasses = {
    small: "gap-4",
    medium: "gap-8",
    large: "gap-12"
  }

  return (
    <div
      className={cn(
        "grid",
        colClasses[cols],
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Animate - Subtle micro-interactions
export const Animate = {
  FadeIn: ({
    children,
    delay = 0,
    className,
    ...props
  }: {
    children: React.ReactNode
    delay?: number
    className?: string
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
      {...props}
    >
      {children}
    </div>
  ),

  SlideUp: ({
    children,
    delay = 0,
    className,
    ...props
  }: {
    children: React.ReactNode
    delay?: number
    className?: string
  } & React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn(
        "animate-in slide-in-from-bottom-8 duration-500 ease-out",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Export everything as a cohesive design system
export const JonyDesign = {
  Typography,
  GlassButton,
  Card,
  Input,
  Navigation,
  Section,
  Container,
  Grid,
  Animate
}