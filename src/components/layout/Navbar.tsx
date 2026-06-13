import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Home,
  Bed,
  UtensilsCrossed,
  Sparkles,
  Images,
  Info,
  Menu,
  X,
  Phone,
} from 'lucide-react';
import { HOTEL_NAME, PHONE_NUMBER } from '@/lib/constants';

interface NavItem {
  name: string;
  url: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Rooms', url: '/rooms', icon: Bed },
  { name: 'Dining', url: '/dining', icon: UtensilsCrossed },
  { name: 'Amenities', url: '/amenities', icon: Sparkles },
  { name: 'Gallery', url: '/gallery', icon: Images },
  { name: 'About', url: '/about', icon: Info },
];

// ─── DESKTOP TUBELIGHT NAVBAR ───
function DesktopNavBar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    const currentItem = navItems.find((item) => item.url === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
      <div className="flex items-center gap-3 border border-glass-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                'relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors',
                'text-text-muted hover:text-gold',
                isActive && 'bg-gold/10 text-gold'
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-gold/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold rounded-t-full">
                    <div className="absolute w-12 h-6 bg-gold/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-gold/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-gold/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── MOBILE NAVBAR (keep existing behavior) ───
function MobileNavBar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
      <div className="flex items-center justify-between px-4 py-4 bg-espresso/95 backdrop-blur-lg border-b border-glass-border">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo/citywest-logo-dark.png"
            alt={HOTEL_NAME}
            className="h-8 w-auto object-contain"
          />
          <span className="text-gold text-sm font-display">{HOTEL_NAME}</span>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="text-gold p-2"
            aria-label="Call us"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-text-muted hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-espresso/95 backdrop-blur-lg border-b border-glass-border">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url;
            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-text-muted hover:bg-gold/10 transition-colors',
                  isActive && 'text-gold bg-gold/5'
                )}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
          <div className="px-4 py-3 border-t border-glass-border">
            <Link
              to="/booking"
              className="pill-button text-sm w-full text-center block"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN EXPORT ───
export default function Navbar() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNavBar />
      </div>
      <div className="md:hidden">
        <MobileNavBar />
      </div>
    </>
  );
}