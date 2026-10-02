// ─────────────────────────────────────────────────────────────────────────
//  Central content store — swap this placeholder copy for the real thing.
// ─────────────────────────────────────────────────────────────────────────

export const COMPANY = {
  name: 'Point Brand Inc',
  legal: 'Point Brand Inc.',
  domain: 'www.pointbrandinc.com',
  email: 'hello@pointbrandinc.com',
  phone: '+44 20 7946 0123',
  location: 'London · United Kingdom',
  founded: 2016,
  tagline: 'We point brands in the right direction.',
}

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Behance', href: 'https://behance.net' },
]

export const SERVICES = [
  {
    id: 'logo-design',
    no: '01',
    title: 'Logo & Brand Identity',
    excerpt:
      'Marks with meaning. We design distinctive logos and full identity systems that hold up everywhere — from a favicon to a billboard.',
    deliverables: ['Logo suite & lockups', 'Colour & type systems', 'Brand guidelines', 'Asset libraries'],
    icon: 'PenNib',
    photo: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=640&q=70',
  },
  {
    id: 'web-development',
    no: '02',
    title: 'Website Design & Development',
    excerpt:
      'Fast, animated, conversion-focused websites. Designed in-house, engineered to load beautifully on every device.',
    deliverables: ['UX & UI design', 'Headless / CMS builds', 'Webflow & React', 'Performance & SEO'],
    icon: 'Browsers',
    photo: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=640&q=70',
  },
  {
    id: 'graphics',
    no: '03',
    title: 'Graphic Design',
    excerpt:
      'Campaign graphics, packaging, decks and print that look like they cost more than they did. Consistent, on-brand, scroll-stopping.',
    deliverables: ['Campaign artwork', 'Packaging & print', 'Pitch decks', 'Editorial & social kits'],
    icon: 'Palette',
    photo: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=640&q=70',
  },
  {
    id: 'animation',
    no: '04',
    title: '2D / 3D Animation',
    excerpt:
      'Motion that earns attention — explainers, product reveals, logo stings and 3D renders that make your brand move.',
    deliverables: ['2D motion graphics', '3D product renders', 'Logo animation', 'Explainer videos'],
    icon: 'Cube',
    photo: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&w=640&q=70',
  },
  {
    id: 'social-marketing',
    no: '05',
    title: 'Social Media Marketing',
    excerpt:
      'Strategy, content and paid that turns followers into customers. We run the calendar, the creative and the numbers.',
    deliverables: ['Content strategy', 'Always-on creative', 'Paid social', 'Analytics & reporting'],
    icon: 'TrendUp',
    photo: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=640&q=70',
  },
  {
    id: 'strategy',
    no: '06',
    title: 'Brand Strategy',
    excerpt:
      'Positioning, messaging and naming. The thinking that makes every other deliverable sharper and your brand impossible to copy.',
    deliverables: ['Positioning & messaging', 'Naming & voice', 'Audience research', 'Go-to-market'],
    icon: 'Compass',
    photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=640&q=70',
  },
]

export const WORK = [
  { id: 'nova', title: 'Nova Labs', category: 'Brand Identity · Web', year: '2025', tint: 'from-coral to-violet', blurb: 'A full rebrand and site for a deep-tech research lab.' },
  { id: 'aurea', title: 'Auréa', category: 'Packaging · 3D', year: '2025', tint: 'from-violet to-coral', blurb: 'Luxury skincare packaging with cinematic 3D renders.' },
  { id: 'pulse', title: 'Pulse Fitness', category: 'Web · Motion', year: '2024', tint: 'from-coral-light to-violet-deep', blurb: 'High-energy site and launch campaign for a fitness app.' },
  { id: 'meridian', title: 'Meridian Capital', category: 'Identity · Strategy', year: '2024', tint: 'from-violet-light to-coral-deep', blurb: 'A trust-first identity for a fintech challenger.' },
  { id: 'forma', title: 'Forma Studio', category: '2D/3D Animation', year: '2024', tint: 'from-coral to-violet-light', blurb: 'An animated brand film for an architecture practice.' },
  { id: 'bloom', title: 'Bloom Social', category: 'Social · Campaign', year: '2023', tint: 'from-violet-deep to-coral', blurb: 'Always-on social that tripled engagement in 90 days.' },
]

export const STATS = [
  { value: 250, suffix: '+', label: 'Projects delivered' },
  { value: 9, suffix: 'yrs', label: 'Crafting brands' },
  { value: 40, suffix: '+', label: 'Countries reached' },
  { value: 98, suffix: '%', label: 'Client retention' },
]

export const PROCESS = [
  { no: '01', title: 'Discover', text: 'We dig into your market, audience and ambitions until the brief is sharper than when we started.' },
  { no: '02', title: 'Define', text: 'Positioning, strategy and direction. We agree the destination before we touch a pixel.' },
  { no: '03', title: 'Design', text: 'Identity, interfaces and motion — crafted in tight loops with you, never in a black box.' },
  { no: '04', title: 'Deploy', text: 'We ship, measure and refine. Launch is the start of the relationship, not the end.' },
]

export const TESTIMONIALS = [
  { quote: 'Point Brand didn’t just redesign our logo — they reframed how the whole company talks about itself. Sales noticed within a month.', name: 'Eleanor Voss', role: 'CEO, Nova Labs' },
  { quote: 'The website they built is the fastest, smoothest thing we’ve ever shipped. Our bounce rate halved.', name: 'Marcus Reid', role: 'Founder, Pulse Fitness' },
  { quote: 'Their 3D work made a moisturiser look like a piece of jewellery. We sold out the first drop in 48 hours.', name: 'Priya Nair', role: 'Brand Director, Auréa' },
  { quote: 'A genuine creative partner. Strategic when it matters, fearless when it counts.', name: 'Tom Whitfield', role: 'CMO, Meridian Capital' },
]

export const CLIENTS = ['Nova Labs', 'Auréa', 'Pulse', 'Meridian', 'Forma', 'Bloom', 'Vantage', 'Kindred']

export const FAQ = [
  { q: 'How much does a project cost?', a: 'Most engagements start around £8k for identity work and £15k–£40k for brand-plus-website builds. We’ll scope a fixed price after a short discovery call.' },
  { q: 'How long does a typical website take?', a: 'A focused marketing site runs 4–8 weeks from kickoff. Larger builds with custom animation and CMS land in 8–14 weeks.' },
  { q: 'Do you work with clients outside the UK?', a: 'Yes — we’re London-based but run projects across 40+ countries. Async-friendly and timezone-flexible.' },
  { q: 'Can you handle everything end to end?', a: 'That’s the point. Strategy, identity, web, motion and social under one roof, so nothing gets lost in handover.' },
]
