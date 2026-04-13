export function Viewer3dLoadingState() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[oklch(0.07_0.02_260)]">
      <div className="text-center">
        <div className="mx-auto size-11 animate-spin rounded-full border-2 border-accent/25 border-t-accent shadow-[0_0_24px_oklch(0.7_0.15_220/0.12)]" />
        <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Loading lunar globe
        </p>
        <p className="mx-auto mt-2 max-w-[14rem] text-[11px] leading-relaxed text-muted-foreground/75">
          Cesium Ion Moon or fallback globe — first paint may take a moment.
        </p>
      </div>
    </div>
  )
}
