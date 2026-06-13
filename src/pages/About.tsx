import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Calendar, Star } from 'lucide-react';
import { teamMembers } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll('.about-animate'), {
        y: 40,
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

  const stats = [
    { icon: Calendar, value: '10+', label: 'Years of Excellence' },
    { icon: Users, value: '50+', label: 'Luxury Rooms' },
    { icon: Star, value: '1000+', label: 'Happy Guests' },
    { icon: Award, value: '4.9', label: 'Guest Rating' },
  ];

  return (
    <>
      {/* Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-espresso pt-20">
        <div className="text-center content-max px-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">About Us</h1>
          <p className="text-text-muted text-lg">Our story of hospitality excellence</p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-cream">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-espresso mb-6">
                A Legacy of Luxury in Ikenne
              </h2>
              <div className="space-y-4 text-espresso/70 text-base leading-relaxed">
                <p>
                  Founded in 2015, CityWest Hotel emerged from a vision to bring world-class hospitality
                  to Ikenne, Ogun State. What began as a modest boutique hotel has grown into one of
                  Nigeria&apos;s premier luxury destinations, consistently setting new standards for
                  comfort, service, and elegance.
                </p>
                <p>
                  Our name reflects our commitment to bridging urban sophistication with the warm,
                  welcoming spirit of Western Nigeria. Every detail of CityWest Hotel — from our
                  meticulously designed rooms to our award-winning restaurant — embodies this philosophy.
                </p>
                <p>
                  Over the years, we have had the privilege of hosting dignitaries, business leaders,
                  families, and travelers from across the globe. Each guest becomes part of our story,
                  and we take pride in creating memories that last a lifetime.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <img
                src="/images/hotel/exterior-day.jpg"
                alt="CityWest Hotel"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-espresso">
        <div className="content-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="about-animate text-center">
                <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <p className="font-display text-4xl sm:text-5xl text-gold mb-1">{stat.value}</p>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={sectionRef} className="section-padding bg-espresso-light">
        <div className="content-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">Meet Our Team</h2>
            <p className="text-text-muted text-base">The people behind your perfect stay</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="about-animate text-center">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 flex items-center justify-center text-espresso font-bold text-lg"
                  style={{ backgroundColor: member.color }}
                  role="img"
                  aria-label={`${member.name} profile`}
                >
                  {member.initials}
                </div>
                <h3 className="text-white text-sm font-medium">{member.name}</h3>
                <p className="text-text-muted text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
