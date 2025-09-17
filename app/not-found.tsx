import { Canvas, Strip, Display, Deck, Action } from '@/components/editorial'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found - punctual.ai',
  description: 'The page you\'re looking for doesn\'t exist or may have been moved.',
  robots: 'noindex, nofollow'
}

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Strip spacing="loose" className="flex items-center justify-center">
        <Canvas width="narrow" className="text-center">
          <Display level={1} className="text-[12rem] leading-none font-light tracking-tighter mb-0">
            404
          </Display>
          <Display level={2} className="mb-[var(--baseline-3)]">
            Page Not Found
          </Display>
          <Deck className="mb-[var(--baseline-6)]">
            The page you're looking for doesn't exist or may have been moved.
          </Deck>
          <Action href="/" size="medium">
            Go to Homepage
          </Action>
        </Canvas>
      </Strip>
    </main>
  )
}