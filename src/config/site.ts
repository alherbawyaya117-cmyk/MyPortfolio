/**
 * Site-wide variables: contact details, links and integrations.
 * Page copy lives in src/i18n, dated entries (conferences, education) in src/data.
 */
export const site = {
  phone: '+961 79 123 496',
  email: 'Herbawiaya4@gmail.com',
  /** Full international number without "+", spaces or the local leading zero, as wa.me expects. */
  whatsappNumber: '96179123496',
  instagram: {
    handle: 'step.intoyourbest',
    url: 'https://www.instagram.com/step.intoyourbest/',
  },
  cvPath: '/cv/Aya_Al_Herbawy_CV.pdf',
  /** Google Analytics 4 measurement ID (G-XXXXXXXXXX). Empty: no analytics and no consent banner. */
  gaMeasurementId: '',
  colors: {
    lightPaper: '#f2f3ef',
    darkPaper: '#1b1d17',
  },
} as const;

export function whatsappHref(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
