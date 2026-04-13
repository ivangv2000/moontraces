type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Renders a JSON-LD script. Safe for static JSON built from trusted server data only.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
