import { MessageCircle, Calendar, Phone } from 'lucide-react';
import { getWhatsAppLink, PHONE_NUMBER } from '@/lib/constants';

export default function MobileActionBar() {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 lg:hidden">
      <div className="glass-panel mx-4 py-3 px-4 flex items-center justify-around">
        {/* WhatsApp */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-whatsapp/15 border border-whatsapp/30 text-white text-sm"
        >
          <MessageCircle className="w-4 h-4 text-whatsapp" />
          <span className="text-xs font-medium">WhatsApp</span>
        </a>

        {/* Book Now */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-espresso font-semibold text-sm"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-medium">Book Now</span>
        </a>

        {/* Call */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-panel py-2 px-3 border-gold/30 text-white text-sm"
        >
          <Phone className="w-4 h-4 text-gold" />
          <span className="text-xs font-medium">Call</span>
        </a>
      </div>
    </div>
  );
}
