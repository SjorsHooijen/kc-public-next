'use client'

import { useState } from 'react'

interface FormState {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  if (submitted) {
    return (
      <div className="bg-primary/10 border border-primary/30 p-8 text-center">
        <svg
          className="w-12 h-12 text-primary mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-heading font-bold text-xl uppercase tracking-tight text-dark mb-2">
          Bericht verzonden!
        </h3>
        <p className="font-body text-gray-600 mb-6">
          Bedankt voor uw bericht! We nemen zo snel mogelijk contact op.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setForm({ name: '', email: '', message: '' })
          }}
          className="text-primary font-body font-medium text-sm hover:text-primary-dark transition-colors"
        >
          Nieuw bericht sturen
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block font-heading font-bold text-xs uppercase tracking-[0.15em] text-dark mb-2"
        >
          Naam <span className="text-accent">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="border-b-2 border-gray-200 focus:border-primary outline-none bg-transparent py-3 font-body w-full transition-colors text-dark placeholder-gray-400"
          placeholder="Uw naam"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-heading font-bold text-xs uppercase tracking-[0.15em] text-dark mb-2"
        >
          E-mailadres <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="border-b-2 border-gray-200 focus:border-primary outline-none bg-transparent py-3 font-body w-full transition-colors text-dark placeholder-gray-400"
          placeholder="uw@email.nl"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-heading font-bold text-xs uppercase tracking-[0.15em] text-dark mb-2"
        >
          Bericht <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="border-b-2 border-gray-200 focus:border-primary outline-none bg-transparent py-3 font-body w-full transition-colors text-dark placeholder-gray-400 resize-none"
          placeholder="Uw bericht..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-dark font-heading font-bold uppercase tracking-wide text-base px-6 py-4 transition-all hover:-translate-y-0.5"
      >
        {loading ? 'Verzenden...' : 'Bericht verzenden'}
      </button>
    </form>
  )
}
