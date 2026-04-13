import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border/50 bg-card/30 backdrop-blur-md p-6',
        hover && 'transition-all duration-300 hover:bg-card/50 hover:border-border',
        className,
      )}
    >
      {children}
    </div>
  )
}
