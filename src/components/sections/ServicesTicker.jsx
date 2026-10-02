import Marquee from '../ui/Marquee'

const TICKER = ['UI/UX Design', 'Website Development', 'Mobile Apps', 'SEO', 'Paid Ads', 'Branding']

/** Service ticker shown site-wide, right above the footer. */
export default function ServicesTicker() {
  return (
    <section className="border-y border-line py-8">
      <Marquee items={TICKER} pauseOnHover={false} />
    </section>
  )
}
