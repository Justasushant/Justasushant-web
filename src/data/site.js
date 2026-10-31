// All the text and links on the site live here.
// Edit this file to update your portfolio — no need to touch the components.

export const site = {
  name: 'Sushant Sharma',
  role: 'Frontend Developer & UI Engineer',
  company: 'CONEIZ Enterprises',
  companyRole: 'Co-founder',
  companyLogo: '/coneiz-logo.webp',
  companyUrl: 'https://coneiz.com',
  // One or two lines about the company, shown in the About section
  companyBlurb: 'The company I co-founded. We build software and digital products.',
  tagline:
    'Frontend developer. I build interfaces in React and keep a Lab of components you can copy.',

  email: 'sushant@coneiz.com',
  whatsapp: {
    display: '+91 93588 39896',
    // wa.me needs the number with country code and no symbols
    link: 'https://wa.me/919358839896',
  },
  // Add your profile URLs here. Leave a link as '' to hide it.
  socials: [
    { label: 'GitHub', url: '' },
    { label: 'LinkedIn', url: '' },
    { label: 'X / Twitter', url: '' },
  ],

  about: [
    "I'm Sushant, a frontend developer and co-founder of CONEIZ Enterprises. I work mostly in React and Tailwind.",
    'The Lab is where I keep components. Most start from something I saw on another site. I rebuild them with AI, tune them by hand, and credit the original on every page.',
  ],
  // Shown at the top of the Lab, so nobody mistakes curation for invention
  labNote:
    'Most of these start from something I saw on another site. I rebuild each one with AI, tune it, and credit where the idea came from. Everything is free to copy.',
  inspirations: ['Aceternity UI', 'Magic UI', 'React Bits', 'Skiper UI', 'uiverse.io', 'shadcn/ui'],
  stack: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML & CSS', 'Canvas', 'Vite', 'Git'],
  now: ['Adding components to the Lab', 'Building products at CONEIZ Enterprises', 'Working toward my first public projects'],
}

// Components shown on the home page (the rest live in the Lab)
export const featured = ['blur-switch', 'flow-field', 'web-shooter', 'split-flap']

// status: 'soon' shows the "Updating soon" card.
// When a project ships, set status: 'live' and fill in the links + image.
export const projects = [
  {
    title: 'Project 01',
    hint: 'A tool for designers & developers',
    description: 'Something small, useful and worth bookmarking.',
    tags: ['React', 'Tailwind'],
    status: 'soon',
    live: '',
    code: '',
  },
  {
    title: 'Project 02',
    hint: 'A full web app',
    description: 'Real data, real users, real edge cases.',
    tags: ['React', 'API', 'Charts'],
    status: 'soon',
    live: '',
    code: '',
  },
  {
    title: 'Project 03',
    hint: 'An AI-powered experiment',
    description: 'Where good UI meets a language model.',
    tags: ['React', 'AI'],
    status: 'soon',
    live: '',
    code: '',
  },
]
