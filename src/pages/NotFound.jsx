import { ArrowLeft } from '@phosphor-icons/react'
import GradientBlobs from '../components/ui/GradientBlobs'
import MagneticButton from '../components/ui/MagneticButton'

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden px-6 text-center">
      <GradientBlobs />
      <div className="relative">
        <p className="font-display text-[8rem] font-bold leading-none text-gradient sm:text-[12rem]">404</p>
        <h1 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">This page wandered off-brand.</h1>
        <p className="mx-auto mt-3 max-w-md text-fg-muted">
          The page you’re after doesn’t exist — or has moved. Let’s point you back to safety.
        </p>
        <MagneticButton to="/" className="mt-8">
          <ArrowLeft size={18} weight="bold" /> Back home
        </MagneticButton>
      </div>
    </section>
  )
}
