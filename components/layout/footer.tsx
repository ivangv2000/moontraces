import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { footerExploreLinks, footerLearnLinks, officialSources } from '@/data/site'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-serif text-xl tracking-wide text-foreground hover:text-accent transition-colors"
            >
              Traces on the Moon
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Presenting official, verifiable evidence of human presence on the Moon from the Apollo missions.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerExploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Learn</h3>
            <ul className="space-y-3">
              {footerLearnLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Official Sources</h3>
            <ul className="space-y-3">
              {officialSources.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                  >
                    {link.label}
                    <ExternalLink className="size-3 shrink-0 text-muted-foreground opacity-80" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
