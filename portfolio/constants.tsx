
import { Project, Stat, ExpertiseItem, Company } from './types';

export const CLIENT_PROJECTS: Project[] = [
  {
    id: '1',
    slug: 'sarcaster',
    title: 'SARCASTER',
    year: '2026',
    description: 'A modern SaaS-style web platform with a clean, conversion-focused experience and performance-first frontend.',
    tags: ['React', 'TypeScript', 'UI/UX'],
    imageUrl: 'https://i.postimg.cc/qv34rtgy/image.png',
    link: '/clients/sarcaster',
    liveUrl: 'https://sarcaster.in',
    details: 'Sarcaster was crafted as a SaaS-ready digital product website focused on clear messaging, engaging interactions, and responsive layout behavior. The project emphasizes strong visual hierarchy and smooth user journeys from landing to CTA.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    id: '2',
    slug: 'shree-shyam-mobile',
    title: 'ShreeShyamMobile.com',
    year: '2025',
    description: 'A client-focused business website designed for trust, speed, and clear product/service visibility.',
    tags: ['Business Website', 'Responsive UI', 'Lead Ready'],
    imageUrl: 'https://i.postimg.cc/R0sVXkYw/image.png',
    link: '/clients/shree-shyam-mobile',
    liveUrl: 'https://shreeshyammobile.com',
    details: 'ShreeShyamMobile.com was built to establish a strong online business presence with simple navigation, mobile-first rendering, and clear conversion points for customer action.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    id: '3',
    slug: 'buildexindia',
    title: 'BUILDEXINDIA',
    year: '2025',
    description: 'A business-focused website built to present BuildexIndia services with high clarity and trust-building design blocks.',
    tags: ['Frontend', 'Brand Site', 'Performance'],
    imageUrl: 'https://i.postimg.cc/qRfGF5Sb/image.png',
    link: '/clients/buildexindia',
    liveUrl: 'https://buildexindia.com',
    details: 'BuildexIndia is designed to communicate offerings in a professional and direct way. The platform includes responsive layouts, strong CTA placements, and polished UI sections to improve customer confidence and lead intent.',
    stack: ['React', 'TypeScript', 'CSS3', 'Vite']
  },
  {
    id: '4',
    slug: 'pk-sportshub',
    title: 'P.K SPORTSHUB',
    year: '2025',
    description: 'A sports-oriented digital storefront and brand website with a practical UX flow for visitors and buyers.',
    tags: ['E-commerce UI', 'Mobile First', 'Branding'],
    imageUrl: 'https://i.postimg.cc/rsfxqnng/image.png',
    link: '/clients/pk-sportshub',
    liveUrl: 'https://pksportshub.com',
    details: 'P.K Sportshub delivers a focused product and brand showcase experience. The website prioritizes readability, fast interactions, and structured content grouping to support customer exploration and action.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    id: '5',
    slug: 'digital-bharat',
    title: 'DigitalBharat',
    year: '2026',
    description: 'A complete digital presence for Digital Bharat with structured storytelling and clear service communication.',
    tags: ['Responsive Design', 'SEO Ready', 'Web Platform'],
    imageUrl: 'https://i.postimg.cc/sfHMDhfH/image.png',
    link: '/clients/digital-bharat',
    liveUrl: 'https://digital-bharat.com',
    details: 'DigitalBharat was built as a scalable brand presence with content sections that support both discovery and conversions. The site blends visual simplicity with strong information architecture.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    id: '6',
    slug: 'star-english',
    title: 'Star English',
    year: 'Ongoing',
    description: 'An ongoing client project focused on a polished learning-first experience for English communication and growth.',
    tags: ['Ongoing', 'Education', 'Product Design'],
    imageUrl: 'https://placehold.co/1200x800/111827/FFFFFF?text=%E2%8F%B0+Coming+Soon',
    link: '/clients/star-english',
    liveUrl: '#',
    details: 'Star English is currently under active development. The project is focused on creating a clean, easy-to-navigate educational website with modern interactions and high usability across mobile and desktop.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'UI Architecture'],
    isOngoing: true
  },
  {
    id: '7',
    slug: 'jai-v-pareek',
    title: 'JAI V. PAREEK',
    year: 'Ongoing',
    description: 'A new client project currently in planning and design phase. Full website experience coming soon.',
    tags: ['Ongoing', 'Coming Soon', 'Client Project'],
    imageUrl: 'https://placehold.co/1200x800/111827/FFFFFF?text=%E2%8F%B0+Coming+Soon',
    link: '/clients/jai-v-pareek',
    liveUrl: '#',
    details: 'JAI V. PAREEK is an upcoming client project currently under active discovery and design planning. The final build will focus on clarity, trust, and a premium presentation.',
    stack: ['Planning', 'UI/UX Strategy', 'Frontend Architecture'],
    isOngoing: true
  }
];

export const COMPANY_PROJECTS: Company[] = [
  {
    id: '1',
    title: 'CONEIZ',
    description: 'Core agency ecosystem building modern digital products and web solutions.',
    website: 'https://coneiz.com',
    imageUrl: 'https://i.postimg.cc/NG3FSdV3/coneiz_logo_current.png'
  },
  {
    id: '2',
    title: 'COLANC',
    description: 'Digital growth and web execution focused on premium business outcomes.',
    website: 'https://colanc.comeiz.com',
    imageUrl: 'https://i.postimg.cc/yY3H9PCh/CO_black_BGLESS.png'
  },
  {
    id: '3',
    title: 'RUDRACLOUD',
    description: 'Cloud and hosting platform experience powered by scalable frontend systems.',
    website: 'https://rudracloud.com',
    imageUrl: 'https://i.postimg.cc/KzWjv67J/image.png'
  }
];

export const FEATURED_CLIENTS = CLIENT_PROJECTS.slice(0, 4);

export const PROJECT_TYPE_SHOWCASE = [
  {
    id: 'pt-1',
    title: 'E-commerce Platforms',
    year: '2023-2026',
    description: 'We build modern e-commerce experiences with smooth product discovery, conversion-first UI, and fast page performance across devices.',
    tags: ['Storefront UI', 'Product Catalog', 'Checkout Experience'],
    imageUrl: '/assets/illustrations/ecommerce-platforms.svg',
    teamFocus: 'Conversion design, performance, and mobile shopping journeys'
  },
  {
    id: 'pt-2',
    title: 'Portfolio and Professional Websites',
    year: '2024-2026',
    description: 'We craft portfolio and professional websites that highlight expertise, build credibility, and create strong first impressions.',
    tags: ['Case Study Layouts', 'Professional Branding', 'Personal Branding'],
    imageUrl: '/assets/illustrations/portfolio-professional.svg',
    teamFocus: 'Visual storytelling, authority building, and clean presentation'
  },
  {
    id: 'pt-3',
    title: 'Business Websites',
    year: '2025-2026',
    description: 'We build business websites focused on trust, service clarity, and lead generation with polished UI and scalable frontend code.',
    tags: ['Company Presence', 'Service Pages', 'Lead Ready'],
    imageUrl: '/assets/illustrations/business-websites.svg',
    teamFocus: 'Business messaging, structure, and conversion flow'
  },
  {
    id: 'pt-4',
    title: 'SaaS Applications',
    year: '2023-2026',
    description: 'We create SaaS applications and product websites with user-focused flows, modular UI systems, and growth-ready frontend foundations.',
    tags: ['Product UI', 'Dashboard UX', 'Scalable Architecture'],
    imageUrl: '/assets/illustrations/saas-applications.svg',
    teamFocus: 'Product thinking, modular frontend, and long-term scalability'
  }
];

export const STATS: Stat[] = [
  { value: 'Since 2023', label: 'Coding' },
  { value: '10+', label: 'Projects' },
  { value: 'Commerce', label: 'Student' }
];

export const EXPERTISE: ExpertiseItem[] = [
  {
    icon: 'code',
    title: 'Frontend Development',
    description: 'I build website pages and components using React and TypeScript.'
  },
  {
    icon: 'design_services',
    title: 'UI/UX Implementation',
    description: 'I convert design files into clean, responsive website sections.'
  },
  {
    icon: 'devices',
    title: 'Responsive Design',
    description: 'I make sure websites work well on mobile, tablet, and desktop.'
  },
  {
    icon: 'accessibility_new',
    title: 'Accessibility',
    description: 'I try to keep websites clear, readable, and easy to use for everyone.'
  }
];
