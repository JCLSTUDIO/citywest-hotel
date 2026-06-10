import { useState } from 'react';
import {
  Phone, Mail, MapPin, MessageCircle, Instagram,
  Send, Clock, Check
} from 'lucide-react';
import {
  HOTEL_NAME, PHONE_NUMBER, EMAIL, LOCATION,
  INSTAGRAM, getWhatsAppLink
} from '@/lib/constants';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const message = `Hi ${HOTEL_NAME},\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`;
    window.open(getWhatsAppLink(message), '_blank');
    setSubmitted(true);
  };

  return (
    <>
      {/* Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-espresso pt-20">
        <div className="text-center content-max px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">Contact Us</h1>
          <p className="text-text-muted text-lg">We&apos;d love to hear from you</p>
        </div>
      </section>

      <section className="section-padding bg-espresso-light">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="glass-panel">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="font-display text-2xl text-white mb-2">Message Sent!</h3>
                    <p className="text-text-muted text-sm mb-4">
                      We&apos;ve opened WhatsApp for you. Send the message to complete your inquiry.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="pill-button-outline text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display text-xl text-white mb-1">Send us a Message</h3>
                    <p className="text-text-muted text-sm mb-6">
                      We&apos;ll respond via WhatsApp as soon as possible.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="text-text-muted text-xs block mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          minLength={2}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="glass-input"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-text-muted text-xs block mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="glass-input"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="text-text-muted text-xs block mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="glass-input"
                          placeholder="+234..."
                        />
                      </div>
                      <div>
                        <label className="text-text-muted text-xs block mb-2">Message *</label>
                        <textarea
                          required
                          rows={4}
                          maxLength={500}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="glass-input resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <button type="submit" className="pill-button w-full justify-center">
                        <Send className="w-4 h-4" />
                        Send via WhatsApp
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-panel">
                <h3 className="font-display text-xl text-white mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-4 text-text-muted hover:text-gold transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Phone</p>
                      <p className="text-white text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-4 text-text-muted hover:text-gold transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Email</p>
                      <p className="text-white text-sm">{EMAIL}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Address</p>
                      <p className="text-white text-sm">{LOCATION}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted">Front Desk Hours</p>
                      <p className="text-white text-sm">24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-panel">
                <h3 className="font-display text-lg text-white mb-4">Quick Connect</h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-lg bg-whatsapp/15 border border-whatsapp/30 text-white text-sm hover:bg-whatsapp/25 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-whatsapp" />
                    WhatsApp
                  </a>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-lg bg-gold/10 border border-gold/30 text-white text-sm hover:bg-gold/20 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-gold" />
                    Instagram
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="glass-panel p-0 overflow-hidden">
                <div className="aspect-video bg-espresso-elevated flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-gold mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">{HOTEL_NAME}</p>
                    <p className="text-text-muted text-xs">{LOCATION}</p>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(LOCATION)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold text-xs mt-2 inline-block hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
