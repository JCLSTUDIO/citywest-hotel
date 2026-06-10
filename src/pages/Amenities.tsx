import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Waves, Dumbbell, Wifi, Car, VolumeX, ConciergeBell,
  Wind, Shield, UtensilsCrossed, Shirt, Clock
} from 'lucide-react';
import { amenities } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Waves, Dumbbell, Wifi, Car, VolumeX, ConciergeBell, Wind, Shield, UtensilsCrossed, Shirt,
};

const amenityImages: Record<string, string> = {
  'Swimming Pool': '/images/amenities/amenity-pool.jpg',
  'Gym': '/images/amenities/amenity-gym.jpg',
  'Restaurant & Bar': '/images/dining/dining-restaurant.jpg',
  'Free WiFi': '/images/gallery/gallery-lobby.jpg',
  'Free Parking': '/images/gallery/gallery-exterior.jpg',
  'Security': '/images/amenities/amenity-reception.jpg',
  'Air Conditioning': '/images/rooms/room-spacious.jpg',
  'Room Service': '/images/dining/dining-food.jpg',
  'Laundry Service': '/images/gallery/gallery-detail.jpg',
  'No Noise Policy': '/images/rooms/room-1bed.jpg',
};

export default function Amenities() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll('.amenity-grid-card'), {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Header */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/amenities/amenity-pool.jpg"
            alt="Swimming Pool"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-espresso/60" />
        </div>
        <div className="relative z-10 text-center content-max px-4 pt-20">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            Amenities & Facilities
          </h1>
          <p className="text-text-muted text-lg">Everything for your comfort and convenience</p>
        </div>
      </section>

      {/* Pool Highlight */}
      <section className="section-padding bg-espresso">
        <div className="content-max">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/images/amenities/amenity-pool.jpg"
              alt="Swimming Pool"
              className="w-full aspect-[21/9] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <div className="glass-panel max-w-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Waves className="w-8 h-8 text-gold" />
                  <h2 className="font-display text-2xl text-white">Swimming Pool</h2>
                </div>
                <p className="text-text-muted text-sm mb-3">
                  Our resort-style pool is the perfect place to relax and unwind. At 7ft × 47ft,
                  it accommodates both leisurely swimmers and those looking for exercise.
                </p>
                <div className="flex items-center gap-4 text-text-muted text-xs">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gold" />
                    Open 6AM - 9PM
                  </span>
                  <span>Size: 7ft × 47ft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenity Grid */}
      <section ref={sectionRef} className="section-padding bg-espresso-light">
        <div className="content-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((amenity) => {
              const Icon = iconMap[amenity.icon] || Shield;
              const image = amenityImages[amenity.name] || '/images/hotel/exterior-day.jpg';
              return (
                <div
                  key={amenity.name}
                  className="amenity-grid-card group relative rounded-xl overflow-hidden aspect-[16/10]"
                >
                  <img
                    src={image}
                    alt={amenity.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="glass-panel py-3 px-4">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon className="w-5 h-5 text-gold" />
                        <h3 className="font-display text-lg text-white">{amenity.name}</h3>
                      </div>
                      <p className="text-text-muted text-xs">{amenity.description}</p>
                      {amenity.details && (
                        <p className="text-gold text-xs mt-1.5">{amenity.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
