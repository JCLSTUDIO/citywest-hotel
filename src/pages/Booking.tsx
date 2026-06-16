import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { rooms } from '@/lib/constants';

interface LocationState {
  roomSlug?: string;
  checkIn?: string;
  checkOut?: string;
  numGuests?: string;
}

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedState = (location.state as LocationState) || {};

  // Form Step Tracker
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Booking Reference States (Pre-filled from state router)
  const [selectedRoomSlug, setSelectedRoomSlug] = useState(receivedState.roomSlug || '');
  const [checkIn, setCheckIn] = useState(receivedState.checkIn || '');
  const [checkOut, setCheckOut] = useState(receivedState.checkOut || '');
  const [guests, setGuests] = useState(receivedState.numGuests || '1');

  // Step 2: Personal Identification States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Find active room metadata
  const activeRoom = rooms.find((r) => r.slug === selectedRoomSlug);

  // Sync state if user navigates back and forth or entry conditions change
  useEffect(() => {
    if (receivedState.roomSlug) setSelectedRoomSlug(receivedState.roomSlug);
    if (receivedState.checkIn) setCheckIn(receivedState.checkIn);
    if (receivedState.checkOut) setCheckOut(receivedState.checkOut);
    if (receivedState.numGuests) setGuests(receivedState.numGuests);
  }, [location.state]);

  // Live dynamic calculations
  const calculateStayDetails = () => {
    if (!checkIn || !checkOut || !activeRoom) return { days: 0, total: 0 };
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      days: days > 0 ? days : 0,
      total: days > 0 ? days * activeRoom.price : 0,
    };
  };

  const stayStats = calculateStayDetails();

  // Validate current step before advancing
  const isStepValid = () => {
    if (currentStep === 1) {
      return selectedRoomSlug && checkIn && checkOut && stayStats.days > 0;
    }
    if (currentStep === 2) {
      return fullName.trim() !== '' && email.trim() !== '' && phone.trim() !== '';
    }
    return true;
  };

  // Step Navigators
  const nextStep = () => isStepValid() && setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // WhatsApp Dispatch Construction & Redirect
  const handleFinalizeBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRoom) return;

    const businessPhoneNumber = "2347048061861"; // Replace with your active business WhatsApp number
    
    const messageTemplate = `*NEW RESERVATION REQUEST*
----------------------------------
*Guest Details:*
• Name: ${fullName}
• Email: ${email}
• Phone: ${phone}

*Accommodation Details:*
• Room: ${activeRoom.name}
• Check-In: ${checkIn}
• Check-Out: ${checkOut}
• Duration: ${stayStats.days} Night(s)
• Guests: ${guests} Allocation

*Financial Statement:*
• Rate: ₦${activeRoom.price.toLocaleString()} / night
• Estimated Total: ₦${stayStats.total.toLocaleString()}

${specialRequests ? `*Special Notes:*\n${specialRequests}` : ''}
----------------------------------
Please confirm availability to complete payment processing.`;

    const encodedMessage = encodeURIComponent(messageTemplate);
    window.open(`https://wa.me/${businessPhoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb back link */}
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-800 transition-colors duration-200 mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Return to Previous Page
        </button>

        {/* Multi-Step Horizontal Visual Progress Bar Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-md mx-auto relative">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  currentStep >= step ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {currentStep > step ? '✓' : step}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium mt-2">
                  {step === 1 ? 'Details' : step === 2 ? 'Guest Info' : 'Confirm'}
                </span>
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-neutral-200 -z-0">
              <div 
                className="h-full bg-neutral-950 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Master Panel Structure Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* STEP CONTENT SWITCHBOARD */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-[400px]">
            <form onSubmit={handleFinalizeBooking} className="space-y-6 flex-grow">
              
              {/* STEP 1: RESCHEDULING & SELECTION VERIFICATION */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-serif text-neutral-800 mb-1">Verify Reservation Options</h2>
                    <p className="text-xs text-neutral-500">Confirm your timing thresholds and specific suite selection parameters.</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label htmlFor="suite-selection" className="text-neutral-700 font-medium text-xs block mb-1.5">Selected Suite Accommodations</label>
                      <select 
                        id="suite-selection"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors"
                        value={selectedRoomSlug}
                        onChange={(e) => setSelectedRoomSlug(e.target.value)}
                      >
                        <option value="">Choose a room...</option>
                        {rooms.map((r) => (
                          <option key={r.slug} value={r.slug}>{r.name} — ₦{r.price.toLocaleString()} / night</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="check-in-input" className="text-neutral-700 font-medium text-xs block mb-1.5">Check-In Date</label>
                        <input 
                          id="check-in-input"
                          type="date" 
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="check-out-input" className="text-neutral-700 font-medium text-xs block mb-1.5">Check-Out Date</label>
                        <input 
                          id="check-out-input"
                          type="date" 
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="guest-distribution" className="text-neutral-700 font-medium text-xs block mb-1.5">Guest Count Distribution</label>
                      <select 
                        id="guest-distribution"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num.toString()}>{num} Space Occupant{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PERSONAL BIO DETAILS COLLECTION */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-serif text-neutral-800 mb-1">Primary Guest Credentials</h2>
                    <p className="text-xs text-neutral-500">Provide accurate validation metadata so our concierge team can catalog your identity.</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div>
                      <label htmlFor="full-legal-name" className="text-neutral-700 font-medium text-xs block mb-1.5">Full Legal Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                        <input 
                          id="full-legal-name"
                          type="text" 
                          placeholder="John Doe"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="secure-email" className="text-neutral-700 font-medium text-xs block mb-1.5">Secure Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                          <input 
                            id="secure-email"
                            type="email" 
                            placeholder="johndoe@example.com"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="mobile-contact" className="text-neutral-700 font-medium text-xs block mb-1.5">Mobile Phone Contact</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                          <input 
                            id="mobile-contact"
                            type="tel" 
                            placeholder="+234..."
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-10 pr-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="custom-provisions" className="text-neutral-700 font-medium text-xs block mb-1.5">Custom Structural Provisions / Notes</label>
                      <textarea 
                        id="custom-provisions"
                        rows={3}
                        placeholder="Dietary requests, bedding preferences, late check-in notice..."
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-neutral-900 transition-colors resize-none"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PRE-DISPATCH STATEMENT MATRIX SUMMARY */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-xl font-serif text-neutral-800 mb-1">Final Structural Summary Matrix</h2>
                    <p className="text-xs text-neutral-500">Analyze details carefully before structural handover processing to WhatsApp dispatcher.</p>
                  </div>

                  <div className="border border-neutral-200 rounded-xl divide-y divide-neutral-100 overflow-hidden text-xs bg-neutral-50">
                    <div className="p-4 grid grid-cols-2 gap-2">
                      <span className="text-neutral-500">Primary Registrant:</span>
                      <span className="font-medium text-neutral-800 text-right">{fullName}</span>
                      <span className="text-neutral-500">Contact Vector:</span>
                      <span className="font-medium text-neutral-800 text-right">{phone}</span>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-2">
                      <span className="text-neutral-500">Suite Choice:</span>
                      <span className="font-medium text-neutral-800 text-right">{activeRoom?.name}</span>
                      <span className="text-neutral-500">Duration Parameters:</span>
                      <span className="font-medium text-neutral-800 text-right">{checkIn} to {checkOut} ({stayStats.days} nights)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-neutral-900 text-neutral-100 rounded-xl p-4">
                    <ShieldCheck className="w-5 h-5 text-neutral-300 flex-shrink-0" />
                    <p className="text-[11px] leading-relaxed text-neutral-300">
                      Submitting will redirect you to WhatsApp secure routing channels where data details are parsed to initiate immediate booking confirmations.
                    </p>
                  </div>
                </div>
              )}

              {/* ACTION FOOTER BUTTONS */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100 mt-8">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`inline-flex items-center gap-1.5 py-2.5 px-5 rounded-lg text-xs font-medium transition-all ${
                      isStepValid() 
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800' 
                        : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    Continue <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 py-2.5 px-6 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    <span>Finalize via WhatsApp</span>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* RIGHT SIDEBAR: ORDER STATEMENTS BOX */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm h-fit space-y-4">
            <h3 className="text-sm font-serif text-neutral-800 tracking-tight border-b border-neutral-100 pb-3">
              Statement Overview
            </h3>

            {activeRoom ? (
              <div className="space-y-4 text-xs">
                <div className="aspect-[16/10] bg-neutral-100 rounded-lg overflow-hidden">
                  <img src={activeRoom.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-neutral-800 text-sm">{activeRoom.name}</h4>
                  <span className="text-neutral-500 text-[11px]">₦{activeRoom.price.toLocaleString()} / night</span>
                </div>

                {stayStats.days > 0 && (
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100/70 space-y-2 text-[11px]">
                    <div className="flex justify-between text-neutral-500">
                      <span>Nights Count</span>
                      <span>{stayStats.days} nights</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Occupants Allocated</span>
                      <span>{guests} guest{parseInt(guests) > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between border-t border-neutral-200/60 pt-2 font-semibold text-neutral-800 text-xs">
                      <span>Grand Total</span>
                      <span className="text-neutral-950 font-bold">₦{stayStats.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic py-4 text-center">
                Select suite components to visualize statements dynamically.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}