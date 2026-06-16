import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Waves, Dumbbell, Wifi, Car, VolumeX, ConciergeBell,
  Wind, Shield, UtensilsCrossed, Shirt, Star, ChevronLeft,
  ChevronRight, ArrowRight
} from 'lucide-react';
import { rooms, amenities, testimonials } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const amenityIcons: Record<string, React.ElementType> = {
  Waves, Dumbbell, Wifi, Car, VolumeX, ConciergeBell, Wind, Shield, UtensilsCrossed, Shirt,
};

/* ─── Hero Section ─── */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      // Changed to fromTo to prevent text from locking at opacity 0
      gsap.fromTo(
        textRef.current!.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 6.5,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hotel/exterior-day.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-espresso/50" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center content-max px-4 pt-20">
        <p className="text-gold text-xs sm:text-sm uppercase tracking-[0.2em] mb-4">
          Where Comfort Meets Elegance
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
          Experience Luxury in<br />the Heart of Ikenne
        </h1>
        <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Premium accommodations, world-class dining, and unforgettable moments in Ogun State
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/booking"
            className="pill-button"
          >
            Book Your Stay
          </Link>
          <Link to="/rooms" className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm">
            Explore Rooms <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Glass Booking Widget */}
        <div className="mt-12 glass-panel max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-text-muted text-xs block mb-2">Check-in</label>
              <input type="date" className="glass-input" placeholder="Check-in date" />
            </div>
            <div>
              <label className="text-text-muted text-xs block mb-2">Check-out</label>
              <input type="date" className="glass-input" placeholder="Check-out date" />
            </div>
            <div className="flex items-end">
              <Link
                to="/booking"
                className="pill-button w-full text-center"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-px h-8 bg-gold/50 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold" />
        </div>
      </div>
    </section>
  );
}

/* ─── Rooms Preview Section ─── */
function RoomsPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // FIX: Using fromTo explicit targets solves the double-initialization blank space bug
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.room-card'),
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-espresso-light">
      <div className="content-max">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">Our Rooms</h2>
          <p className="text-text-muted text-base">Designed for your comfort</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Link
              key={room.slug}
              to={`/rooms/${room.slug}`}
              className="room-card group block rounded-lg overflow-hidden bg-espresso-card border border-transparent hover:border-glass-border transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-white mb-2">{room.name}</h3>
                <p className="text-text-muted text-sm line-clamp-2 mb-3">{room.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gold text-sm font-medium">
                    From ₦{room.price.toLocaleString()}/night
                  </span>
                  <span className="text-gold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/rooms" className="pill-button-outline">
            View All Rooms
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Dining Preview Section ─── */
function DiningPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Changed to fromTo to guarantee safety on route changes
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.dining-item'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-cream">
      <div className="content-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-espresso mb-4">
              Dining Experience
            </h2>
            <p className="text-espresso/70 text-base mb-6">
              Savor local and international cuisine crafted by our expert chefs. From traditional Nigerian
              delicacies to continental favorites, every meal is a culinary journey.
            </p>
            <Link to="/dining" className="pill-button">
              Explore Dining
            </Link>
          </div>

          <div className="space-y-6">
            <div className="dining-item relative rounded-xl overflow-hidden aspect-video">
              <img
                src="/images/dining/dining-restaurant.jpg"
                alt="Main Restaurant"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-panel py-3 px-4">
                  <h3 className="font-display text-white text-lg">The Garden Restaurant</h3>
                  <p className="text-text-muted text-xs">Open 7AM - 10PM</p>
                </div>
              </div>
            </div>

            <div className="dining-item relative rounded-xl overflow-hidden aspect-video">
              <img
                src="/images/dining/dining-bar.jpg"
                alt="Bar Lounge"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-panel py-3 px-4">
                  <h3 className="font-display text-white text-lg">The Gold Lounge</h3>
                  <p className="text-text-muted text-xs">Open 12PM - 12AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Amenities Section ─── */
function AmenitiesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Changed to fromTo to guarantee safety on route changes
      gsap.fromTo(
        sectionRef.current!.querySelectorAll('.amenity-card'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-espresso relative overflow-hidden">
      {/* Marquee Background */}
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden opacity-20">
        <div className="flex animate-marquee whitespace-nowrap w-max">
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
          <span className="font-display text-gold text-[16vw] min-w-max px-4">CITYWEST HOTEL</span>
        </div>
      </div>

      <div className="content-max relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            World-Class Amenities
          </h2>
          <p className="text-text-muted text-base">Everything you need for a perfect stay</p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
        >
          {amenities.map((amenity) => {
            const Icon = amenityIcons[amenity.icon] || Shield;
            return (
              <div
                key={amenity.name}
                className="amenity-card glass-panel min-w-[260px] w-[260px] snap-start flex-shrink-0"
              >
                <Icon className="w-10 h-10 text-gold mb-4" />
                <h3 className="font-body text-lg text-white font-medium mb-2">{amenity.name}</h3>
                <p className="text-text-muted text-sm">{amenity.description}</p>
                {amenity.details && (
                  <p className="text-gold text-xs mt-3">{amenity.details}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/amenities" className="pill-button-outline">
            View All Amenities
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ─── */
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isDragging]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      } else {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    }
    setIsDragging(false);
  };

  const t = testimonials[current];

  return (
    <section className="section-padding bg-espresso-light">
      <div className="content-max">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            What Our Guests Say
          </h2>
        </div>

        <div
          className="max-w-4xl mx-auto cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div className="glass-panel text-center py-12 px-6 sm:px-12 min-h-[280px] flex flex-col items-center justify-center">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>

            {/* Quote */}
            <p className="font-display text-xl sm:text-2xl text-white/90 mb-6 leading-relaxed">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-espresso text-sm font-bold"
                style={{ backgroundColor: t.color }}
              >
                {t.initials}
              </div>
              <div className="text-left">
                <p className="text-gold text-sm font-medium">{t.name}</p>
                <p className="text-text-muted text-xs">{t.location}</p>
              </div>
            </div>

            {t.roomStayed && (
              <p className="text-text-muted text-xs mt-3">Stayed in {t.roomStayed}</p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center p-0 hover:border-gold/40"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gold" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-gold w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full glass-panel flex items-center justify-center p-0 hover:border-gold/40"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [10, 50, 1000, 4.9];
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          targets.forEach((target, i) => {
            const duration = 2000;
            const startTime = Date.now();
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCounts((prev) => {
                const next = [...prev];
                next[i] = Math.round(target * eased * 10) / 10;
                return next;
              });
              if (progress < 1) requestAnimationFrame(animate);
            };
            setTimeout(() => requestAnimationFrame(animate), i * 200);
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: counts[0], suffix: '+', label: 'Years of Excellence' },
    { value: counts[1], suffix: '+', label: 'Luxury Rooms' },
    { value: counts[2], suffix: '+', label: 'Happy Guests' },
    { value: counts[3], suffix: '', label: 'Guest Rating' },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-espresso">
      <div className="content-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-4xl sm:text-5xl md:text-6xl text-gold mb-2">
                {stat.value % 1 === 0 ? Math.round(stat.value) : stat.value}
                {stat.suffix}
              </p>
              <p className="text-text-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-espresso relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
      <div className="content-max relative z-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Ready to Experience CityWest?
        </h2>
        <p className="text-text-muted text-base max-w-xl mx-auto mb-8">
          Book your stay today and discover why CityWest Hotel is Ikenne&apos;s premier luxury destination.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/booking"
            className="pill-button glass-glow"
          >
            Book Your Stay
          </Link>
          <Link to="/contact" className="pill-button-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <RoomsPreview />
      <DiningPreview />
      <AmenitiesSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </>
  );
}