import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { api } from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      await api.submitSupport(form);
      toast.success('Message sent! We\'ll respond within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      <Toaster position="top-right" />
      <div className="container-main py-12">
        <div className="mb-10">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Get in Touch</p>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Contact Us</h1>
          <p className="text-slate-600 max-w-xl">
            Have a question or project inquiry? Our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Email</p>
                  <a href="mailto:sales@technogroup-egypt.com" className="text-amber-600 hover:text-amber-700 text-sm">
                    sales@technogroup-egypt.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Phone</p>
                  <a href="tel:+201027714174" className="text-slate-700 text-sm">+20 102 771 4174</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Head Office</p>
                  <p className="text-slate-700 text-sm">60 Mahmasha St, Al-Shrabya, Cairo, Egypt</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Working Hours</p>
                  <p className="text-slate-700 text-sm">Sun–Thu 9AM–6PM (GMT+2)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject *</label>
                <input
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your inquiry..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-400 text-slate-900 font-bold py-4 rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </motion.form>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-slate-200 h-80">
          <iframe
            title="TechnoBit Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.0!2d31.2357!3d30.0626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAzJzQ1LjQiTiAzMcKwMTQnMDguNiJF!5e0!3m2!1sen!2seg!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
