import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle, ClipboardList, Globe, Loader2, Lock, Mail, MessageSquare, Phone, Send, User } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { readRfqSelection } from '@/lib/procurement/rfq'
import { SHORTLIST_KEY } from '@/lib/procurement/shortlist'
import { SeoHead } from '@/components/seo/SeoHead'
import PageHero from '@/components/layout/PageHero'

const fieldClassName = 'mt-2 min-h-11 w-full rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] px-3 text-[var(--color-ink)] outline-none transition focus:border-[var(--color-signal-dark)] focus:ring-2 focus:ring-[var(--color-signal-soft)]'
const labelClassName = 'text-sm font-semibold text-[var(--color-ink)]'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', country: '', message: '', selections: [] as string[], quantity: '', useCase: '', destinationPort: '', consent: false,
  })
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => setFormData((current) => ({ ...current, selections: readRfqSelection(window.localStorage.getItem(SHORTLIST_KEY)) })), [])

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
    <main className="bg-[var(--color-panel)]">
      <PageHero eyebrow="Procurement enquiry" title="Prepare a clear truck or parts RFQ." description="Tell us what you need, where it will operate and where it needs to go. We will use your details to review suitable configurations or compatibility questions." />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:px-8 lg:py-14">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-canvas)] p-6 sm:p-8">
          <div className="flex items-start gap-4 border-b border-[var(--color-line)] pb-6">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[var(--color-signal-soft)] text-[var(--color-signal-dark)]"><ClipboardList className="h-5 w-5" /></div>
            <div><h2 className="text-2xl font-bold tracking-[-.025em] text-[var(--color-ink)]">RFQ details</h2><p className="mt-1 text-sm leading-6 text-[var(--color-steel)]">Fields marked with an asterisk are required. The shortlist is attached automatically when available.</p></div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <label className={labelClassName}>Your name <span className="text-[var(--color-signal-dark)]">*</span><span className="relative mt-2 block"><input type="text" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className={fieldClassName} placeholder="Full name" /><User className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-steel)]" /></span></label>
            <label className={labelClassName}>Tel / WhatsApp <span className="text-[var(--color-signal-dark)]">*</span><span className="relative mt-2 block"><input type="tel" required value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className={fieldClassName} placeholder="Include country code" /><Phone className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-steel)]" /></span></label>
            <label className={labelClassName}>Email <span className="text-[var(--color-signal-dark)]">*</span><span className="relative mt-2 block"><input type="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className={fieldClassName} placeholder="name@company.com" /><Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-steel)]" /></span></label>
            <label className={labelClassName}>Country <span className="text-[var(--color-signal-dark)]">*</span><span className="relative mt-2 block"><input type="text" required value={formData.country} onChange={(event) => setFormData({ ...formData, country: event.target.value })} className={fieldClassName} placeholder="Country or market" /><Globe className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-steel)]" /></span></label>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-3">
            <label className={labelClassName}>Quantity<input type="number" min="1" value={formData.quantity} onChange={(event) => setFormData({ ...formData, quantity: event.target.value })} className={fieldClassName} placeholder="Optional" /></label>
            <label className={labelClassName}>Use case<input value={formData.useCase} onChange={(event) => setFormData({ ...formData, useCase: event.target.value })} className={fieldClassName} placeholder="Mining, logistics" /></label>
            <label className={labelClassName}>Destination port<input value={formData.destinationPort} onChange={(event) => setFormData({ ...formData, destinationPort: event.target.value })} className={fieldClassName} placeholder="Optional" /></label>
          </div>

          <label className={`mt-7 block ${labelClassName}`}>Requirements or compatibility question <span className="text-[var(--color-signal-dark)]">*</span><span className="relative mt-2 block"><textarea required rows={6} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className={`${fieldClassName} resize-y pr-10 py-3`} placeholder="Vehicle model, operating conditions, required configuration, part number or compatibility question" /><MessageSquare className="pointer-events-none absolute right-3 top-4 h-4 w-4 text-[var(--color-steel)]" /></span></label>

          {formData.selections.length > 0 && <div className="mt-6 rounded-lg border border-[var(--color-line)] bg-[var(--color-panel)] px-4 py-3 text-sm text-[var(--color-steel)]"><strong className="text-[var(--color-ink)]">Shortlist attached:</strong> {formData.selections.length} selected item(s) will be included in this RFQ.</div>}
          <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[var(--color-steel)]"><input type="checkbox" required checked={formData.consent} onChange={(event) => setFormData({ ...formData, consent: event.target.checked })} className="mt-1 h-4 w-4 accent-[var(--color-signal-dark)]" />I agree that SINOTRUK TEAM may contact me about this enquiry.</label>

          {submitState === 'success' ? <div className="mt-7 rounded-lg border border-[var(--color-signal-dark)] bg-[var(--color-signal-soft)] p-5"><CheckCircle className="h-6 w-6 text-[var(--color-signal-dark)]" /><h3 className="mt-3 font-semibold text-[var(--color-ink)]">Inquiry received</h3><p className="mt-1 text-sm text-[var(--color-steel)]">Thank you. We will review the submitted procurement details and contact you using the information provided.</p></div> : <div className="mt-7">{submitState === 'error' && <div className="mb-4 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="h-5 w-5 shrink-0" />{errorMsg}</div>}<button type="submit" disabled={submitState === 'loading'} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--color-signal)] px-5 text-sm font-semibold text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60">{submitState === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" />Sending RFQ</> : <><Send className="h-4 w-4" />Send RFQ</>}</button></div>}
        </form>

        <aside className="h-fit rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink)] p-6 text-[var(--color-canvas)] lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">What to include</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-[var(--color-canvas)]"><li>Product or part number, if known.</li><li>Operating conditions and intended use.</li><li>Required quantity and destination.</li><li>Any configuration or compatibility question.</li></ul>
          <div className="mt-7 border-t border-white/15 pt-5 text-sm leading-6 text-[var(--color-canvas)]"><Lock className="mb-2 h-4 w-4" />Your submitted details are used to respond to this procurement enquiry.</div>
        </aside>
      </section>
    </main>
    <Footer />
  </>
}
