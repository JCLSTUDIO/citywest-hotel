import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Dining() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll('.dining-section'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
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
            src="/images/dining/dining-restaurant.jpg"
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-espresso/60" />
        </div>
        <div className="relative z-10 text-center content-max px-4 pt-20">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">Dining</h1>
          <p className="text-text-muted text-lg">Culinary excellence in every bite</p>
        </div>
      </section>

      {/* Content */}
      <div ref={sectionRef}>
        {/* Main Restaurant */}
        <section className="section-padding bg-cream dining-section">
          <div className="content-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="/images/dining/dining-restaurant.jpg"
                  alt="The Garden Restaurant"
                  className="rounded-xl w-full aspect-video object-cover"
                  loading="lazy"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-gold text-sm uppercase tracking-wider mb-2">Fine Dining</p>
                <h2 className="font-display text-3xl sm:text-4xl text-espresso mb-4">
                  The Garden Restaurant
                </h2>
                <p className="text-espresso/70 text-base mb-6 leading-relaxed">
                  Experience an exquisite culinary journey at The Garden Restaurant. Our expert chefs
                  blend traditional Nigerian flavors with international techniques to create memorable
                  dishes. From freshly caught seafood to locally sourced organic produce, every plate
                  tells a story of quality and passion.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-espresso/70 text-sm">
                    <Clock className="w-5 h-5 text-gold" />
                    Open 7:00 AM - 10:00 PM Daily
                  </div>
                  <div className="flex items-center gap-3 text-espresso/70 text-sm">
                    <MapPin className="w-5 h-5 text-gold" />
                    Ground Floor, Main Building
                  </div>
                  <div className="flex items-center gap-3 text-espresso/70 text-sm">
                    <Phone className="w-5 h-5 text-gold" />
                    Ext. 201 for reservations
                  </div>
                </div>
                <Link
                  to="/booking"
                  className="pill-button"
                >
                  Make a Reservation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bar Lounge */}
        <section className="section-padding bg-espresso dining-section">
          <div className="content-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gold text-sm uppercase tracking-wider mb-2">Drinks & Cocktails</p>
                <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
                  The Gold Lounge
                </h2>
                <p className="text-text-muted text-base mb-6 leading-relaxed">
                  Unwind in style at The Gold Lounge, our sophisticated bar featuring premium spirits,
                  handcrafted cocktails, and an extensive wine selection. The warm ambiance, soft
                  lighting, and live weekend music create the perfect atmosphere for evening relaxation
                  or celebratory toasts.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-text-muted text-sm">
                    <Clock className="w-5 h-5 text-gold" />
                    Open 12:00 PM - 12:00 AM Daily
                  </div>
                  <div className="flex items-center gap-3 text-text-muted text-sm">
                    <MapPin className="w-5 h-5 text-gold" />
                    First Floor, West Wing
                  </div>
                </div>
                <div className="glass-panel mb-6">
                  <h3 className="font-display text-white text-lg mb-3">Signature Cocktails</h3>
                  <ul className="space-y-2 text-text-muted text-sm">
                    <li className="flex items-center justify-between">
                      <span>CityWest Sunset</span>
                      <span className="text-gold">₦5,500</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Ikenne Breeze</span>
                      <span className="text-gold">₦4,800</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Golden Hour</span>
                      <span className="text-gold">₦6,200</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/booking"
                  className="pill-button-outline"
                >
                  Reserve a Table
                </Link>
              </div>
              <div>
                <img
                  src="/images/dining/dining-bar.jpg"
                  alt="The Gold Lounge"
                  className="rounded-xl w-full aspect-video object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Food Gallery */}
        <section className="section-padding bg-espresso-light dining-section">
          <div className="content-max">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">Culinary Highlights</h2>
              <p className="text-text-muted text-base">A taste of what awaits you</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/dining/dining-food.jpg"
                  alt="Signature dish"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/dining/dining-restaurant.jpg"
                  alt="Restaurant interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/dining/dining-bar.jpg"
                  alt="Bar atmosphere"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
