import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Bed, Maximize, ArrowRight } from 'lucide-react';
import { rooms } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

// Local interface definition mapped to match your database definitions exactly
interface CustomRoom {
  slug: string;
  name: string;
  image: string;
  price: number;
  description: string;
  bedType: string;
  size: string; // Fixed: Changed from number to string to align with your constants schemas
  capacity?: number;
}

export default function Rooms() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Cast the constants array safely to match our extended properties
  const typedRooms = rooms as CustomRoom[];

  useEffect(() => {
    // Smooth Header Intro Animation
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }

    // Room Cards Scroll Entry Logic
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll('.room-list-card');
      
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { 
            y: 50, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            // Clears transform properties post-animation to keep hover scaling perfectly fluid
            onComplete: () => {
              gsap.set(card, { clearProps: 'transform' });
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Premium Minimalist Header */}
      <div 
        ref={headerRef} 
        className="py-20 border-b border-neutral-200 bg-white text-center px-4"
      >
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-3">
          Luxury Accommodations
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-neutral-800 tracking-tight max-w-2xl mx-auto">
          Our Rooms & Suites
        </h1>
        <p className="mt-4 text-neutral-600 max-w-lg mx-auto text-sm md:text-base">
          Experience world-class comfort tailored to your lifestyle. Explore our handpicked premium spaces.
        </p>
      </div>

      {/* Rooms Showcase Grid */}
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {typedRooms.map((room) => (
            <div
              key={room.slug}
              className="room-list-card opacity-0 bg-white rounded-xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group"
              // Removed inline style here to completely fix the linter warning
            >
              {/* Card Image Wrapper */}
              <div className="relative overflow-hidden aspect-[4/3] bg-neutral-200">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide text-neutral-800 shadow-sm">
                  ₦{room.price.toLocaleString()} / night
                </div>
              </div>

              {/* Core Content Elements */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-serif text-neutral-800 group-hover:text-neutral-600 transition-colors duration-300">
                  {room.name}
                </h3>
                <p className="mt-2 text-neutral-600 text-xs leading-relaxed flex-grow line-clamp-2">
                  {room.description}
                </p>

                {/* Premium Layout Metadata Specs */}
                <div className="grid grid-cols-3 gap-2 border-t border-b border-neutral-100 py-4 my-4 text-neutral-500 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-neutral-400" />
                    <span>{room.capacity || 2} Guests</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <Bed className="w-4 h-4 text-neutral-400" />
                    <span className="capitalize">{room.bedType}</span>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Maximize className="w-4 h-4 text-neutral-400" />
                    <span>{room.size} m²</span>
                  </div>
                </div>

                {/* Primary CTA button */}
                <Link
                  to={`/rooms/${room.slug}`}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium transition-colors duration-200 group/btn"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}