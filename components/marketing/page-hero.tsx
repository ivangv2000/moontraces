import { cn } from '@/lib/utils'

interface PageHeroProps {
  label?: string
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHero({ label, title, description, className, children }: PageHeroProps) {
  return (
    <section className={cn('pt-32 pb-20 px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-4xl text-center">
        {label && <p className="text-xs uppercase tracking-[0.2em] text-accent mb-6">{label}</p>}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground text-balance">{title}</h1>
        {description && <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">{description}</p>}
        {children}
      </div>
    </section>
  )
}
