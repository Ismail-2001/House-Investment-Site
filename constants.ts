import { Property, ChartDataPoint, Testimonial } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'The Azure Coast Resort',
    location: 'Amalfi, Italy',
    roi: 12.4,
    value: '€45M',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
    tags: ['Luxury', 'Resort', 'Coastal']
  },
  {
    id: '2',
    name: 'Metropolitan Heights',
    location: 'Tokyo, Japan',
    roi: 9.8,
    value: '¥8.2B',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
    tags: ['Urban', 'Business', 'High-Rise']
  },
  {
    id: '3',
    name: 'Sahara Oasis Retreat',
    location: 'Marrakech, Morocco',
    roi: 14.2,
    value: '$28M',
    image: 'https://images.unsplash.com/photo-1541979017773-512370ae099d?q=80&w=800&auto=format&fit=crop',
    tags: ['Boutique', 'Experience', 'Desert']
  },
  {
    id: '4',
    name: 'Alpine Grand Lodge',
    location: 'Zermatt, Switzerland',
    roi: 11.5,
    value: 'CHF 62M',
    image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop',
    tags: ['Ski', 'Winter', 'Luxury']
  }
];

export const PERFORMANCE_DATA: ChartDataPoint[] = [
  { year: '2019', revenue: 42, marketAverage: 30 },
  { year: '2020', revenue: 28, marketAverage: 15 },
  { year: '2021', revenue: 45, marketAverage: 32 },
  { year: '2022', revenue: 68, marketAverage: 45 },
  { year: '2023', revenue: 85, marketAverage: 52 },
  { year: '2024', revenue: 110, marketAverage: 60 },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Aura's market insights are unparalleled. They identified the Amalfi opportunity before anyone else, securing returns that traditional firms simply missed.",
    author: "James Sterling",
    title: "Partner, Sterling Venture Capital"
  },
  {
    id: '2',
    quote: "The level of operational detail and the sophistication of their AI analysis provides a peace of mind that is rare in high-yield hospitality investments.",
    author: "Elena Rossi",
    title: "Director, Rossi Family Office"
  },
  {
    id: '3',
    quote: "Sophisticated, transparent, and incredibly profitable. A true partner in wealth creation for the modern institutional investor.",
    author: "Michael Chen",
    title: "CEO, Chen Real Estate Group"
  }
];

export const NAV_LINKS = [
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Market Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
];
