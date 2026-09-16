import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, Github, Linkedin, MapPin, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export const ContactSection = ({ onShowToast }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('error', 'Missing Information', 'Please fill in all fields before sending.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onShowToast('success', 'Message Transmitted!', 'Thank you! The FarmerDetect SIH 2026 team will respond shortly.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 900);
  };

  return (
    <section id="contact" className="py-24 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact info & SIH 2026 Meta */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                Get in Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Connect with the FarmerDetect Team
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Whether you’re an agricultural evaluator at SIH 2026, a farmer cooperative leader, 
                or a researcher looking to collaborate on plant pathology datasets, we’d love to hear from you.
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Direct Email</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    aliaman12074@gmail.com
                  </p>
                  <p className="text-xs text-slate-500">team@farmerdetect.sih2026.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SIH 2026 Venue</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Smart India Hackathon Nodal Center
                  </p>
                  <p className="text-xs text-slate-500">Ministry of Education’s Innovation Cell (MIC), New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kisan Agronomy Hotline</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    1800-180-1551 (Kisan Call Center Integration)
                  </p>
                  <p className="text-xs text-slate-500">Free advisory for enrolled farmers</p>
                </div>
              </div>
            </div>

            {/* Social Placeholders */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Official Repositories & Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold transition"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Showcase</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-slate-500 mb-8">
              We respond promptly to hackathon inquiries, bug reports, and crop dataset contributions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Ramesh Kumar"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@institution.edu or you@gmail.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Inquiry / Feedback
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding SIH 2026 presentation, field trials, or new crop pathology models..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="contact-submit-btn"
                className="w-full py-4 px-6 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Team</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
