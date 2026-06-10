import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Bed, Maximize, Check } from 'lucide-react';
import { rooms, getRoomWhatsAppLink } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function Rooms() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll('.room-list-card'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
            src="/images/hotel/exterior-day.jpg"
            alt="CityWest Hotel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-espresso/60" />
        </div>
        <div className="relative z-10 text-center content-max px-4 pt-20">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-text-muted text-lg">Find your perfect stay</p>
        </div>
      </section>

      {/* Room List */}
      <section ref={sectionRef} className="section-padding bg-espresso-light">
        <div className="content-max space-y-8">
          {rooms.map((room) => (
            <div
              key={room.slug}
              className="room-list-card grid grid-cols-1 lg:grid-cols-2 gap-6 bg-espresso-card rounded-xl overflow-hidden border border-transparent hover:border-glass-border transition-all duration-500"
            >
              {/* Image */}
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="font-display text-2xl sm:text-3xl text-white mb-3">{room.name}</h2>
                <p className="text-text-muted text-sm mb-4">{room.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-text-muted text-xs">
                    <Users className="w-4 h-4 text-gold" />
                    Max {room.maxGuests} guests
                  </span>
                  <span className="flex items-center gap-1.5 text-text-muted text-xs">
                    <Bed className="w-4 h-4 text-gold" />
                    {room.bedType}
                  </span>
                  <span className="flex items-center gap-1.5 text-text-muted text-xs">
                    <Maximize className="w-4 h-4 text-gold" />
                    {room.size}
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-1 text-text-muted text-xs"
                    >
                      <Check className="w-3 h-3 text-gold" />
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div>
                    <span className="font-display text-gold text-2xl">
                      ₦{room.price.toLocaleString()}
                    </span>
                    <span className="text-text-muted text-sm">/night</span>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to={`/rooms/${room.slug}`}
                      className="pill-button-outline text-sm py-2.5 px-5"
                    >
                      View Details
                    </Link>
                    <a
                      href={getRoomWhatsAppLink(room.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-button text-sm py-2.5 px-5"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
