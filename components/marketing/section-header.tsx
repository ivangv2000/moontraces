import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ label, title, description, className, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-14', align === 'center' && 'text-center', className)}>
      {label && <p className={cn(ed.eyebrow, 'mb-3')}>{label}</p>}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-foreground text-balance">{title}</h2>
      {description && (
        <p className={cn(ed.body, 'mt-5 max-w-2xl text-pretty md:mt-6', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
