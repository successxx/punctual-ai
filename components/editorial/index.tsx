'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'

/* Layout Components */

export const ArticleLayout: React.FC<{ children: React.ReactNode; sidebar?: React.ReactNode }> = ({ children, sidebar }) => (
  <div className="editorial-article-layout">
    <div className="editorial-article-rail">
      {sidebar}
    </div>
    <main className="editorial-article-content">
      {children}
    </main>
  </div>
)

export const GridLayout: React.FC<{ 
  children: React.ReactNode; 
  ratio?: '3/9' | '5/7' | '4/8' 
}> = ({ children, ratio = '3/9' }) => (
  <div className={`editorial-grid-layout editorial-grid-${ratio.replace('/', '-')}`}>
    {children}
  </div>
)

export const BandSection: React.FC<{ 
  children: React.ReactNode;
  sticky?: React.ReactNode;
}> = ({ children, sticky }) => (
  <section className="editorial-band-section">
    {sticky && <div className="editorial-band-sticky">{sticky}</div>}
    <div className="editorial-band-content">
      {children}
    </div>
  </section>
)

/* Typography Components */

export const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="editorial-kicker">{children}</p>
)

export const Headline: React.FC<{ 
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}> = ({ level = 1, children }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return <Tag className={`editorial-headline editorial-h${level}`}>{children}</Tag>
}

export const Lead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="editorial-lead">{children}</p>
)

export const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="editorial-body">{children}</div>
)

export const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <figcaption className="editorial-caption">{children}</figcaption>
)

/* Editorial Blocks */

export const Blockquote: React.FC<{ 
  children: React.ReactNode;
  attribution?: string;
}> = ({ children, attribution }) => (
  <blockquote className="editorial-blockquote">
    <div className="editorial-quote-mark">"</div>
    {children}
    {attribution && <cite className="editorial-attribution">{attribution}</cite>}
  </blockquote>
)

export const Callout: React.FC<{ 
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success';
}> = ({ children, variant = 'info' }) => (
  <aside className={`editorial-callout editorial-callout-${variant}`}>
    <div className="editorial-callout-rule" />
    {children}
  </aside>
)

export const DefinitionList: React.FC<{ 
  items: Array<{ term: string; definition: string }>
}> = ({ items }) => (
  <dl className="editorial-definition-list">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        <dt className="editorial-definition-term">{item.term}</dt>
        <dd className="editorial-definition-desc">{item.definition}</dd>
      </React.Fragment>
    ))}
  </dl>
)

export const Timeline: React.FC<{ 
  items: Array<{ date: string; title: string; description?: string }>
}> = ({ items }) => (
  <ol className="editorial-timeline">
    {items.map((item, i) => (
      <li key={i} className="editorial-timeline-item">
        <time className="editorial-timeline-date">{item.date}</time>
        <div className="editorial-timeline-content">
          <h4 className="editorial-timeline-title">{item.title}</h4>
          {item.description && <p className="editorial-timeline-desc">{item.description}</p>}
        </div>
      </li>
    ))}
  </ol>
)

export const DataTable: React.FC<{ 
  headers: string[];
  rows: string[][];
  caption?: string;
}> = ({ headers, rows, caption }) => (
  <figure className="editorial-table-figure">
    {caption && <figcaption className="editorial-table-caption">{caption}</figcaption>}
    <table className="editorial-data-table">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} scope="col">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </figure>
)

export const Footnotes: React.FC<{ 
  notes: Array<{ id: string; content: React.ReactNode }>
}> = ({ notes }) => (
  <section className="editorial-footnotes" role="doc-endnotes">
    <h3 className="editorial-footnotes-title">Notes</h3>
    <ol className="editorial-footnotes-list">
      {notes.map(note => (
        <li key={note.id} id={`fn-${note.id}`}>
          {note.content}
          <a href={`#ref-${note.id}`} className="editorial-footnote-backref" aria-label="Back to reference">↩</a>
        </li>
      ))}
    </ol>
  </section>
)

/* Media Components */

export const Figure: React.FC<{ 
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
}> = ({ src, alt, caption, credit }) => (
  <figure className="editorial-figure">
    <img src={src} alt={alt} className="editorial-figure-image" loading="lazy" />
    {(caption || credit) && (
      <figcaption className="editorial-figure-caption">
        {caption && <span className="editorial-caption-text">{caption}</span>}
        {credit && <span className="editorial-caption-credit">{credit}</span>}
      </figcaption>
    )}
  </figure>
)

export const Gallery: React.FC<{ 
  images: Array<{ src: string; alt: string; caption?: string }>
}> = ({ images }) => (
  <div className="editorial-gallery" role="region" aria-label="Image gallery">
    <div className="editorial-gallery-track">
      {images.map((img, i) => (
        <figure key={i} className="editorial-gallery-item">
          <img src={img.src} alt={img.alt} loading="lazy" />
          {img.caption && <Caption>{img.caption}</Caption>}
        </figure>
      ))}
    </div>
  </div>
)

/* UI Components */

export const TextButton: React.FC<{ 
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ href, onClick, children }) => {
  if (href) {
    return (
      <Link href={href} className="editorial-text-button">
        {children}
      </Link>
    )
  }
  return (
    <button onClick={onClick} className="editorial-text-button">
      {children}
    </button>
  )
}

export const Badge: React.FC<{ 
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'muted';
}> = ({ children, variant = 'default' }) => (
  <span className={`editorial-badge editorial-badge-${variant}`}>
    {children}
  </span>
)

export const Icon: React.FC<{ 
  name: 'arrow-right' | 'arrow-left' | 'chevron-down' | 'chevron-right';
  size?: 'sm' | 'md' | 'lg';
}> = ({ name, size = 'md' }) => {
  const icons = {
    'arrow-right': '→',
    'arrow-left': '←',
    'chevron-down': <ChevronDown className={`editorial-icon-${size}`} />,
    'chevron-right': <ChevronRight className={`editorial-icon-${size}`} />,
  }
  return <span className="editorial-icon" aria-hidden="true">{icons[name]}</span>
}

export const FieldGroup: React.FC<{ 
  children: React.ReactNode;
  label: string;
  name: string;
}> = ({ children, label, name }) => (
  <fieldset className="editorial-field-group">
    <legend className="editorial-field-label">{label}</legend>
    <div className="editorial-field-options" role="group" aria-labelledby={name}>
      {children}
    </div>
  </fieldset>
)

export const Disclosure: React.FC<{ 
  summary: string;
  children: React.ReactNode;
}> = ({ summary, children }) => (
  <details className="editorial-disclosure">
    <summary className="editorial-disclosure-summary">
      {summary}
      <span className="editorial-disclosure-marker" aria-hidden="true" />
    </summary>
    <div className="editorial-disclosure-content">
      {children}
    </div>
  </details>
)

export const Progress: React.FC<{ 
  value: number;
  max?: number;
  label?: string;
}> = ({ value, max = 100, label }) => (
  <div className="editorial-progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
    {label && <span className="editorial-progress-label">{label}</span>}
    <div className="editorial-progress-track">
      <div className="editorial-progress-fill" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  </div>
)

/* Navigation Components */

export const TableOfContents: React.FC<{ 
  items: Array<{ id: string; title: string; level: number }>
}> = ({ items }) => (
  <nav className="editorial-toc" aria-label="Table of contents">
    <h3 className="editorial-toc-title">Contents</h3>
    <ol className="editorial-toc-list">
      {items.map(item => (
        <li key={item.id} className={`editorial-toc-item editorial-toc-level-${item.level}`}>
          <a href={`#${item.id}`} className="editorial-toc-link">
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  </nav>
)

export const Breadcrumb: React.FC<{ 
  items: Array<{ label: string; href?: string }>
}> = ({ items }) => (
  <nav aria-label="Breadcrumb" className="editorial-breadcrumb">
    <ol className="editorial-breadcrumb-list">
      {items.map((item, i) => (
        <li key={i} className="editorial-breadcrumb-item">
          {item.href ? (
            <Link href={item.href} className="editorial-breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="editorial-breadcrumb-separator" aria-hidden="true">/</span>}
        </li>
      ))}
    </ol>
  </nav>
)