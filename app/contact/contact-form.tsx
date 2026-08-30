'use client'

import { useState } from 'react'

const PRODUCT_OPTIONS = [
  'Sintered NdFeB',
  'Bonded NdFeB',
  'Magnetic Assembly',
  'Custom Solution',
]

const INITIAL_FORM = {
  name: '',
  email: '',
  company: '',
  phone: '',
  product_requirement: '',
  message: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData(INITIAL_FORM)
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.'
      )
    }
  }

  const inputClass =
    'w-full border border-neutral-300 bg-white px-4 py-2.5 text-sm text-foreground placeholder-neutral-400 transition-colors focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900'
  const labelClass =
    'block text-sm font-medium text-foreground'

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 234 567 8900"
          className={`mt-1.5 ${inputClass}`}
        />
      </div>

      {/* Product Requirement */}
      <div>
        <label htmlFor="product_requirement" className={labelClass}>
          Product Requirement
        </label>
        <select
          id="product_requirement"
          name="product_requirement"
          value={formData.product_requirement}
          onChange={handleChange}
          className={`mt-1.5 ${inputClass}`}
        >
          <option value="">Select a product type</option>
          {PRODUCT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your magnet requirements, including grade, shape, quantity, and application details."
          className={`mt-1.5 resize-none ${inputClass}`}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Thank you! Your message has been sent successfully. We will get back to you
          within 24 hours.
        </div>
      )}

      {status === 'error' && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage}
        </div>
      )}
    </form>
  )
}
