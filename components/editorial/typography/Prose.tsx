import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ProseProps {
  children: ReactNode
  measure?: 'narrow' | 'prose' | 'wide'
  className?: string
}

/**
 * Prose - Main body text with semantic styling
 * Automatically styles headings, lists, quotes, code, and figures
 */
export function Prose({ children, measure = 'prose', className }: ProseProps) {
  const measureClasses = {
    narrow: 'measure-narrow',
    prose: 'measure-prose',
    wide: 'measure-wide'
  }

  return (
    <div
      className={cn(
        // Base typography
        'text-[var(--fs-s)] leading-[var(--lh-normal)]',
        'text-[var(--text-primary)]',
        // Measure constraint
        measureClasses[measure],
        // Prose styling
        'prose-editorial',
        className
      )}
    >
      {children}
    </div>
  )
}

// CSS for prose styling - this would go in the editorial tokens file
const _proseStyles = `
.prose-editorial h2 {
  font-size: var(--fs-l);
  font-weight: 600;
  color: var(--text-primary);
  margin-top: var(--baseline-6);
  margin-bottom: var(--baseline-3);
  line-height: var(--lh-tight);
}

.prose-editorial h3 {
  font-size: var(--fs-m);
  font-weight: 600;
  color: var(--text-primary);
  margin-top: var(--baseline-4);
  margin-bottom: var(--baseline-2);
  line-height: var(--lh-tight);
}

.prose-editorial h4 {
  font-size: var(--fs-s);
  font-weight: 600;
  color: var(--text-primary);
  margin-top: var(--baseline-4);
  margin-bottom: var(--baseline-2);
  line-height: var(--lh-tight);
}

.prose-editorial p {
  margin-bottom: var(--baseline-3);
}

.prose-editorial p:last-child {
  margin-bottom: 0;
}

.prose-editorial ul, .prose-editorial ol {
  margin-bottom: var(--baseline-3);
  padding-left: var(--baseline-3);
}

.prose-editorial li {
  margin-bottom: var(--baseline);
}

.prose-editorial li:last-child {
  margin-bottom: 0;
}

.prose-editorial a {
  color: var(--text-accent);
  text-decoration: underline;
  text-underline-offset: 0.125em;
  text-decoration-thickness: 1px;
}

.prose-editorial a:hover {
  text-decoration-thickness: 2px;
}

.prose-editorial blockquote {
  border-left: 2px solid var(--color-editorial-accent);
  padding-left: var(--baseline-3);
  margin: var(--baseline-4) 0;
  color: var(--text-secondary);
  font-style: italic;
}

.prose-editorial code {
  background: var(--bg-secondary);
  padding: 0.125em 0.25em;
  border-radius: var(--radius-micro);
  font-size: 0.875em;
  font-family: var(--font-mono);
}

.prose-editorial pre {
  background: var(--bg-secondary);
  padding: var(--baseline-3);
  border-radius: var(--radius-small);
  overflow-x: auto;
  margin: var(--baseline-3) 0;
}

.prose-editorial pre code {
  background: none;
  padding: 0;
}

.prose-editorial strong {
  font-weight: 600;
  color: var(--text-primary);
}

.prose-editorial em {
  font-style: italic;
}

.prose-editorial hr {
  border: none;
  border-top: var(--rule-weight) solid var(--rule-color);
  opacity: var(--rule-opacity);
  margin: var(--baseline-6) 0;
}
`