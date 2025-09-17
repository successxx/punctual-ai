import React from 'react'

interface FactListProps {
  items: { label: string; value: string | number }[]
}

export function FactList({ items }: FactListProps) {
  return (
    <dl className="fact-list">
      {items.map((item, index) => (
        <div key={index} className="fact-item">
          <dt className="fact-label">{item.label}</dt>
          <dd className="fact-value">{item.value}</dd>
        </div>
      ))}
      <style jsx>{`
        .fact-list {
          display: grid;
          gap: var(--baseline-2);
        }
        .fact-item {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: var(--baseline) 0;
          border-bottom: 1px solid var(--color-rule);
        }
        .fact-label {
          font-size: var(--fs-s);
          color: var(--color-ink-3);
        }
        .fact-value {
          font-size: var(--fs-m);
          font-weight: 500;
          color: var(--color-ink);
        }
      `}</style>
    </dl>
  )
}