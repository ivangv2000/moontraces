export default function MissionDetailLoading() {
  return (
    <div className="min-h-screen pt-24 px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="h-6 w-40 bg-secondary/40 rounded animate-pulse" />
        <div className="h-16 w-96 bg-secondary/40 rounded animate-pulse" />
        <div className="h-6 w-full max-w-2xl bg-secondary/40 rounded animate-pulse" />
      </div>
    </div>
  )
}
