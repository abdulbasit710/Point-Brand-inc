import Hero from '../components/sections/Hero'
import ClientMarquee from '../components/sections/ClientMarquee'
import ServicesPreview from '../components/sections/ServicesPreview'
import WorkPreview from '../components/sections/WorkPreview'
import Stats from '../components/sections/Stats'
import Process from '../components/sections/Process'
import Testimonials from '../components/sections/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <ServicesPreview />
      <WorkPreview />
      <Stats />
      <Process />
      <Testimonials />
    </>
  )
}
