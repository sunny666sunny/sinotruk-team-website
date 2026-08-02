import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AlertCircle, CheckCircle, ClipboardList, Globe, Loader2, Lock, Mail, MessageSquare, Phone, Send, User } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { mergePublishedSelections, readRfqSelection } from '@/lib/procurement/rfq'
import { SHORTLIST_KEY } from '@/lib/procurement/shortlist'
import { SeoHead } from '@/components/seo/SeoHead'
import PageHero from '@/components/layout/PageHero'
import { getPublishedParts, getPublishedProducts } from '@/lib/content/repository'

const fieldClassName = 'mt-2 min-h-12 w-full min-w-0 border border-[var(--industrial-line)] bg-[var(--industrial-panel)] px-4 text-[var(--industrial-text)] outline-none transition placeholder:text-[var(--industrial-muted)] focus:border-[var(--industrial-accent)] focus:ring-2 focus:ring-[var(--industrial-accent)]/25'
const labelClassName = 'min-w-0 text-sm font-semibold text-[var(--industrial-text)]'

export default function ContactPage({ publishedSelectionIds }: { publishedSelectionIds: string[] }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', country: '', message: '', selections: [] as string[], quantity: '', useCase: '', destinationPort: '', consent: false,
  })
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!router.isReady) return
    const storedIds = readRfqSelection(window.localStorage.getItem(SHORTLIST_KEY))
    const selections = mergePublishedSelections(storedIds, [router.query.product, router.query.part], publishedSelectionIds)
    setFormData((current) => ({ ...current, selections }))
  }, [publishedSelectionIds, router.isReady, router.query.part, router.query.product])

  const FEISHU_WEBHOOK = 'https://open.feishu.cn/open-apis/bot/v2/hook/0a8ca31f-bcd9-4079-8085-514663ae7ddd'

  const sendToFeishu = async (data: typeof formData) => {
    const time = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const payload = {
      msg_type: 'interactive',
      card: {
        header: { title: { content: 'New Inquiry from sinotrukteam.com', tag: 'plain_text' }, template: 'turquoise' },
        elements: [
          { tag: 'div', text: { tag: 'lark_md', content: `**Time:** ${time}` } }, { tag: 'hr' },
          { tag: 'div', text: { tag: 'lark_md', content: `**Name:** ${data.name}` } },
          { tag: 'div', text: { tag: 'lark_md', content: `**Phone/WhatsApp:** ${data.phone}` } },
          { tag: 'div', text: { tag: 'lark_md', content: `**Email:** ${data.email}` } },
          { tag: 'div', text: { tag: 'lark_md', content: `**Country:** ${data.country}` } }, { tag: 'hr' },
          { tag: 'div', text: { tag: 'lark_md', content: `**Message:**\n${data.message}` } },
        ],
      },
    }
    return fetch(FEISHU_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitState('loading')
    setErrorMsg('')
    try {
      let response: Response
      try {
        response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) })
      } catch {
        response = await sendToFeishu(formData)
      }
      const responseData = await response.json()
      if (responseData.code === 0 || responseData.success) {
        setSubmitState('success')
        setFormData({ name: '', phone: '', email: '', country: '', message: '', selections: [], quantity: '', useCase: '', destinationPort: '', consent: false })
      } else {
        throw new Error(responseData.error || 'Submission failed')
      }
    } catch (error: any) {
      setSubmitState('error')
      setErrorMsg(error.message || 'Network error. Please try again.')
    }
  }

  return <>
    <SeoHead input={{ path: '/contact', pageType: 'website', name: 'Request a Truck or Parts RFQ', description: 'Send your truck or parts requirements, shortlisted items, destination details and compatibility information to SINOTRUK TEAM.' }} />
    <Header />
    <main id="main" className="industrial-page pt-16 lg:pt-[72px]">
      <PageHero eyebrow="Procurement enquiry" title="Prepare a clear truck or parts RFQ." description="Tell us what you need, where it will operate and where it needs to go. We will review suitable configurations or compatibility questions." image="/images/reference/banner-ser.webp" />
      <section className="border-b border-[var(--industrial-line)] bg-[var(--industrial-bg)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8 lg:py-16">
          <form onSubmit={handleSubmit} aria-describedby="rfq-form-help" className="min-w-0 border border-[var(--industrial-line)] bg-[var(--industrial-surface)] p-5 sm:p-8">
            <div className="flex min-w-0 items-start gap-4 border-b border-[var(--industrial-line)] pb-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center bg-[var(--industrial-accent)] text-[#081113]"><ClipboardList aria-hidden="true" className="h-5 w-5" /></div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">Enquiry details</p>
                <h2 className="mt-2 text-3xl font-bold uppercase text-[var(--industrial-text)]">Build your RFQ</h2>
                <p id="rfq-form-help" className="mt-2 text-sm leading-6 text-[var(--industrial-muted)]">Fields marked with an asterisk are required. Your saved shortlist is attached automatically.</p>
              </div>
            </div>

            <div className="mt-7 grid min-w-0 gap-6 md:grid-cols-2">
              <label className={labelClassName}>Your name <span className="text-[var(--industrial-accent)]">*</span><span className="relative block"><input name="name" type="text" autoComplete="name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={`${fieldClassName} pr-11`} placeholder="Full name" /><User aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-[var(--industrial-muted)]" /></span></label>
              <label className={labelClassName}>Tel / WhatsApp <span className="text-[var(--industrial-accent)]">*</span><span className="relative block"><input name="phone" type="tel" autoComplete="tel" required value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className={`${fieldClassName} pr-11`} placeholder="Include country code" /><Phone aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-[var(--industrial-muted)]" /></span></label>
              <label className={labelClassName}>Email <span className="text-[var(--industrial-accent)]">*</span><span className="relative block"><input name="email" type="email" autoComplete="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={`${fieldClassName} pr-11`} placeholder="name@company.com" /><Mail aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-[var(--industrial-muted)]" /></span></label>
              <label className={labelClassName}>Country <span className="text-[var(--industrial-accent)]">*</span><span className="relative block"><input name="country" type="text" autoComplete="country-name" required value={formData.country} onChange={(event) => setFormData({ ...formData, country: event.target.value })} className={`${fieldClassName} pr-11`} placeholder="Country or market" /><Globe aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-[var(--industrial-muted)]" /></span></label>
            </div>

            <div className="mt-7 grid min-w-0 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <label className={labelClassName}>Quantity<input name="quantity" type="number" min="1" inputMode="numeric" value={formData.quantity} onChange={(event) => setFormData({ ...formData, quantity: event.target.value })} className={fieldClassName} placeholder="Optional" /></label>
              <label className={labelClassName}>Use case<input name="useCase" value={formData.useCase} onChange={(event) => setFormData({ ...formData, useCase: event.target.value })} className={fieldClassName} placeholder="Mining, logistics" /></label>
              <label className={labelClassName}>Destination port<input name="destinationPort" value={formData.destinationPort} onChange={(event) => setFormData({ ...formData, destinationPort: event.target.value })} className={fieldClassName} placeholder="Optional" /></label>
            </div>

            <label className={`mt-7 block ${labelClassName}`}>Requirements or compatibility question <span className="text-[var(--industrial-accent)]">*</span><span className="relative block"><textarea name="message" required rows={6} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className={`${fieldClassName} resize-y py-3 pr-11`} placeholder="Vehicle model, operating conditions, required configuration, part number or compatibility question" /><MessageSquare aria-hidden="true" className="pointer-events-none absolute right-4 top-5 h-4 w-4 text-[var(--industrial-muted)]" /></span></label>

            {formData.selections.length > 0 && <div className="mt-6 border border-[var(--industrial-line)] bg-[var(--industrial-panel)] px-4 py-4 text-sm text-[var(--industrial-muted)]"><strong className="text-[var(--industrial-text)]">Shortlist attached:</strong> {formData.selections.length} selected item(s) will be included in this RFQ.</div>}

            <label className="mt-6 flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-[var(--industrial-muted)]">
              <input name="consent" type="checkbox" required checked={formData.consent} onChange={(event) => setFormData({ ...formData, consent: event.target.checked })} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--industrial-accent)]" />
              <span>I agree that SINOTRUK TEAM may contact me about this enquiry.</span>
            </label>

            {submitState === 'success' ? <div role="status" aria-live="polite" className="mt-7 border border-[var(--industrial-accent)] bg-[var(--industrial-panel)] p-5"><CheckCircle aria-hidden="true" className="h-6 w-6 text-[var(--industrial-accent)]" /><h3 className="mt-3 text-xl font-bold uppercase text-[var(--industrial-text)]">Inquiry received</h3><p className="mt-1 text-sm text-[var(--industrial-muted)]">Thank you. We will review the submitted procurement details and contact you using the information provided.</p></div> : <div className="mt-7">{submitState === 'error' && <div role="alert" className="mb-4 flex items-start gap-3 border border-red-400/60 bg-red-950/30 p-4 text-sm text-red-100"><AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" /><span>{errorMsg}</span></div>}<button type="submit" disabled={submitState === 'loading'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[var(--industrial-accent)] px-6 text-xs font-bold uppercase tracking-[0.08em] text-[#081113] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">{submitState === 'loading' ? <><Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />Sending RFQ</> : <><Send aria-hidden="true" className="h-4 w-4" />Send RFQ</>}</button></div>}
          </form>

          <aside className="h-fit border border-[var(--industrial-line)] bg-[var(--industrial-panel)] p-6 lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--industrial-accent)]">RFQ checklist</p>
            <h2 className="mt-3 text-3xl font-bold uppercase text-[var(--industrial-text)]">What to include</h2>
            <ol className="mt-6 space-y-0 text-sm leading-6 text-[var(--industrial-muted)]">
              {['Product or part number, if known.', 'Operating conditions and intended use.', 'Required quantity and destination.', 'Any configuration or compatibility question.'].map((item, index) => <li key={item} className="flex gap-3 border-t border-[var(--industrial-line)] py-4"><span className="font-mono text-[var(--industrial-accent)]">0{index + 1}</span><span>{item}</span></li>)}
            </ol>
            <div className="mt-4 border-t border-[var(--industrial-line)] pt-5 text-sm leading-6 text-[var(--industrial-muted)]"><Lock aria-hidden="true" className="mb-3 h-5 w-5 text-[var(--industrial-accent)]" />Your submitted details are used to respond to this procurement enquiry.</div>
          </aside>
        </div>
      </section>
    </main>
    <Footer />
  </>
}

export async function getStaticProps() {
  const [products, parts] = await Promise.all([getPublishedProducts(), getPublishedParts()])
  return { props: { publishedSelectionIds: [...products, ...parts].map((item) => item.id) }, revalidate: 300 }
}
