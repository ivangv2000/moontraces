import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MissionCardProps {
  name: string
  date: string
  commander: string
  landingSite: string
  slug: string
  highlight?: string
  className?: string
}

export function MissionCard({ name, date, commander, landingSite, slug, highlight, className }: MissionCardProps) {
  return (
    <Link
      href={`/missions/${slug}`}
      className={cn('group block rounded-lg border border-border/50 bg-card/30 backdrop-blur-md p-6 transition-all duration-300 hover:bg-card/50 hover:border-border relative overflow-hidden', className)}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent/50 rounded-r group-hover:h-12 group-hover:bg-accent transition-all" />
      <div className="pl-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{date}</p>
            <h3 className="font-serif text-2xl text-foreground group-hover:text-accent transition-colors">{name}</h3>
          </div>
          <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Commander</p>
            <p className="text-sm text-foreground">{commander}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Landing Site</p>
            <p className="text-sm text-foreground">{landingSite}</p>
          </div>
        </div>
        {highlight && <p className="mt-4 text-sm text-muted-foreground italic">{highlight}</p>}
      </div>
    </Link>
  )
}
