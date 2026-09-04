import { Link } from 'react-router-dom'

// Renders inline **bold**, *italic*, and [text](url) markdown within a
// plain string as JSX. Links starting with "/" use react-router's Link;
// everything else is a normal external anchor.
export function renderInline(text) {
  const pattern = /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g
  const nodes = []
  let lastIndex = 0
  let match
  let key = 0

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const token = match[0]
    if (token.startsWith('[')) {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)]+)\)/)
      nodes.push(
        href.startsWith('/') ? (
          <Link key={key++} to={href} className="text-brand underline underline-offset-2">
            {label}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-brand underline underline-offset-2"
          >
            {label}
          </a>
        )
      )
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink">
          {token.slice(2, -2)}
        </strong>
      )
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>)
    }
    lastIndex = pattern.lastIndex
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

export function H2({ children }) {
  return (
    <h2 className="mt-10 font-display text-xl text-ink first:mt-0">{renderInline(children)}</h2>
  )
}

export function H3({ children }) {
  return <h3 className="mt-6 font-display text-base text-ink">{renderInline(children)}</h3>
}

export function P({ children }) {
  return <p className="mt-3 text-sm leading-relaxed text-ink">{renderInline(children)}</p>
}

export function UL({ items }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink">
      {items.map((item, i) => (
        <li key={i}>{renderInline(item)}</li>
      ))}
    </ul>
  )
}

export function OL({ items }) {
  return (
    <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink">
      {items.map((item, i) => (
        <li key={i}>{renderInline(item)}</li>
      ))}
    </ol>
  )
}

export function Table({ head, rows }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-md border border-line">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-brand-soft">
            {head.map((h, i) => (
              <th key={i} className="px-4 py-2 font-medium text-ink">
                {renderInline(h)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i > 0 ? 'border-t border-line' : ''}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 align-top text-ink">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Hr() {
  return <hr className="mt-10 border-line" />
}
