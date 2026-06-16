import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Users, Bed, Maximize, Check } from 'lucide-react';
import { rooms } from '@/lib/constants';

// Local interface definition to eliminate missing property errors on the Room type
interface CustomRoom {
  slug: string;
  name: string;
  image: string;
  price: number;
  description: string;
  bedType: string;
  size: number;
  images?: string[];
  capacity?: number;
  amenities?: string[];
}

export default function RoomDetails() {
  const { slug } = useParams<{ slug: string }>();
  
  // Safe type assertion to bind our custom interface properties safely
  const room = rooms.find((r) => r.slug === slug) as CustomRoom | undefined;

  // Core Sidebar Input States
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numGuests, setNumGuests] = useState('1');
  const [currentImage, setCurrentImage] = useState(0);

  // Guard clause if the room slug doesn't match data
  if (!room) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-serif text-neutral-800 mb-4">Room Not Found</h2>
        <Link to="/rooms" className="text-sm font-medium text-neutral-600 underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back to accommodations
        </Link>
      </div>
    );
  }

  // Live dynamic calculation for days and total cost
  const calculateLiveTotal = () => {
    if (!checkIn || !checkOut) return { days: 0, total: 0 };
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      days: days > 0 ? days : 0,
      total: days > 0 ? days * room.price : 0
    };
  };

  const liveCalc = calculateLiveTotal();

  // Array fallback for handling secondary gallery images safely
  const images = room.images || [room.image];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans pb-24">
      {/* Top Header Navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link 
          to="/rooms" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-800 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Rooms
        </Link>
      </div>

      {/* Main Structural Detail Layout Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
        
        {/* LEFT COLUMN: Media Showcase & Content Overviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Display Gallery Frame */}
          <div className="space-y-4">
            <div className="relative aspect-[16/10] bg-neutral-200 rounded-2xl overflow-hidden shadow-sm">
              <img
                src={images[currentImage]}
                alt={`${room.name} view`}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            
            {/* Gallery Thumbnail Strip (Only shows if multiple images exist) */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    aria-label={`View room gallery image ${index + 1}`}
                    className={`relative w-24 aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      currentImage === index ? 'border-neutral-900 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Heading Description Blocks */}
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-neutral-800 tracking-tight">{room.name}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-neutral-500 mt-4 border-b border-neutral-200 pb-6">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neutral-400" />
                <span>Up to {room.capacity || 2} Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-neutral-400" />
                <span className="capitalize">{room.bedType} Bedding</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="w-4 h-4 text-neutral-400" />
                <span>{room.size} m² of Luxury Space</span>
              </div>
            </div>
          </div>

          {/* Deep Narrative Description Paragraph */}
          <div className="space-y-4">
            <h2 className="text-lg font-serif text-neutral-800">Room Overview</h2>
            <p className="text-neutral-600 text-sm leading-relaxed whitespace-pre-line">
              {room.description}
            </p>
          </div>

          {/* Premium Features / Structural Amenities Checklists */}
          {room.amenities && (
            <div className="space-y-4 border-t border-neutral-200 pt-8">
              <h2 className="text-lg font-serif text-neutral-800">Amenities & Services</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
                {room.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-2.5 text-neutral-600 text-sm">
                    <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-neutral-700" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Reservation Sidebar Form Panel */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">Rate</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif text-neutral-800">₦{room.price.toLocaleString()}</span>
                <span className="text-neutral-500 text-xs">/ night</span>
              </div>
            </div>

            {/* Selection Inputs Area */}
            <div className="space-y-4">
              <div>
                <label className="text-neutral-700 font-medium text-xs block mb-1.5">Check-in Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} 
                    aria-label="Check-in Date"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-700 font-medium text-xs block mb-1.5">Check-out Date</label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]} 
                    aria-label="Check-out Date"
                  />
                </div>
              </div>

              <div>
                <label className="text-neutral-700 font-medium text-xs block mb-1.5">Guests Allocation</label>
                <select 
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors appearance-none" 
                  value={numGuests}
                  onChange={(e) => setNumGuests(e.target.value)}
                  aria-label="Number of guests"
                >
                  {Array.from({ length: room.capacity || 4 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Pricing Summary Block */}
            {liveCalc.days > 0 && (
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 space-y-2.5 text-xs transition-all duration-300">
                <div className="flex items-center justify-between text-neutral-500">
                  <span>Base Pricing Multiplier</span>
                  <span>₦{room.price.toLocaleString()} × {liveCalc.days} nights</span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200/60 pt-2.5 mt-1">
                  <span className="font-semibold text-neutral-800">Estimated Statement Total</span>
                  <span className="font-bold text-neutral-950 text-sm">₦{liveCalc.total.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Core Action Button Route Link */}
            <Link
              to="/booking"
              state={{ 
                roomSlug: room.slug,
                checkIn,
                checkOut,
                numGuests
              }}
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium transition-colors duration-200 text-center shadow-sm"
            >
              Book This Space
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}