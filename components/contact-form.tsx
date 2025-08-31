"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Send, Loader, CheckCircle, AlertTriangle } from "lucide-react"

export function ContactForm() {
  const searchParams = useSearchParams()
  const presetProduct = searchParams.get("product") || ""

  // Unified state for all form fields for cleaner management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  })

  // State to manage the form submission process
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState("");

  // Effect to update the message field when the presetProduct changes
  useEffect(() => {
    if (presetProduct) {
      setFormData(prev => ({ ...prev, message: `I'm interested in: ${presetProduct}\n` }))
    }
  }, [presetProduct])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  // Handle submission by sending data to our API endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setResponseMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: formData.mobile }), // Match API expectation
      });

      if (!response.ok) {
        throw new Error('Submission failed. Please try again later.');
      }

      setStatus('success');
      setResponseMessage('Thank you! Your message has been sent successfully.');
      // Reset form after successful submission
      setFormData({ name: "", email: "", mobile: "", message: "" });

    } catch (error: any) {
      setStatus('error');
      setResponseMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact form">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-900">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="mobile" className="mb-1 block text-sm font-medium text-slate-900">
          Mobile (Optional)
        </label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="+91 ..."
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Tell us about your requirements"
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {status === 'submitting' ? (
            <><Loader className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
          ) : (
            <><Send className="mr-2 h-5 w-5" /> Send Inquiry</>
          )}
        </button>
        <p className="mt-2 text-xs font-medium text-slate-600">
          Note: Minimum order quantity is <span className="font-bold text-orange-600">25 kg</span>.
        </p>
      </div>

      {/* Display Success or Error Message */}
      {responseMessage && (
        <div className={`mt-4 flex items-center rounded-md p-3 text-sm ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status === 'success' ? <CheckCircle className="mr-2 h-5 w-5" /> : <AlertTriangle className="mr-2 h-5 w-5" />}
          {responseMessage}
        </div>
      )}
    </form>
  )
}