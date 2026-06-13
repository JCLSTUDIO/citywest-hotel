import { Link, useLocation } from 'react-router-dom';
import { Home, BedDouble, Utensils, Image, Phone } from 'lucide-react';

const dockIcons = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BedDouble, label: 'Rooms', href: '/rooms' },
  { icon: Utensils, label: 'Dining', href: '/dining' },
  { icon: Image, label: 'Gallery', href: '/gallery' },
  { icon: Phone, label: 'Contact', href: '/contact' },
];

export default function MobileDock() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-espresso/95 backdrop-blur-xl border-t border-glass-border lg:hidden">
      <div className="flex items-center justify-around h-16">
        {dockIcons.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[60px] min-h-[48px] transition-colors ${
                isActive ? 'text-gold' : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-gold rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
