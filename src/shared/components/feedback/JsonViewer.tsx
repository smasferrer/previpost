import type { ReactNode } from 'react'

interface JsonViewerProps {
  className?: string
  emptyMessage?: string
  jsonText: string
}

const jsonTokenPattern =
  /("(?:\\u[\dA-Fa-f]{4}|\\[^u]|[^\\"])*"(?=\s*:))|("(?:\\u[\dA-Fa-f]{4}|\\[^u]|[^\\"])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false|null)\b|([{}[\]:,])/g

const renderJsonWithColors = (jsonText: string): ReactNode => {
  const parts: ReactNode[] = []
  let currentIndex = 0

  for (const match of jsonText.matchAll(jsonTokenPattern)) {
    const matchIndex = match.index ?? 0

    if (matchIndex > currentIndex) {
      parts.push(jsonText.slice(currentIndex, matchIndex))
    }

    const [token, key, stringValue, numberValue, literalValue, punctuation] = match
    const colorClassName = punctuation
      ? 'text-[var(--app-json-punctuation)]'
      : key
        ? 'text-[var(--app-json-key)]'
        : stringValue || numberValue || literalValue
          ? 'text-[var(--app-json-value)]'
          : 'text-[var(--app-text-muted)]'

    parts.push(
      <span className={colorClassName} key={`${matchIndex}-${token}`}>
        {token}
      </span>,
    )

    currentIndex = matchIndex + token.length
  }

  if (currentIndex < jsonText.length) {
    parts.push(jsonText.slice(currentIndex))
  }

  return parts
}

function JsonViewer({
  className = '',
  emptyMessage = 'No hay JSON para mostrar.',
  jsonText,
}: JsonViewerProps) {
  return (
    <pre
      className={`max-w-full overflow-auto whitespace-pre-wrap break-normal leading-relaxed [overflow-wrap:normal] ${className}`}
    >
      {jsonText ? renderJsonWithColors(jsonText) : emptyMessage}
    </pre>
  )
}

export default JsonViewer
