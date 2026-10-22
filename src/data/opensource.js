// Content for the open-source page, shared by its UI mode and terminal mode.

// Folders you can `ls` and `cd` into in the terminal.
// preview: 'lab' | 'site' shows a live preview, null shows the "busy" screen.
export const ossProjects = [
  {
    name: 'the-lab',
    description:
      'The component Lab: transitions, backgrounds, buttons, cards and more, in TSX and JSX.',
    status: 'live',
    preview: 'lab',
    link: '/lab',
  },
  {
    name: 'portfolio',
    description: 'The site you are looking at right now. React, Vite and Tailwind CSS.',
    status: 'live',
    preview: 'site',
    link: '/',
  },
  {
    name: 'project-01',
    description: 'A tool for designers and developers. Small, useful, worth bookmarking.',
    status: 'busy',
    preview: null,
  },
  {
    name: 'project-02',
    description: 'A full web app with real data and real users.',
    status: 'busy',
    preview: null,
  },
  {
    name: 'project-03',
    description: 'An AI-powered experiment where good UI meets a language model.',
    status: 'busy',
    preview: null,
  },
]

// The Lab's Templates category is "coming soon", and these explain why
export const templateExcuses = [
  'Hm… actually I slipped and hit my head hard, so I forgot I was going to add these.',
  'I made the templates. Then I made a template for the templates. Then I got lost in there.',
  'They were here a second ago. I think dark mode ate them.',
  'My dog ate the templates. I do not have a dog. That is how serious this is.',
  'They have been loading at 99% since Tuesday. Any minute now.',
  'I designed them all in my head. Exporting from my head is still a beta feature.',
  'I asked AI to build them and it politely asked me to build them myself.',
  'I tripped over a div and all the templates fell out of my pocket.',
  'They are ready. I just have not found a font I am emotionally ready to commit to.',
  'I accidentally ran rm -rf on my motivation. Restoring from backup… there is no backup.',
  'A cooler button showed up on the internet and I had to remix it first. Priorities.',
  'Mercury is in retrograde and so is my productivity.',
]

// What the "Remind me" button says, one after another
export const remindReplies = [
  'Actually, I forgot to make this button functional as well. How clumsy of me.',
  'Reminder set! Just kidding. It is a button. It does not even know who you are.',
  'I wrote your reminder on a sticky note. The sticky note is also coming soon.',
  'Okay, okay. I will remind myself to remind you. No promises.',
  'Pressing it harder will not help. I checked.',
  'This button has now been pressed more times than I have worked on templates.',
  'Error 418: I am a teapot, not a reminder service.',
  'You are very persistent. Have you considered a career in open source?',
]

export const excuses = [
  'I was about to push, then I found a cooler loader on the internet.',
  'Still deciding between tabs and spaces. Day 412.',
  'The code works and I am scared to touch it.',
  'Rewriting the README for the ninth time.',
  'AI said it is “almost ready”. That was three weeks ago.',
  'My chai went cold, so I had to make another one.',
  'Waiting for the perfect commit message to arrive in a dream.',
  'Fine-tuning a loader that loads absolutely nothing.',
  'Somebody on the internet made a better button. I had to remix it.',
  'Running CONEIZ Enterprises. The repos are running on vibes.',
]

// The looping terminal on the open-source page (also the Terminal Loop default)
export const ossTerminalLines = [
  {
    command: 'git init my-own-projects',
    output: 'Initialized empty Git repository. Very, very empty.',
    tone: 'muted',
  },
  {
    command: 'git commit -m "first commit"',
    output: 'error: nothing to commit (developer was busy polishing a button)',
    tone: 'error',
  },
  { command: 'npm run motivation', output: 'npm ERR! Missing script: "motivation"', tone: 'error' },
  {
    command: 'sudo make free-time',
    output: 'sushant is not in the sudoers file. This incident will be reported.',
    tone: 'error',
  },
  {
    command: 'git push origin someday',
    output: 'Everything up-to-date. Nothing was ever pushed.',
    tone: 'muted',
  },
]
