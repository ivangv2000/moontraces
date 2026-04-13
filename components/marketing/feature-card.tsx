import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  /** When set, the whole card is a link (matches hover affordance). */
  href?: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, href, className }: FeatureCardProps) {
  const cardClass = cn(
    'group rounded-lg border border-border/50 bg-card/30 backdrop-blur-md p-6 transition-all duration-300 hover:bg-card/50 hover:border-border',
    href && 'block cursor-pointer no-underline text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    className,
  )

  const inner = (
    <>
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 transition-colors group-hover:bg-accent/20">
        <Icon className="h-5 w-5 text-accent" aria-hidden />
      </div>
      <h3 className="mb-2 font-medium text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={cardClass}>
        {inner}
      </Link>
    )
  }

  return <div className={cardClass}>{inner}</div>
}
