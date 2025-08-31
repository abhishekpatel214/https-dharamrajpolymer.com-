// app/contact/page.tsx
'use client'; // This is a client component

// Import useEffect and useSearchParams
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { Phone, Mail, MapPin, Send, Loader, CheckCircle, AlertTriangle } from "lucide-react";

export default function ContactPage() {
  // Get the search params from the URL
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState("");
  
  // This effect runs when the component mounts and reads the 'product' URL parameter
  useEffect(() => {
    const productName = searchParams.get('product');
    if (productName) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in the following product: ${productName}\n\nPlease provide a quote.`
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setResponseMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setResponseMessage('Thank you! Your message has been sent.');
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error('Something went wrong. Please try again.');
      }
    } catch (error: any) {
      setStatus('error');
      setResponseMessage(error.message || 'An unexpected error occurred.');
      setStatus('error'); // Ensure status is set to error
    } finally {
      if (status !== 'success') {
         setStatus('idle'); // Reset status if not successful
      }
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Contact Us</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              We're here to help. Reach out to us with your questions or requirements.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Information & Map */}
            <div className="space-y-8">
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800">Get in Touch</h2>
                <div className="mt-6 space-y-4">
                  <a href="tel:+919316445402" className="flex items-center space-x-3 text-slate-700 hover:text-blue-600">
                    <Phone className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>+91 9316445402</span>
                  </a>
                  <a href="mailto:dharamrajpolymer@gmail.com" className="flex items-center space-x-3 text-slate-700 hover:text-blue-600">
                    <Mail className="h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span>dharamrajpolymer@gmail.com</span>
                  </a>
                  <a href="https://wa.me/919316445402" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-700 hover:text-green-600">
                    <svg className="h-5 w-5 flex-shrink-0 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.31 20.6C8.75 21.42 10.36 21.88 12.04 21.88C17.5 21.88 21.95 17.43 21.95 11.97C21.95 9.31 20.92 6.8 19.05 4.93C17.18 3.06 14.67 2.03 12.04 2.03M12.04 3.67C14.24 3.67 16.3 4.5 17.82 6.02C19.34 7.54 20.18 9.6 20.18 11.8C20.18 16.45 16.52 20.11 11.87 20.11C10.36 20.11 8.91 19.7 7.65 18.96L7.3 18.76L4.3 19.7L5.25 16.78L5.04 16.44C4.25 15.12 3.83 13.59 3.83 12C3.83 7.35 7.49 3.69 12.14 3.69M16.54 14.86C16.3 14.74 15.03 14.12 14.83 14.04C14.63 13.96 14.47 13.92 14.31 14.16C14.15 14.4 13.64 14.99 13.52 15.15C13.4 15.31 13.28 15.35 13.04 15.23C12.8 15.11 11.96 14.82 10.93 13.92C10.12 13.21 9.58 12.35 9.42 12.07C9.26 11.79 9.38 11.67 9.5 11.55C9.61 11.44 9.74 11.27 9.86 11.11C9.98 10.95 10.02 10.83 10.14 10.59C10.26 10.35 10.22 10.19 10.14 10.03C10.06 9.87 9.6 8.79 9.42 8.3C9.24 7.82 9.06 7.85 8.92 7.85C8.78 7.85 8.62 7.85 8.46 7.85C8.3 7.85 8.06 7.93 7.86 8.17C7.66 8.41 7.15 8.9 7.15 9.98C7.15 11.06 7.89 12.1 8.01 12.26C8.13 12.42 9.62 14.77 11.89 15.72C12.45 15.96 12.85 16.08 13.19 16.18C13.79 16.33 14.31 16.29 14.72 16.21C15.18 16.12 16.3 15.5 16.54 15.23C16.78 14.96 16.78 14.74 16.54 14.86Z"/>
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                  <div className="flex items-start space-x-3 text-slate-700">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-blue-500 mt-1" />
                    <address className="not-italic">
                        Dharamraj Polymer<br />
                        Mota Chiloda, Himatnagar Highway,<br />
                        Near Krishna Hotel, N.H. 8,<br />
                        Gandhinagar, Gujarat - 382355
                    </address>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.522204595874!2d72.68019837586526!3d23.22380090885233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c25e43a9f18b3%3A0x1d37440388b7042!2sDharamraj%20Polymer!5e0!3m2!1sen!2sin!4v1725137976694!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-slate-800">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number (Optional)</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                  <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={status === 'submitting'} className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300">
                    {status === 'submitting' ? <><Loader className="mr-2 h-5 w-5 animate-spin" /> Submitting...</> : <><Send className="mr-2 h-5 w-5" /> Send Message</>}
                  </button>
                </div>
                {responseMessage && (
                  <div className={`mt-4 flex items-center rounded-md p-3 text-sm ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {status === 'success' ? <CheckCircle className="mr-2 h-5 w-5" /> : <AlertTriangle className="mr-2 h-5 w-5" />}
                    {responseMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}