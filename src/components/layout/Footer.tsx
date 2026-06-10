import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { HOTEL_NAME, TAGLINE, PHONE_NUMBER, EMAIL, LOCATION, INSTAGRAM, getWhatsAppLink } from '@/lib/constants';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Rooms', href: '/rooms' },
    { label: 'Dining', href: '/dining' },
    { label: 'Amenities', href: '/amenities' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ];

  return (
    <footer className="relative bg-espresso overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-gold/[0.04] text-[20vw] whitespace-nowrap">CITYWEST</span>
      </div>

      <div className="relative content-max pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo/citywest-logo-dark.png"
                alt={HOTEL_NAME}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-text-muted text-sm mb-6">{TAGLINE}</p>
            <div className="flex items-center gap-4">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-light transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="text-gold hover:text-gold-light transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="text-text-muted hover:text-gold transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-text-muted hover:text-gold transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  {EMAIL}
                </a>
              </li>
              <li className="text-text-muted text-sm flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                {LOCATION}
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-white text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-glass-border">
          <p className="text-text-muted text-sm text-center">
            &copy; {new Date().getFullYear()} {HOTEL_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
