/**
 * Ambient animated gradient blobs + grid — the cinematic backdrop.
 * Pure CSS transforms (GPU-friendly), pointer-events: none, reduced-motion safe.
 */
export default function GradientBlobs({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      {/* faint grid */}
      <div className="absolute inset-0 bg-grid [background-size:64px_64px] opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)]" />
      {/* coral blob */}
      <div className="absolute -top-32 -left-24 h-[40rem] w-[40rem] rounded-full bg-coral/30 blur-[90px] animate-blob-1 will-change-transform" />
      {/* violet blob */}
      <div className="absolute top-10 -right-32 h-[38rem] w-[38rem] rounded-full bg-violet/30 blur-[100px] animate-blob-2 will-change-transform" />
      {/* deep magenta accent */}
      <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-violet-deep/25 blur-[90px] animate-blob-1 will-change-transform" />
    </div>
  )
}
