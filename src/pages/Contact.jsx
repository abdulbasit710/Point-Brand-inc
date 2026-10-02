import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, EnvelopeSimple, Phone, MapPin, CheckCircle, ArrowUpRight } from '@phosphor-icons/react'
import PageHero from '../components/layout/PageHero'
import MagneticButton from '../components/ui/MagneticButton'
import Reveal from '../components/ui/Reveal'
import { COMPANY, SOCIALS, SERVICES, FAQ } from '../data/content'
import { EASE } from '../lib/motion'

const BUDGETS = ['£8k–£15k', '£15k–£30k', '£30k–£50k', '£50k+']

export default function Contact() {
  const [searchParams] = useSearchParams()
  // Pre-select a service when arriving via /contact?service=<id>
  const preselected = SERVICES.find((s) => s.id === searchParams.get('service'))?.title || ''
  const [form, setForm] = useState({ name: '', email: '', company: '', service: preselected, budget: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  function validate() {
    const er = {}
    if (!form.name.trim()) er.name = 'Please tell us your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'A valid email, please'
    if (form.message.trim().length < 10) er.message = 'A little more detail helps (10+ chars)'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    // NOTE: wire this to Formspree / your endpoint. Simulated success for now.
    await new Promise((r) => setTimeout(r, 1100))
    setStatus('sent')
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={['Tell', 'us', 'what', 'you’re', 'building.']}
        intro="Start a project, ask a question, or just say hello. We reply to every enquiry within one business day."
      />

      <section className="container-pb pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <Reveal className="border-gradient rounded-3xl bg-panel p-7 backdrop-blur-md sm:p-10">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                >
                  <CheckCircle size={64} weight="fill" className="text-coral" />
                  <h3 className="mt-5 font-display text-2xl font-semibold">Message received.</h3>
                  <p className="mt-2 max-w-sm text-fg-muted">
                    Thanks, {form.name.split(' ')[0] || 'there'} — we’ll be in touch within one business day.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' }) }}
                    className="mt-6 text-sm font-medium text-fg-muted underline-offset-4 hover:text-fg hover:underline cursor-pointer"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Name" error={errors.name}>
                      <input className="pb-input" value={form.name} onChange={set('name')} placeholder="Jane Doe" />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input className="pb-input" type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" />
                    </Field>
                  </div>

                  <Field label="Company (optional)">
                    <input className="pb-input" value={form.company} onChange={set('company')} placeholder="Company Ltd" />
                  </Field>

                  <Field label="What do you need?">
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((s) => (
                        <Chip key={s.id} active={form.service === s.title} onClick={() => setForm((f) => ({ ...f, service: s.title }))}>
                          {s.title}
                        </Chip>
                      ))}
                    </div>
                  </Field>

                  <Field label="Budget">
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <Chip key={b} active={form.budget === b} onClick={() => setForm((f) => ({ ...f, budget: b }))}>
                          {b}
                        </Chip>
                      ))}
                    </div>
                  </Field>

                  <Field label="Project details" error={errors.message}>
                    <textarea className="pb-input min-h-[120px] resize-y" value={form.message} onChange={set('message')} placeholder="Tell us about your brand, goals and timeline…" />
                  </Field>

                  <MagneticButton type="submit" className="mt-1 w-full sm:w-auto" onClick={() => {}}>
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                    {status !== 'sending' && <ArrowUpRight size={18} weight="bold" />}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            <ContactRow icon={EnvelopeSimple} label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
            <ContactRow icon={Phone} label="Phone" value={COMPANY.phone} href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} />
            <ContactRow icon={MapPin} label="Studio" value={COMPANY.location} />
            <Reveal className="rounded-3xl border border-line bg-panel p-6 backdrop-blur-md">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-fg-muted">Follow along</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-coral/50 hover:text-coral">
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="mb-8 text-center font-display text-3xl font-semibold sm:text-4xl">Frequently asked</h2>
          <div className="flex flex-col gap-3">
            {FAQ.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-fg">{label}</span>
      {children}
      {error && <span className="text-xs text-coral-deep" role="alert">{error}</span>}
    </label>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer ${
        active ? 'border-transparent bg-brand-gradient text-white' : 'border-line text-fg-muted hover:text-fg'
      }`}
    >
      {children}
    </button>
  )
}

function ContactRow({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-center gap-4 rounded-3xl border border-line bg-panel p-6 backdrop-blur-md transition-colors hover:border-coral/40">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
        <Icon size={20} weight="duotone" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-fg-muted">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
  return (
    <Reveal>
      {href ? <a href={href} className="block">{inner}</a> : inner}
    </Reveal>
  )
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel backdrop-blur-md">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-display font-medium">{item.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }} className="text-coral">
          <Plus size={20} weight="bold" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-fg-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
