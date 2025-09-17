import Link from 'next/link'
import { Canvas } from '@/components/editorial/layout/Canvas'
import { Strip } from '@/components/editorial/layout/Strip'
import { Display } from '@/components/editorial/typography/Display'
import { Prose } from '@/components/editorial/typography/Prose'
import { Action } from '@/components/editorial/ui/Action'
import '@/styles/editorial.tokens.css'

export default function NotFound() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--color-paper)' }}>
      <Canvas width="narrow">
        <Strip borderBottom>
          <div style={{ paddingTop: 'var(--baseline-16)', paddingBottom: 'var(--baseline-8)' }}>
            <Display align="center">
              <span style={{ fontSize: 'var(--fs-xxl)', fontWeight: '200' }}>404</span>
            </Display>

            <h2 style={{
              fontSize: 'var(--fs-l)',
              fontWeight: '400',
              textAlign: 'center',
              marginTop: 'var(--baseline-3)',
              color: 'var(--color-ink-2)'
            }}>
              Page Not Found
            </h2>

            <Prose>
              <p style={{
                textAlign: 'center',
                maxWidth: 'var(--measure-narrow)',
                margin: 'var(--baseline-4) auto',
                color: 'var(--color-ink-3)'
              }}>
                The page you're looking for doesn't exist or may have been moved.
              </p>
            </Prose>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 'var(--baseline-6)'
            }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Action>Go to Homepage</Action>
              </Link>
            </div>
          </div>
        </Strip>
      </Canvas>
    </main>
  )
}