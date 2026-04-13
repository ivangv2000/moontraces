export default function ExploreLoading() {
  return (
    <div className="min-h-screen pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="relative min-w-0 flex-1 bg-secondary/25">
          <div className="absolute left-4 top-4 z-10 h-24 w-[min(100%,19rem)] max-w-full animate-pulse rounded-lg border border-border/40 bg-card/30" />
          <div className="absolute inset-0 animate-pulse rounded-none bg-secondary/30" />
          <div className="absolute bottom-4 left-1/2 z-10 h-12 w-[min(100%,24rem)] max-w-[calc(100%-2rem)] -translate-x-1/2 animate-pulse rounded-lg border border-border/40 bg-card/30" />
        </div>
        <aside className="hidden w-96 shrink-0 border-l border-border/50 bg-background/40 lg:block">
          <div className="space-y-6 p-7">
            <div className="h-4 w-24 animate-pulse rounded bg-muted/50" />
            <div className="h-10 w-3/4 max-w-[12rem] animate-pulse rounded-md bg-muted/45" />
            <div className="h-24 animate-pulse rounded-lg border border-border/35 bg-card/25" />
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted/35" />
              <div className="h-3 w-full animate-pulse rounded bg-muted/35" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted/35" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
