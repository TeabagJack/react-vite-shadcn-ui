// Centralized mock data for events and organizers

export interface Event {
  id: string;
  title: string;
  description: string;
  flyerImage: string;
  startTime: string;
  endTime: string;
  month: string;
  day: string;
  dayOfWeek: string;
  venueName: string;
  venueAddress: string;
  price: string;
  venue: string;
  date: string;
  time: string;
  eventType: 'free' | 'paid';
  entryRequired: boolean;
  attendeeCount: number;
  attendees: Array<{ id: string; name: string; avatar: string }>;
  host: {
    id: string;
    name: string;
    avatar: string;
    username: string;
  };
}

export interface Organizer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  description: string;
  isAssociation: boolean;
  memberCount?: number;
}

// Mock Events Database
export const MOCK_EVENTS: Record<string, Event> = {
  '1': {
    id: '1',
    title: 'No Sleep 2nite',
    description: `Join us for an unforgettable night of non-stop dancing and music! This epic all-nighter features incredible DJs spinning the latest tracks until sunrise.

The event will take place at the legendary Mister East venue with a state-of-the-art sound system and mesmerizing light shows. Don't miss this spectacular event!

FREE ENTRY - First come, first served. Doors open at midnight and we party until 6 AM.

Limited capacity - arrive early!`,
    flyerImage: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=1200&fit=crop',
    startTime: 'Fri, Nov 21 • 12:00 AM',
    endTime: 'Fri, Nov 21 • 6:00 AM',
    month: 'NOV',
    day: '21',
    dayOfWeek: 'FRI',
    venueName: 'Mister East',
    venueAddress: '123 East Street, Maastricht, 6200 AB',
    price: 'FREE',
    venue: 'Mister East',
    date: 'FRI, NOV 21',
    time: '12AM',
    eventType: 'free',
    entryRequired: false,
    attendeeCount: 24,
    attendees: [
      { id: '1', name: 'Alex Chen', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: '3', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: '4', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: '5', name: 'James Brown', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '6', name: 'Sophie Turner', avatar: 'https://i.pravatar.cc/150?img=6' },
      { id: '7', name: 'Michael Lee', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: '8', name: 'Lisa Anderson', avatar: 'https://i.pravatar.cc/150?img=8' },
    ],
    host: {
      id: '1',
      name: 'Summer Vibes Collective',
      avatar: 'https://i.pravatar.cc/150?img=20',
      username: '@summervibes'
    }
  },
  '2': {
    id: '2',
    title: 'TFA & MENASA SOUND SYSTEM',
    description: `Experience the ultimate fusion of electronic beats and live performance! TFA & MENASA bring their legendary sound system to XANADU for one night only.

This FREE event showcases cutting-edge electronic music with international DJs and local talent. Immerse yourself in bass-heavy beats and stunning visuals.

Entry is required - please RSVP to guarantee your spot as space is limited. Show starts at 8 PM sharp.

Age 18+ only. Valid ID required at the door.`,
    flyerImage: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&h=1200&fit=crop',
    startTime: 'Today • 8:00 PM',
    endTime: 'Today • 2:00 AM',
    month: 'NOV',
    day: '5',
    dayOfWeek: 'TUE',
    venueName: 'XANADU',
    venueAddress: '456 Night Avenue, Maastricht, 6201 CD',
    price: 'FREE',
    venue: 'XANADU',
    date: 'TODAY',
    time: '8PM',
    eventType: 'free',
    entryRequired: true,
    attendeeCount: 15,
    attendees: [
      { id: '9', name: 'Chris Taylor', avatar: 'https://i.pravatar.cc/150?img=9' },
      { id: '10', name: 'Nina Patel', avatar: 'https://i.pravatar.cc/150?img=10' },
      { id: '11', name: 'Lucas Martinez', avatar: 'https://i.pravatar.cc/150?img=11' },
    ],
    host: {
      id: '2',
      name: 'XANADU Events',
      avatar: 'https://i.pravatar.cc/150?img=21',
      username: '@xanaduevents'
    }
  },
  '3': {
    id: '3',
    title: 'MEZCLA @ MR. PURPLE',
    description: `Get ready for the hottest party of the month! MEZCLA takes over the rooftop at Mr. Purple with an incredible lineup of DJs and live performers.

Enjoy stunning city views while dancing to the best mix of Latin beats, house music, and international sounds. Premium cocktails and gourmet bites available all night.

This is a ticketed event - grab your early bird tickets now before prices go up!

Dress code: Smart casual. Rooftop terrace opens at 10 PM.`,
    flyerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1200&fit=crop',
    startTime: 'Sat, Nov 15 • 10:00 PM',
    endTime: 'Sun, Nov 16 • 4:00 AM',
    month: 'NOV',
    day: '15',
    dayOfWeek: 'SAT',
    venueName: 'The Club by Mr. Purple',
    venueAddress: '789 Rooftop Boulevard, Maastricht, 6202 EF',
    price: '€15',
    venue: 'The Club by Mr. Purple',
    date: 'SAT, NOV 15',
    time: '10PM',
    eventType: 'paid',
    entryRequired: true,
    attendeeCount: 42,
    attendees: [
      { id: '12', name: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: '13', name: 'Ethan Davis', avatar: 'https://i.pravatar.cc/150?img=13' },
      { id: '14', name: 'Ava Johnson', avatar: 'https://i.pravatar.cc/150?img=14' },
    ],
    host: {
      id: '3',
      name: 'Mr. Purple Entertainment',
      avatar: 'https://i.pravatar.cc/150?img=22',
      username: '@mrpurple'
    }
  },
  '4': {
    id: '4',
    title: 'Beach Sunset Party',
    description: `Experience the magic of summer with our spectacular Beach Sunset Party! Watch the sun dip below the horizon while enjoying live music, drinks, and beach vibes.

This beachfront celebration features acoustic performances, DJ sets, and a bonfire as the stars come out. Bring your friends and dancing shoes!

FREE EVENT - All ages welcome. Food and drink vendors on site.

Perfect for families and friend groups. Parking available nearby.`,
    flyerImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=1200&fit=crop',
    startTime: 'Sat, Jun 22 • 6:00 PM',
    endTime: 'Sat, Jun 22 • 11:00 PM',
    month: 'JUN',
    day: '22',
    dayOfWeek: 'SAT',
    venueName: 'Sunset Beach Club',
    venueAddress: '101 Beachfront Drive, Maastricht, 6203 GH',
    price: 'FREE',
    venue: 'Sunset Beach',
    date: 'SAT, JUN 22',
    time: '6PM',
    eventType: 'free',
    entryRequired: false,
    attendeeCount: 89,
    attendees: [
      { id: '15', name: 'Sophia Williams', avatar: 'https://i.pravatar.cc/150?img=15' },
      { id: '16', name: 'Liam Wilson', avatar: 'https://i.pravatar.cc/150?img=16' },
      { id: '17', name: 'Isabella Garcia', avatar: 'https://i.pravatar.cc/150?img=17' },
    ],
    host: {
      id: '1',
      name: 'Summer Vibes Collective',
      avatar: 'https://i.pravatar.cc/150?img=20',
      username: '@summervibes'
    }
  },
  '5': {
    id: '5',
    title: 'Summer Rooftop Mixer',
    description: `Network and socialize at the most exclusive rooftop mixer of the season! This sophisticated gathering brings together professionals, creatives, and entrepreneurs.

Enjoy craft cocktails, gourmet appetizers, and stunning panoramic city views. Live jazz music sets the perfect ambiance for meaningful connections.

Entry required - Limited to 100 guests. Business casual attire recommended.

Complimentary welcome drink included with entry.`,
    flyerImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=1200&fit=crop',
    startTime: 'Fri, Jun 28 • 7:00 PM',
    endTime: 'Fri, Jun 28 • 11:00 PM',
    month: 'JUN',
    day: '28',
    dayOfWeek: 'FRI',
    venueName: 'Sky Lounge Rooftop',
    venueAddress: '202 Heights Avenue, Maastricht, 6204 IJ',
    price: '€20',
    venue: 'Sky Lounge',
    date: 'FRI, JUN 28',
    time: '7PM',
    eventType: 'paid',
    entryRequired: true,
    attendeeCount: 67,
    attendees: [
      { id: '18', name: 'Noah Martinez', avatar: 'https://i.pravatar.cc/150?img=18' },
      { id: '19', name: 'Emma Rodriguez', avatar: 'https://i.pravatar.cc/150?img=19' },
      { id: '20', name: 'Oliver Taylor', avatar: 'https://i.pravatar.cc/150?img=20' },
    ],
    host: {
      id: '1',
      name: 'Summer Vibes Collective',
      avatar: 'https://i.pravatar.cc/150?img=20',
      username: '@summervibes'
    }
  },
  '6': {
    id: '6',
    title: 'Music Festival 2024',
    description: `The biggest music festival of the year returns! Three stages, 50+ artists, and thousands of music lovers coming together for an unforgettable weekend.

Experience multiple genres from rock and indie to electronic and hip-hop. Food trucks, art installations, and camping available on-site.

Early bird tickets selling fast! VIP packages include backstage access and premium viewing areas.

Rain or shine - this show goes on! Ages 16+ (under 18 must be accompanied by adult).`,
    flyerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop',
    startTime: 'Sat, Jul 6 • 12:00 PM',
    endTime: 'Sun, Jul 7 • 11:00 PM',
    month: 'JUL',
    day: '6',
    dayOfWeek: 'SAT',
    venueName: 'Festival Grounds',
    venueAddress: '303 Park Lane, Maastricht, 6205 KL',
    price: 'FREE',
    venue: 'Festival Grounds',
    date: 'SAT, JUL 6',
    time: '12PM',
    eventType: 'free',
    entryRequired: true,
    attendeeCount: 2500,
    attendees: [
      { id: '21', name: 'Charlotte Anderson', avatar: 'https://i.pravatar.cc/150?img=21' },
      { id: '22', name: 'Benjamin Thomas', avatar: 'https://i.pravatar.cc/150?img=22' },
      { id: '23', name: 'Amelia Jackson', avatar: 'https://i.pravatar.cc/150?img=23' },
    ],
    host: {
      id: '1',
      name: 'Summer Vibes Collective',
      avatar: 'https://i.pravatar.cc/150?img=20',
      username: '@summervibes'
    }
  },
  '7': {
    id: '7',
    title: 'Urban Art Exhibition',
    description: `Discover the vibrant world of urban art and street culture! This exclusive exhibition showcases emerging and established artists pushing the boundaries of contemporary art.

Interactive installations, live graffiti sessions, and artist talks throughout the evening. Gallery opens at 6 PM with a special curator's tour.

FREE admission for all. Drinks and light refreshments available for purchase.

Photography encouraged - tag us on social media! Family-friendly event.`,
    flyerImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=1200&fit=crop',
    startTime: 'Thu, Nov 14 • 6:00 PM',
    endTime: 'Thu, Nov 14 • 10:00 PM',
    month: 'NOV',
    day: '14',
    dayOfWeek: 'THU',
    venueName: 'Modern Art Gallery',
    venueAddress: '404 Culture Street, Maastricht, 6206 MN',
    price: 'FREE',
    venue: 'Modern Art Gallery',
    date: 'THU, NOV 14',
    time: '6PM',
    eventType: 'free',
    entryRequired: false,
    attendeeCount: 156,
    attendees: [
      { id: '24', name: 'Henry White', avatar: 'https://i.pravatar.cc/150?img=24' },
      { id: '25', name: 'Evelyn Harris', avatar: 'https://i.pravatar.cc/150?img=25' },
      { id: '26', name: 'Sebastian Clark', avatar: 'https://i.pravatar.cc/150?img=26' },
    ],
    host: {
      id: '4',
      name: 'Art Collective Maastricht',
      avatar: 'https://i.pravatar.cc/150?img=23',
      username: '@artcollective'
    }
  },
  '8': {
    id: '8',
    title: 'Tech Innovation Summit',
    description: `Join the brightest minds in technology for a day of innovation, inspiration, and networking! Keynote speakers from leading tech companies share insights on AI, blockchain, and the future of work.

Panel discussions, workshops, and startup pitch sessions throughout the day. Network with investors, founders, and industry leaders.

Entry required - Register now for early bird pricing. Continental breakfast and lunch included.

Bring business cards and be ready to connect! Professional attire recommended.`,
    flyerImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1200&fit=crop',
    startTime: 'Wed, Nov 20 • 9:00 AM',
    endTime: 'Wed, Nov 20 • 6:00 PM',
    month: 'NOV',
    day: '20',
    dayOfWeek: 'WED',
    venueName: 'Innovation Center',
    venueAddress: '505 Tech Boulevard, Maastricht, 6207 OP',
    price: '€50',
    venue: 'Innovation Center',
    date: 'WED, NOV 20',
    time: '9AM',
    eventType: 'paid',
    entryRequired: true,
    attendeeCount: 234,
    attendees: [
      { id: '27', name: 'Victoria Lewis', avatar: 'https://i.pravatar.cc/150?img=27' },
      { id: '28', name: 'Alexander Walker', avatar: 'https://i.pravatar.cc/150?img=28' },
      { id: '29', name: 'Scarlett Hall', avatar: 'https://i.pravatar.cc/150?img=29' },
    ],
    host: {
      id: '5',
      name: 'Tech Community Maastricht',
      avatar: 'https://i.pravatar.cc/150?img=24',
      username: '@techmaastricht'
    }
  },
  '9': {
    id: '9',
    title: 'Jazz Night Under Stars',
    description: `A magical evening of smooth jazz under the stars! World-class musicians perform timeless classics and modern jazz fusion in an intimate outdoor setting.

Bring your blankets and enjoy the music under the night sky. Wine and cheese pairings available throughout the evening.

FREE admission - Donations appreciated to support local musicians. Seating is first-come, first-served.

Weather permitting - check our social media for updates. All ages welcome!`,
    flyerImage: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=1200&fit=crop',
    startTime: 'Fri, Nov 8 • 8:00 PM',
    endTime: 'Fri, Nov 8 • 11:00 PM',
    month: 'NOV',
    day: '8',
    dayOfWeek: 'FRI',
    venueName: 'City Park Amphitheater',
    venueAddress: '606 Garden Way, Maastricht, 6208 QR',
    price: 'FREE',
    venue: 'City Park',
    date: 'FRI, NOV 8',
    time: '8PM',
    eventType: 'free',
    entryRequired: false,
    attendeeCount: 412,
    attendees: [
      { id: '30', name: 'Daniel Allen', avatar: 'https://i.pravatar.cc/150?img=30' },
      { id: '31', name: 'Madison Young', avatar: 'https://i.pravatar.cc/150?img=31' },
      { id: '32', name: 'Matthew King', avatar: 'https://i.pravatar.cc/150?img=32' },
    ],
    host: {
      id: '6',
      name: 'Jazz Society Maastricht',
      avatar: 'https://i.pravatar.cc/150?img=25',
      username: '@jazzmaastricht'
    }
  }
};

// Mock Organizers Database
export const MOCK_ORGANIZERS: Record<string, Organizer> = {
  '1': {
    id: '1',
    name: 'Summer Vibes Collective',
    username: '@summervibes',
    avatar: 'https://i.pravatar.cc/150?img=20',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop',
    description: 'Creating unforgettable summer experiences through music, art, and community gatherings across the city.',
    isAssociation: true,
    memberCount: 342,
  },
  '2': {
    id: '2',
    name: 'XANADU Events',
    username: '@xanaduevents',
    avatar: 'https://i.pravatar.cc/150?img=21',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop',
    description: 'Premier electronic music events and underground culture promoter. Bringing the best DJs and sound systems to Maastricht.',
    isAssociation: false,
  },
  '3': {
    id: '3',
    name: 'Mr. Purple Entertainment',
    username: '@mrpurple',
    avatar: 'https://i.pravatar.cc/150?img=22',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop',
    description: 'Luxury rooftop experiences with world-class entertainment. Where sophistication meets celebration.',
    isAssociation: false,
  },
  '4': {
    id: '4',
    name: 'Art Collective Maastricht',
    username: '@artcollective',
    avatar: 'https://i.pravatar.cc/150?img=23',
    coverImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=400&fit=crop',
    description: 'Supporting and showcasing local and international artists. Monthly exhibitions and cultural events.',
    isAssociation: true,
    memberCount: 156,
  },
  '5': {
    id: '5',
    name: 'Tech Community Maastricht',
    username: '@techmaastricht',
    avatar: 'https://i.pravatar.cc/150?img=24',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=400&fit=crop',
    description: 'Building the future through technology, innovation, and community. Monthly meetups and annual summit.',
    isAssociation: true,
    memberCount: 589,
  },
  '6': {
    id: '6',
    name: 'Jazz Society Maastricht',
    username: '@jazzmaastricht',
    avatar: 'https://i.pravatar.cc/150?img=25',
    coverImage: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=400&fit=crop',
    description: 'Preserving and promoting jazz music through live performances and education. Weekly jam sessions welcome all.',
    isAssociation: true,
    memberCount: 234,
  }
};

// Helper function to get event by ID
export function getEventById(id: string): Event | undefined {
  return MOCK_EVENTS[id];
}

// Helper function to get organizer by ID
export function getOrganizerById(id: string): Organizer | undefined {
  return MOCK_ORGANIZERS[id];
}

// Helper function to get events by organizer ID
export function getEventsByOrganizerId(orgId: string): Event[] {
  return Object.values(MOCK_EVENTS).filter(event => event.host.id === orgId);
}
