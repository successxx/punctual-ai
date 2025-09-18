'use client'

import React from 'react'

// Jony Ive-inspired Logo
// Ultra-precise geometry with perfect optical balance
// Inspired by Apple's design language of simplicity and precision

export const Logo = ({
  size = 'default',
  variant = 'dark',
  className = ''
}: {
  size?: 'small' | 'default' | 'large' | 'hero'
  variant?: 'dark' | 'light' | 'monochrome'
  className?: string
}) => {
  const dimensions = {
    small: { width: 120, height: 28, fontSize: 16 },
    default: { width: 160, height: 36, fontSize: 20 },
    large: { width: 200, height: 44, fontSize: 24 },
    hero: { width: 280, height: 64, fontSize: 32 }
  }

  const colors = {
    dark: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#000000'
    },
    light: {
      primary: '#ffffff',
      secondary: '#ffffff',
      accent: '#ffffff'
    },
    monochrome: {
      primary: '#1a1a1a',
      secondary: '#888888',
      accent: '#1a1a1a'
    }
  }

  const { width, height, fontSize } = dimensions[size]
  const colorScheme = colors[variant]

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="select-none"
      >
        {/* Clock Icon - Perfectly centered circle with precise time indicators */}
        <g transform={`translate(${height/2}, ${height/2})`}>
          {/* Outer ring with hair-thin stroke */}
          <circle
            cx="0"
            cy="0"
            r={height/2 - 2}
            stroke={colorScheme.primary}
            strokeWidth="0.75"
            fill="none"
            className="transition-colors duration-300"
          />

          {/* Hour markers - 12, 3, 6, 9 positions */}
          {[0, 90, 180, 270].map((angle, i) => {
            const x = Math.cos((angle - 90) * Math.PI / 180) * (height/2 - 6)
            const y = Math.sin((angle - 90) * Math.PI / 180) * (height/2 - 6)
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="0.5"
                fill={colorScheme.primary}
                className="transition-colors duration-300"
              />
            )
          })}

          {/* Hour hand - pointing to 10 */}
          <line
            x1="0"
            y1="0"
            x2={Math.cos((300 - 90) * Math.PI / 180) * (height/2 - 10)}
            y2={Math.sin((300 - 90) * Math.PI / 180) * (height/2 - 10)}
            stroke={colorScheme.primary}
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-colors duration-300"
          />

          {/* Minute hand - pointing to 2 (10 minutes) */}
          <line
            x1="0"
            y1="0"
            x2={Math.cos((60 - 90) * Math.PI / 180) * (height/2 - 6)}
            y2={Math.sin((60 - 90) * Math.PI / 180) * (height/2 - 6)}
            stroke={colorScheme.primary}
            strokeWidth="1"
            strokeLinecap="round"
            className="transition-colors duration-300"
          />

          {/* Center dot */}
          <circle
            cx="0"
            cy="0"
            r="1"
            fill={colorScheme.primary}
            className="transition-colors duration-300"
          />
        </g>

        {/* Typography - Perfect kerning and spacing */}
        <text
          x={height + 12}
          y={height/2 + fontSize/3}
          fontFamily="SF Pro Display, system-ui, -apple-system, sans-serif"
          fontSize={fontSize}
          fontWeight="300"
          letterSpacing="-0.02em"
          fill={colorScheme.primary}
          className="transition-colors duration-300"
          style={{
            fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
            textRendering: 'optimizeLegibility',
            fontOpticalSizing: 'auto'
          }}
        >
          punctual
        </text>

        {/* Dot separator with perfect optical alignment */}
        <circle
          cx={height + 12 + fontSize * 5.2}
          cy={height/2 - fontSize/8}
          r="1.5"
          fill={colorScheme.secondary}
          className="transition-colors duration-300"
          opacity="0.4"
        />

        {/* AI suffix with lighter weight */}
        <text
          x={height + 12 + fontSize * 5.8}
          y={height/2 + fontSize/3}
          fontFamily="SF Pro Display, system-ui, -apple-system, sans-serif"
          fontSize={fontSize}
          fontWeight="200"
          letterSpacing="-0.01em"
          fill={colorScheme.secondary}
          className="transition-colors duration-300"
          opacity="0.8"
          style={{
            fontFeatureSettings: '"kern" 1, "liga" 1',
            textRendering: 'optimizeLegibility'
          }}
        >
          ai
        </text>
      </svg>
    </div>
  )
}

// Minimal logo for tight spaces
export const LogoMark = ({
  size = 32,
  variant = 'dark',
  className = ''
}: {
  size?: number
  variant?: 'dark' | 'light' | 'monochrome'
  className?: string
}) => {
  const colors = {
    dark: '#000000',
    light: '#ffffff',
    monochrome: '#1a1a1a'
  }

  const color = colors[variant]

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="select-none"
      >
        <g transform={`translate(${size/2}, ${size/2})`}>
          <circle
            cx="0"
            cy="0"
            r={size/2 - 1}
            stroke={color}
            strokeWidth="0.75"
            fill="none"
          />

          {/* Hour markers */}
          {[0, 90, 180, 270].map((angle, i) => {
            const x = Math.cos((angle - 90) * Math.PI / 180) * (size/2 - 4)
            const y = Math.sin((angle - 90) * Math.PI / 180) * (size/2 - 4)
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="0.5"
                fill={color}
              />
            )
          })}

          {/* Hour hand */}
          <line
            x1="0"
            y1="0"
            x2={Math.cos((300 - 90) * Math.PI / 180) * (size/2 - 8)}
            y2={Math.sin((300 - 90) * Math.PI / 180) * (size/2 - 8)}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Minute hand */}
          <line
            x1="0"
            y1="0"
            x2={Math.cos((60 - 90) * Math.PI / 180) * (size/2 - 5)}
            y2={Math.sin((60 - 90) * Math.PI / 180) * (size/2 - 5)}
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Center dot */}
          <circle
            cx="0"
            cy="0"
            r="1"
            fill={color}
          />
        </g>
      </svg>
    </div>
  )
}

export default Logo