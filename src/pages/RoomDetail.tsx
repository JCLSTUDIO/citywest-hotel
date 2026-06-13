import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Users, Bed, Maximize, Check, ArrowLeft, ArrowRight,
  Wifi, Wind, Tv, Refrigerator, Bath, Eye, UtensilsCrossed
} from 'lucide-react';
import { rooms } from '@/lib/constants';

const featureIcons: Record<string, React.ElementType> = {
  'Free WiFi': Wifi,
  'Air Conditioning': Wind,
  'Flat Screen TV': Tv,
  'Smart TV': Tv,
  'Mini Fridge': Refrigerator,
  'Mini Bar': Refrigerator,
  'Bath Tub': Bath,
  'Premium View': Eye,
  'Room Service': UtensilsCrossed,
  '24/7 Room Service': UtensilsCrossed,
  '24-hour Room Service': UtensilsCrossed,
};

export default function RoomDetail() {
  const { slug } = useParams<{ slug: string }>();
  const room = rooms.find((r) => r.slug === slug);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!room) {
    return <Navigate to="/rooms" replace />;
  }

  const galleryImages = room.gallery.length > 0 ? room.gallery : [room.image];

  const relatedRooms = rooms
    .filter((r) => r.slug !== room.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={galleryImages[currentImage]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 content-max pb-8">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Rooms
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-2">
            {room.name}
          </h1>
          <p className="text-gold text-xl">
            From ₦{room.price.toLocaleString()}/night
          </p>
        </div>

        {/* Gallery Navigation */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-8 right-4 sm:right-8 flex items-center gap-2">
            <button
              onClick={() => setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center p-0"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5 text-gold" />
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % galleryImages.length)}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center p-0"
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5 text-gold" />
            </button>
          </div>
        )}
      </section>

      {/* Details */}
      <section className="section-padding bg-espresso-light">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl text-white mb-4">About This Room</h2>
              <p className="text-text-muted text-base mb-8 leading-relaxed">{room.description}</p>

              {/* Room Info */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-panel text-center py-4">
                  <Users className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">{room.maxGuests} Guests</p>
                </div>
                <div className="glass-panel text-center py-4">
                  <Bed className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">{room.bedType}</p>
                </div>
                <div className="glass-panel text-center py-4">
                  <Maximize className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">{room.size}</p>
                </div>
              </div>

              {/* Amenities */}
              <h3 className="font-display text-xl text-white mb-4">Room Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {room.features.map((feature) => {
                  const Icon = featureIcons[feature] || Check;
                  return (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-text-muted text-sm"
                    >
                      <Icon className="w-5 h-5 text-gold shrink-0" />
                      {feature}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="glass-panel">
                <h3 className="font-display text-xl text-white mb-4">Book This Room</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-text-muted text-xs block mb-2">Check-in Date</label>
                    <input type="date" className="glass-input" placeholder="Full name" aria-label="Full name" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs block mb-2">Check-out Date</label>
                    <input type="date" className="glass-input" placeholder="Email address" aria-label="Email address" />
                  </div>
                  <div>
                    <label className="text-text-muted text-xs block mb-2">Guests (Max {room.maxGuests})</label>
                    <select className="glass-input" title="Number of guests" aria-label="Number of guests">
                      {Array.from({ length: room.maxGuests }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-glass-border pt-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-muted text-sm">Price per night</span>
                    <span className="text-white text-sm">₦{room.price.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  to="/booking"
                  className="pill-button w-full text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rooms */}
      <section className="section-padding bg-espresso">
        <div className="content-max">
          <h2 className="font-display text-2xl sm:text-3xl text-white mb-8 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRooms.map((related) => (
              <Link
                key={related.slug}
                to={`/rooms/${related.slug}`}
                className="group block rounded-lg overflow-hidden bg-espresso-card border border-transparent hover:border-glass-border transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-white mb-1">{related.name}</h3>
                  <p className="text-gold text-sm">
                    From ₦{related.price.toLocaleString()}/night
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
