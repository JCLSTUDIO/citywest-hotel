export const WHATSAPP_NUMBER = '2347048061861';
export const PHONE_NUMBER = '+2347048061861';
export const EMAIL = 'info@citywesthotel.com';
export const INSTAGRAM = 'https://instagram.com/citywesthotel';
export const HOTEL_NAME = 'CityWest Hotel';
export const TAGLINE = 'Where Comfort Meets Elegance';
export const LOCATION = 'Ikenne, Ogun State, Nigeria';

export const getWhatsAppLink = (message?: string) => {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return `${base}?text=${encodeURIComponent(`Hi ${HOTEL_NAME}, I'm interested in booking a room.`)}`;
};

export const getRoomWhatsAppLink = (roomName: string, guests?: number, checkIn?: string, checkOut?: string) => {
  let message = `Hi ${HOTEL_NAME},\n\nI'd like to book the ${roomName}.`;
  if (guests) message += `\nGuests: ${guests}`;
  if (checkIn) message += `\nCheck-in: ${checkIn}`;
  if (checkOut) message += `\nCheck-out: ${checkOut}`;
  message += `\n\nPlease confirm availability and total cost. Thank you!`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export interface Room {
  slug: string;
  name: string;
  price: number;
  maxGuests: number;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
  size: string;
  bedType: string;
}

export const rooms: Room[] = [
  {
    slug: '2-space',
    name: '2-Space Room',
    price: 50000,
    maxGuests: 2,
    description: 'A compact and efficient room designed for solo travelers or couples. Features modern furnishings, a comfortable workspace, and all essential amenities for a pleasant stay.',
    image: '/images/rooms/room-2space.jpg',
    gallery: ['/images/rooms/room-2space.jpg'],
    features: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Flat Screen TV', 'Mini Fridge'],
    size: '25 sqm',
    bedType: '2 Single Beds',
  },
  {
    slug: '1-bed',
    name: '1-Bed Room',
    price: 70000,
    maxGuests: 3,
    description: 'Our standard comfort room featuring a plush queen bed, elegant decor, and a serene atmosphere. Perfect for business travelers or couples seeking a relaxing retreat.',
    image: '/images/rooms/room-1bed.jpg',
    gallery: ['/images/rooms/room-1bed.jpg'],
    features: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Flat Screen TV', 'Mini Fridge', 'City View'],
    size: '32 sqm',
    bedType: '1 Queen Bed',
  },
  {
    slug: '2-bed-2-space',
    name: '2-Bed 2-Space',
    price: 90000,
    maxGuests: 5,
    description: 'Spacious accommodation with two queen beds and extra living space. Ideal for families or groups of friends traveling together. Features a cozy seating area and ample storage.',
    image: '/images/rooms/room-2bed.jpg',
    gallery: ['/images/rooms/room-2bed.jpg'],
    features: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Flat Screen TV', 'Mini Fridge', 'Living Area', 'Work Desk'],
    size: '45 sqm',
    bedType: '2 Queen Beds',
  },
  {
    slug: 'spacious',
    name: 'Spacious Room',
    price: 120000,
    maxGuests: 3,
    description: 'An expansive luxury suite with a separate living area, premium furnishings, and stunning views. Experience elevated comfort with our spacious room designed for discerning guests.',
    image: '/images/rooms/room-spacious.jpg',
    gallery: ['/images/rooms/room-spacious.jpg'],
    features: ['Free WiFi', 'Air Conditioning', 'Room Service', 'Smart TV', 'Mini Bar', 'Living Room', 'Premium View', 'Bath Tub'],
    size: '55 sqm',
    bedType: '1 King Bed',
  },
  {
    slug: 'open-terrace',
    name: 'Open Terrace Room',
    price: 180000,
    maxGuests: 3,
    description: 'Our most romantic offering featuring a private outdoor terrace with breathtaking views. Enjoy al fresco dining, sunset cocktails, and the fresh Ikenne air from your exclusive outdoor space.',
    image: '/images/rooms/room-terrace.jpg',
    gallery: ['/images/rooms/room-terrace.jpg'],
    features: ['Free WiFi', 'Air Conditioning', '24/7 Room Service', 'Smart TV', 'Mini Bar', 'Private Terrace', 'Outdoor Seating', 'Premium Views'],
    size: '60 sqm',
    bedType: '1 King Bed',
  },
  {
    slug: 'family-size',
    name: 'Family Size',
    price: 350000,
    maxGuests: 6,
    description: 'The ultimate luxury experience for families or groups. This multi-room suite features separate bedrooms, a spacious living area, dining space, and premium amenities throughout.',
    image: '/images/rooms/room-family.jpg',
    gallery: ['/images/rooms/room-family.jpg'],
    features: ['Free WiFi', 'Air Conditioning', '24/7 Room Service', 'Smart TV', 'Full Mini Bar', 'Multiple Bedrooms', 'Dining Area', 'Kitchenette', 'Premium Views'],
    size: '120 sqm',
    bedType: '2 King Beds + 2 Singles',
  },
];

export const roomCapacity: Record<string, number> = {
  '2-space': 2,
  '1-bed': 3,
  '2-bed-2-space': 5,
  'spacious': 3,
  'open-terrace': 3,
  'family-size': 6,
};

export interface Amenity {
  name: string;
  description: string;
  icon: string;
  details?: string;
}

export const amenities: Amenity[] = [
  {
    name: 'Swimming Pool',
    description: 'Resort-style pool perfect for relaxation and exercise.',
    icon: 'Waves',
    details: 'Size: 7ft × 47ft | Open 6AM - 9PM',
  },
  {
    name: 'Gym',
    description: 'Fully equipped fitness center with modern equipment.',
    icon: 'Dumbbell',
    details: 'Open 24/7 | Personal trainer available',
  },
  {
    name: 'Free WiFi',
    description: 'High-speed internet access throughout the property.',
    icon: 'Wifi',
    details: 'Available in all areas',
  },
  {
    name: 'Free Parking',
    description: 'Secure on-site parking for all guests.',
    icon: 'Car',
    details: '24/7 security monitored',
  },
  {
    name: 'No Noise Policy',
    description: 'Quiet environment ensuring peaceful rest.',
    icon: 'VolumeX',
    details: 'Quiet hours: 10PM - 7AM',
  },
  {
    name: 'Room Service',
    description: 'In-room dining available around the clock.',
    icon: 'ConciergeBell',
    details: '24-hour service',
  },
  {
    name: 'Air Conditioning',
    description: 'Climate-controlled comfort in every room.',
    icon: 'Wind',
    details: 'Individual room control',
  },
  {
    name: 'Security',
    description: '24/7 CCTV surveillance and trained security personnel.',
    icon: 'Shield',
    details: 'Round-the-clock monitoring',
  },
  {
    name: 'Restaurant & Bar',
    description: 'On-site dining with local and continental cuisine.',
    icon: 'UtensilsCrossed',
    details: 'Open 7AM - 11PM',
  },
  {
    name: 'Laundry Service',
    description: 'Professional laundry and dry cleaning available.',
    icon: 'Shirt',
    details: 'Same-day service available',
  },
];

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  roomStayed?: string;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Adebayo O.',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'CityWest Hotel exceeded all my expectations. The rooms are immaculate, the staff is incredibly professional, and the pool is the perfect way to unwind after a long day. I\'ve stayed at many hotels in Nigeria, but this is now my top choice for business trips to Ikenne.',
    roomStayed: 'Spacious Room',
    initials: 'AO',
    color: '#c9a96e',
  },
  {
    name: 'Mrs. Nkechi I.',
    location: 'Abuja, Nigeria',
    rating: 5,
    text: 'We hosted our daughter\'s wedding reception here and it was magical. The event hall is beautiful, the catering was exceptional, and the staff went above and beyond to make sure everything was perfect. Our guests are still talking about it!',
    initials: 'NI',
    color: '#8b6914',
  },
  {
    name: 'James M.',
    location: 'Ibadan, Nigeria',
    rating: 5,
    text: 'The Family Size room was perfect for our family vacation. My kids loved the pool, my wife enjoyed the spa-like bathroom, and I appreciated the fast WiFi for catching up on work. The free parking and quiet environment made it feel like a true getaway.',
    roomStayed: 'Family Size',
    initials: 'JM',
    color: '#6b8e23',
  },
  {
    name: 'Fatima A.',
    location: 'Ikenne, Ogun State',
    rating: 5,
    text: 'As a local, I was surprised to find such world-class quality right here in Ikenne. The restaurant serves the best continental breakfast I\'ve had outside Lagos. The gym is well-equipped and the 24-hour room service is a lifesaver for late-night cravings.',
    roomStayed: '1-Bed Room',
    initials: 'FA',
    color: '#cd853f',
  },
  {
    name: 'Oluwaseun K.',
    location: 'Port Harcourt, Nigeria',
    rating: 5,
    text: 'Booked the Open Terrace Room for our anniversary and it was worth every naira. Waking up to the fresh air on the private terrace, enjoying breakfast with a view — pure luxury. The staff even arranged a surprise cake for us. Highly recommend!',
    roomStayed: 'Open Terrace Room',
    initials: 'OK',
    color: '#4682b4',
  },
];

export interface GalleryImage {
  src: string;
  category: 'rooms' | 'dining' | 'facilities' | 'exterior';
  caption: string;
}

export const galleryImages: GalleryImage[] = [
  { src: '/images/rooms/room-2space.jpg', category: 'rooms', caption: '2-Space Room' },
  { src: '/images/rooms/room-1bed.jpg', category: 'rooms', caption: '1-Bed Room' },
  { src: '/images/rooms/room-2bed.jpg', category: 'rooms', caption: '2-Bed 2-Space' },
  { src: '/images/rooms/room-spacious.jpg', category: 'rooms', caption: 'Spacious Room' },
  { src: '/images/rooms/room-terrace.jpg', category: 'rooms', caption: 'Open Terrace Room' },
  { src: '/images/rooms/room-family.jpg', category: 'rooms', caption: 'Family Size Suite' },
  { src: '/images/dining/dining-restaurant.jpg', category: 'dining', caption: 'Main Restaurant' },
  { src: '/images/dining/dining-bar.jpg', category: 'dining', caption: 'Bar Lounge' },
  { src: '/images/dining/dining-food.jpg', category: 'dining', caption: 'Signature Dishes' },
  { src: '/images/amenities/amenity-pool.jpg', category: 'facilities', caption: 'Swimming Pool' },
  { src: '/images/amenities/amenity-gym.jpg', category: 'facilities', caption: 'Fitness Center' },
  { src: '/images/amenities/amenity-reception.jpg', category: 'facilities', caption: 'Reception' },
  { src: '/images/gallery/gallery-exterior.jpg', category: 'exterior', caption: 'Hotel Exterior' },
  { src: '/images/gallery/gallery-lobby.jpg', category: 'exterior', caption: 'Grand Lobby' },
  { src: '/images/gallery/gallery-detail.jpg', category: 'facilities', caption: 'Bathroom Details' },
  { src: '/images/hotel/exterior-day.jpg', category: 'exterior', caption: 'Aerial View' },
];

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Amenities', href: '/amenities' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

export const dockItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: 'CityWest Hotel Wins Best Luxury Hotel in Ogun State 2025',
    excerpt: 'We are thrilled to announce that CityWest Hotel has been recognized as the Best Luxury Hotel in Ogun State at the annual Nigerian Hospitality Awards.',
    date: 'May 15, 2025',
    category: 'Awards',
    readTime: '3 min read',
  },
  {
    title: 'Introducing Our New Summer Menu at The Garden Restaurant',
    excerpt: 'Chef Adebayo has crafted an exquisite summer menu featuring fresh local ingredients and innovative continental fusion dishes.',
    date: 'April 28, 2025',
    category: 'Dining',
    readTime: '4 min read',
  },
  {
    title: 'Top 10 Things to Do in Ikenne During Your Stay',
    excerpt: 'Discover the best attractions, cultural sites, and hidden gems that Ikenne has to offer our esteemed guests.',
    date: 'April 10, 2025',
    category: 'Travel Guide',
    readTime: '6 min read',
  },
  {
    title: 'Behind the Scenes: A Day with Our Hospitality Team',
    excerpt: 'Meet the dedicated professionals who make your stay at CityWest Hotel truly exceptional.',
    date: 'March 22, 2025',
    category: 'Team',
    readTime: '5 min read',
  },
];

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
}

export const teamMembers: TeamMember[] = [
  { name: 'Adebayo Johnson', role: 'General Manager', initials: 'AJ', color: '#c9a96e' },
  { name: 'Nkechi Ibrahim', role: 'Head of Operations', initials: 'NI', color: '#8b6914' },
  { name: 'Oluwaseun K.', role: 'Executive Chef', initials: 'OK', color: '#6b8e23' },
  { name: 'Fatima Abdullahi', role: 'Guest Relations', initials: 'FA', color: '#cd853f' },
  { name: 'James Momoh', role: 'Front Desk Manager', initials: 'JM', color: '#4682b4' },
  { name: 'Chioma Eze', role: 'Spa & Wellness Director', initials: 'CE', color: '#8b4513' },
];

export const stats = [
  { value: 10, suffix: '+', label: 'Years of Excellence' },
  { value: 50, suffix: '+', label: 'Luxury Rooms' },
  { value: 1000, suffix: '+', label: 'Happy Guests' },
  { value: 4.9, suffix: '', label: 'Guest Rating' },
];
