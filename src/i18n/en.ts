import type { Copy } from './types';

export const en: Copy = {
  meta: {
    title: 'Aya Al-Herbawy · Biochemist & nutrition coach in Beirut',
    description:
      'Online nutrition consultations and personalised meal plans from Aya Al-Herbawy, a biochemist studying Nutrition & Dietetics in Beirut.',
    jobTitle: 'Biochemist & nutrition coach',
  },
  name: 'Aya Al-Herbawy',
  skipLink: 'Skip to content',
  nav: {
    label: 'Page sections',
    menu: 'Menu',
    close: 'Close',
    theme: 'Dark theme',
    sections: {
      about: 'About',
      services: 'Services',
      approach: 'Approach',
      how: 'How it works',
      learning: 'Learning',
      contact: 'Contact',
    },
  },
  switchLanguage: { short: 'ع', label: 'العربية' },
  cta: 'Message me on WhatsApp',
  whatsappMessage: 'Hi Aya, I found you through your website and I’d like to ask about a nutrition consultation.',
  externalArrow: '↗',
  hero: {
    kicker: 'Biochemist & nutrition coach · Beirut and online',
    title: 'Step into your best.',
    deck: 'I’m Aya. I turn the science of food into plans you can actually live with: online consultations and personalised meal plans.',
    secondary: 'How it works',
    portraitTitle: 'Portrait · 4:5',
    portraitNote: 'Professional photo to come',
    portraitAlt: 'Portrait of Aya Al-Herbawy',
    caption: 'Aya Al-Herbawy, Beirut.',
  },
  about: {
    title: 'Hi, I’m Aya.',
    paragraphs: [
      'Before I studied nutrition, I studied food the long way. A Bachelor’s and a Master 1 in biochemistry taught me what food does inside the body. Years in quality control, testing dairy batches and inspecting airline-catering kitchens in Beirut, taught me what happens to food before it ever reaches your plate.',
      'Now I’m completing a degree in Nutrition & Dietetics at the Lebanese University, and I bring all of it to one question: what should you eat, and how do you make it stick?',
    ],
    facts: [
      {
        term: 'Studied',
        detail: 'Biochemistry (BSc, Master 1) and Nutrition & Dietetics, in progress, at the Lebanese University',
      },
      { term: 'Speaks', detail: 'English, Arabic, French' },
      { term: 'Based in', detail: 'Beirut, Lebanon. Sessions online.' },
    ],
  },
  services: {
    title: 'What I can help with',
    items: [
      {
        title: 'Online consultations',
        text: 'One-to-one sessions over video. We look at your habits, your goals and what’s actually on your plate, then agree on small changes that last.',
      },
      {
        title: 'Personalised meal plans',
        text: 'Weekly plans built around your schedule, your budget and the Lebanese kitchen, with easy swaps so you never feel stuck.',
      },
      {
        title: 'More, soon',
        text: 'New ways to work together are on the way. Send me a message and you’ll hear first.',
        upcoming: true,
      },
    ],
  },
  approach: {
    title: 'Science first. Then real life.',
    items: [
      {
        mark: 'i.',
        title: 'Evidence over trends',
        text: 'My background is biochemistry, so advice starts from what the research supports, explained in plain words.',
      },
      {
        mark: 'ii.',
        title: 'Food you already love',
        text: 'Plans are built around man’oushe, mjaddara and Sunday lunch with the family, not against them.',
      },
      {
        mark: 'iii.',
        title: 'Care in the details',
        text: 'Years in food safety taught me to check everything twice. Your plan gets the same attention.',
      },
    ],
  },
  how: {
    title: 'Four simple steps',
    stepWord: 'Step',
    cta: 'Send your first message',
    steps: [
      { title: 'Send a message', text: 'Tell me a little about yourself and what you’d like to change.' },
      { title: 'Book a session', text: 'We pick a time for an online consultation that suits you.' },
      { title: 'Get your plan', text: 'You receive a personalised meal plan you can start right away.' },
      { title: 'Adjust together', text: 'We check in and fine-tune it as your routine changes.' },
    ],
  },
  learning: {
    title: 'Where I learned, and where I keep learning.',
    intro: 'Nutrition science moves quickly. These are the conferences I attend to keep up, alongside my studies.',
    conferencesTitle: 'Conferences',
    educationTitle: 'Education',
    now: 'now',
    inProgress: 'in progress',
    viewPost: 'View the post',
    cpdCredits: (credits) => `${credits} CPD credits`,
  },
  contact: {
    title: 'Let’s start with a message.',
    text: 'Tell me what you’d like to change, and I’ll reply on WhatsApp.',
    instagramLabel: 'Instagram',
    emailLabel: 'Email',
    cvLabel: 'Professional background',
    cvLink: 'Download CV (PDF)',
  },
  footer: {
    rights: '© 2026 Aya Al-Herbawy · Beirut, Lebanon',
    cookieSettings: 'Cookie settings',
  },
  consent: {
    text: 'This site uses Google Analytics cookies to count visits. Is that okay?',
    accept: 'Accept',
    decline: 'Decline',
  },
  notFound: {
    title: 'This page doesn’t exist.',
    text: 'The link may be old or mistyped.',
    back: 'Back to the home page',
  },
};
