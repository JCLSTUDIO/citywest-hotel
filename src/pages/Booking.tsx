import { useState, useEffect, useRef } from 'react';
import { rooms } from '@/lib/constants';

type RoomSlug = '2-space' | '1-bed' | '2-bed-2-space' | 'spacious' | 'open-terrace' | 'family-size' | '';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  idNumber: string;
  additionalNotes: string;
}

interface RoomBookingData {
  checkIn: string;
  checkOut: string;
  numGuests: string;
  roomSlug: RoomSlug;
}

const WHATSAPP_NUMBER = '2347048061861';

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<RoomSlug>('');
  const [minDate, setMinDate] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    idNumber: '',
    additionalNotes: '',
  });

  const [roomData, setRoomData] = useState<RoomBookingData>({
    checkIn: '',
    checkOut: '',
    numGuests: '',
    roomSlug: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  // 3D Tilt Effect (optimized with requestAnimationFrame)
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId: number | null = null;
    let nextStyle = { rotateX: 0, rotateY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      nextStyle = { rotateX, rotateY };
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setTiltStyle(nextStyle);
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      setTiltStyle({ rotateX: 0, rotateY: 0 });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      submitBooking();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = (): boolean => {
    if (currentStep === 1 && !roomData.checkIn) {
      alert('Please select a check-in date');
      return false;
    }

    if (currentStep === 2) {
      if (!roomData.checkOut || !roomData.numGuests) {
        alert('Please fill in all required fields');
        return false;
      }
    }

    if (currentStep === 3) {
      if (!selectedRoom) {
        alert('Please select a room');
        return false;
      }
    }

    if (currentStep === 4) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.idNumber) {
        alert('Please fill in all required fields');
        return false;
      }
    }

    return true;
  };

  const generateWhatsAppMessage = (): string => {
    const selectedRoomData = rooms.find(r => r.slug === selectedRoom);
    if (!selectedRoomData) return '';

    let message = `🏨 *ROOM BOOKING REQUEST* 🏨\n\n`;
    message += `*Guest:* ${formData.firstName} ${formData.lastName}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    message += `*ID/Passport:* ${formData.idNumber}\n\n`;

    message += `*Room Selection:* ${selectedRoomData.name}\n`;
    message += `*Check-in:* ${roomData.checkIn}\n`;
    message += `*Check-out:* ${roomData.checkOut}\n`;
    message += `*Number of Guests:* ${roomData.numGuests}\n`;
    message += `*Price per Night:* ₦${selectedRoomData.price.toLocaleString()}\n\n`;

    if (formData.additionalNotes) {
      message += `*Special Requests:* ${formData.additionalNotes}\n\n`;
    }

    message += `📅 *Booking Date:* ${new Date().toLocaleString()}\n`;
    message += `\nPlease confirm availability and final total cost. Thank you!`;

    return message;
  };

  const submitBooking = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setShowSuccess(true);
  };

  const getProgressPercentage = (): number => {
    if (showSuccess) return 100;
    return (currentStep / 4) * 100;
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-espresso pt-20 md:pt-32">
      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso-light to-espresso" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex justify-center items-start py-8 px-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          {!showSuccess && (
            <div className="mb-8 px-4">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-600 ease-out shadow-lg shadow-gold/50"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <div className="flex justify-between mt-6 px-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full transition-all ${
                        step < currentStep
                          ? 'bg-gold scale-125'
                          : step === currentStep
                            ? 'bg-gold ring-2 ring-gold ring-offset-2 ring-offset-espresso scale-125'
                            : 'bg-white/20'
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                        step <= currentStep ? 'text-gold' : 'text-white/40'
                      }`}
                    >
                      {['Dates', 'Details', 'Room', 'Info'][step - 1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Card */}
          <div
            ref={cardRef}
            className="backdrop-blur-2xl bg-white/5 border border-gold/30 rounded-3xl p-8 md:p-12 shadow-2xl transition-transform duration-100"
            style={{
              transform: `perspective(1000px) rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
            }}
          >
            {/* Header */}
            {!showSuccess && (
              <div className="text-center mb-10">
                <h1 className="font-display text-4xl md:text-5xl text-gold mb-3 drop-shadow-lg">
                  Book Your Stay
                </h1>
                <p className="text-text-muted text-sm tracking-widest uppercase">
                  Reserve your luxury room at CityWest Hotel
                </p>
              </div>
            )}

            {/* Step 1: Check-in Date */}
            {currentStep === 1 && !showSuccess && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={roomData.checkIn}
                    onChange={(e) => setRoomData({ ...roomData, checkIn: e.target.value })}
                    aria-label="Check-in Date"
                    className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                  />
                </div>
                <p className="text-text-muted text-sm text-center">Please select your arrival date</p>
              </div>
            )}

            {/* Step 2: Checkout Date & Guests */}
            {currentStep === 2 && !showSuccess && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={roomData.checkOut}
                      onChange={(e) => setRoomData({ ...roomData, checkOut: e.target.value })}
                      placeholder="Check-out Date"
                      aria-label="Check-out Date"
                      className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                      Number of Guests *
                    </label>
                    <select
                      value={roomData.numGuests}
                      onChange={(e) => setRoomData({ ...roomData, numGuests: e.target.value })}
                      aria-label="Number of Guests"
                      className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white focus:border-gold focus:bg-gold/10 transition-all"
                    >
                      <option value="">Select number of guests</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6+ Guests</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Select Room */}
            {currentStep === 3 && !showSuccess && (
              <div className="space-y-6">
                <p className="text-center text-text-muted text-sm mb-6">
                  Select the room that best suits your needs
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rooms.map((room) => (
                    <button
                      key={room.slug}
                      onClick={() => setSelectedRoom(room.slug as RoomSlug)}
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 text-left ${
                        selectedRoom === room.slug
                          ? 'border-gold bg-gold/10 shadow-lg shadow-gold/30'
                          : 'border-gold/20 bg-white/3 hover:border-gold/50 hover:bg-gold/5'
                      }`}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg text-gold mb-1">{room.name}</h3>
                        <p className="text-white font-bold text-xl mb-2">
                          ₦{room.price.toLocaleString()} <span className="text-text-muted text-sm font-normal">/night</span>
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-gold/10 text-gold px-2 py-1 rounded">{room.maxGuests} guests</span>
                          <span className="bg-gold/10 text-gold px-2 py-1 rounded">{room.bedType}</span>
                          <span className="bg-gold/10 text-gold px-2 py-1 rounded">{room.size}</span>
                        </div>
                      </div>
                      {selectedRoom === room.slug && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-espresso font-bold">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Personal Information */}
            {currentStep === 4 && !showSuccess && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 (XXX) XXX-XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                    ID / Passport Number *
                  </label>
                  <input
                    type="text"
                    placeholder="ID or Passport Number"
                    value={formData.idNumber}
                    onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                    className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gold uppercase tracking-wider font-semibold mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    placeholder="Any special requests or notes..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full bg-white/5 border border-gold/30 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-gold focus:bg-gold/10 transition-all min-h-24 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Success Screen */}
            {showSuccess && (
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-6 bg-green-500/10 border-2 border-green-500/50 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-5xl">✓</span>
                </div>
                <h2 className="font-display text-3xl text-gold mb-4">Booking Confirmed!</h2>
                <p className="text-text-muted mb-8 leading-relaxed">
                  Your reservation has been successfully submitted. A confirmation message has been sent via WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedRoom('');
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      address: '',
                      city: '',
                      country: '',
                      idNumber: '',
                      additionalNotes: '',
                    });
                    setRoomData({
                      checkIn: '',
                      checkOut: '',
                      numGuests: '',
                      roomSlug: '',
                    });
                    setShowSuccess(false);
                  }}
                  className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-espresso font-bold py-3 px-8 rounded-xl transition-all"
                >
                  <span>Make Another Booking</span>
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            {!showSuccess && (
              <div className="flex gap-4 mt-10">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="flex-1 px-6 py-3 border-2 border-gold/50 text-gold rounded-xl font-semibold uppercase tracking-wider hover:bg-gold/10 transition-all"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  className="flex-1 px-6 py-3 font-semibold uppercase tracking-wider rounded-xl transition-all transform bg-gold text-espresso hover:bg-gold-light hover:scale-105 hover:shadow-lg hover:shadow-gold/50"
                >
                  {currentStep === 4 ? 'Complete Booking' : 'Continue'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
