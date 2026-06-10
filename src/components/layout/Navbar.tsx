import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { navItems, HOTEL_NAME, PHONE_NUMBER, getWhatsAppLink } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-espresso/85 backdrop-blur-xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="content-max flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo/citywest-logo-dark.png"
              alt={HOTEL_NAME}
              className="h-10 w-auto object-contain"
            />
            <span className="font-display text-gold text-xl hidden sm:block">{HOTEL_NAME}</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.slice(1, 7).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'text-gold' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="text-gold hover:text-gold-light transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button text-sm py-2.5 px-5"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="text-gold p-2"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-espresso/95 backdrop-blur-lg lg:hidden">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                to={item.href}
                className={`font-display text-3xl text-text-light hover:text-gold transition-colors ${
                  location.pathname === item.href ? 'text-gold' : ''
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {item.label}
              </Link>
            ))}
            <div className="absolute bottom-24 text-center">
              <p className="text-text-muted text-sm font-body mb-2">Call us</p>
              <a href={`tel:${PHONE_NUMBER}`} className="text-gold text-xl font-body font-light">
                {PHONE_NUMBER}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
