import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { Send, ChevronRight, User, Phone, Mail, Globe, MessageSquare, Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitState('success')
        setFormData({ name: '', phone: '', email: '', country: '', message: '' })
      } else {
        throw new Error(data.error || 'Submission failed')
      }
    } catch (err: any) {
      setSubmitState('error')
      setErrorMsg(err.message || 'Network error. Please try again.')
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us - SINOTRUK International</title>
        <meta name="description" content="Get in touch with SINOTRUK. Contact our global headquarters in Jinan, China or Hong Kong office. Reach out for product inquiries, parts, service, and support." />
      </Head>
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[480px] overflow-hidden">
        <img
          src="/images/about/banner-about.webp"
          alt="Contact SINOTRUK"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-white/80 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">Contact Us</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Contact Us
            </h1>
            <p className="text-white/80 mt-4 max-w-2xl mx-auto">
              Get in touch with SINOTRUK - we&apos;ll respond to your inquiry as soon as possible
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Form Card */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200">
            {/* Card Header */}
            <div className="bg-[#26807d] px-8 py-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Get in touch with Sinotruk
              </h2>
              <p className="text-white/80">
                We&apos;ll respond to your inquiry as soon as possible
              </p>
            </div>

            {/* Card Body */}
            <div className="p-8 md:p-10 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#26807d] focus:ring-1 focus:ring-[#26807d] focus:outline-none transition-colors"
                        placeholder="Enter your full name"
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#26807d]/60" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Tel/WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#26807d] focus:ring-1 focus:ring-[#26807d] focus:outline-none transition-colors"
                        placeholder="Enter phone number with country code"
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#26807d]/60" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#26807d] focus:ring-1 focus:ring-[#26807d] focus:outline-none transition-colors"
                        placeholder="Enter your email address"
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#26807d]/60" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Country <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#26807d] focus:ring-1 focus:ring-[#26807d] focus:outline-none transition-colors"
                        placeholder="Enter your country name"
                      />
                      <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#26807d]/60" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#26807d] focus:ring-1 focus:ring-[#26807d] focus:outline-none transition-colors resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    />
                    <MessageSquare className="absolute right-3 top-4 w-5 h-5 text-[#26807d]/60" />
                  </div>
                </div>

                <div className="text-center">
                  {submitState === 'success' ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-green-800 mb-1">Inquiry Sent Successfully!</h3>
                      <p className="text-green-600">Thank you for your inquiry. Our sales team will contact you shortly.</p>
                    </div>
                  ) : (
                    <>
                      {submitState === 'error' && (
                        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <p className="text-red-700 text-sm">{errorMsg}</p>
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={submitState === 'loading'}
                        className="inline-flex items-center px-12 py-4 bg-[#26807d] text-white rounded-lg font-semibold hover:bg-[#1e6663] transition-colors shadow-lg shadow-[#26807d]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitState === 'loading' ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Inquiry
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>

            {/* Card Footer */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <Lock className="w-4 h-4" />
              <span>Your information is secure. We do not share your details with third parties.</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}