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
  companyBlurb:
    'The company I co-founded. We build software and digital products, and a lot of what I learn there ends up in the Lab.',
  tagline:
    'I build websites, and I sweat the small parts that make them nice to use. The best UI I come across, I rebuild and put in the Lab for anyone to copy.',

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
    "I'm Sushant, a frontend developer and co-founder of CONEIZ Enterprises. I care about the small stuff: how a hover eases in, how heavy a headline feels, how long a page takes before it feels ready.",
    "The Lab is my workbench, and I'll be honest about what's on it: I collect the best components I come across on the internet, take inspiration from them, rebuild and fine-tune them with the help of AI, and present them here for you. It isn't all my original work. It's curated and polished by me. Stay tuned, it keeps growing.",
  ],
  // Shown at the top of the Lab, so nobody mistakes curation for invention
  labNote:
    "Not everything here is my original idea. I collect the best components I find across the internet, take inspiration from them, rebuild and fine-tune them with the help of AI, and present them to you here, free to copy. Stay tuned, there's more every week.",
  inspirations: ['Aceternity UI', 'Magic UI', 'React Bits', 'Skiper UI', 'uiverse.io', 'shadcn/ui'],
  stack: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML & CSS', 'Canvas', 'Vite', 'Git'],
  now: [
    'Adding a few new components to the Lab every week',
    'Building products at CONEIZ Enterprises',
    'Shipping my first public projects',
  ],
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
