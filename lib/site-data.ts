export const COMPANY = {
  name: 'YOUJIU',
  product: 'NdFeB (Neodymium Iron Boron) Magnets',
  email: 'alidjie@gmail.com',
  address: 'No. 88 Magnetic Industry Park, Taizhou, Zhejiang 318000, China',
  whatsapp: '+86 137 3235 9838',
  phone: '+86 137 3235 9838',
}

export interface NavItem {
  label: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Cases', href: '/cases' },
  { label: 'Contact', href: '/contact' },
]

export interface ProductSeries {
  name: string
  gradeRange: string
  maxTemp: string
  description: string
}

export const PRODUCT_SERIES: ProductSeries[] = [
  {
    name: 'N Series',
    gradeRange: 'N30 - N55',
    maxTemp: '80C',
    description:
      'Standard grade NdFeB magnets with excellent magnetic properties at room temperature. Ideal for consumer electronics and general-purpose applications.',
  },
  {
    name: 'M Series',
    gradeRange: '30M - 52M',
    maxTemp: '100C',
    description:
      'Medium temperature grade offering improved temperature stability. Suitable for motors and sensors operating at moderate temperatures.',
  },
  {
    name: 'H Series',
    gradeRange: '27H - 50H',
    maxTemp: '120C',
    description:
      'High temperature grade with strong coercivity. Designed for applications requiring sustained performance at elevated temperatures.',
  },
  {
    name: 'SH Series',
    gradeRange: '28SH - 45SH',
    maxTemp: '150C',
    description:
      'Super high temperature grade for demanding motor and generator applications. Maintains magnetic properties under significant thermal stress.',
  },
  {
    name: 'UH Series',
    gradeRange: '28UH - 40UH',
    maxTemp: '180C',
    description:
      'Ultra high temperature grade engineered for extreme operating conditions. Used in wind turbines, EV traction motors, and high-performance industrial equipment.',
  },
  {
    name: 'EH Series',
    gradeRange: '25EH - 38EH',
    maxTemp: '200C',
    description:
      'Extreme high temperature grade delivering reliable magnetic performance at the highest operating temperatures. Critical for aerospace and specialized industrial applications.',
  },
]

export interface Application {
  title: string
  description: string
  icon: string
}

export const APPLICATIONS: Application[] = [
  {
    title: 'Motors',
    description:
      'High-efficiency permanent magnet motors for industrial and consumer applications, delivering superior torque and energy conversion.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Wind Energy',
    description:
      'Wind turbine generators rely on high-grade NdFeB magnets for maximum power output and reliability in harsh environments.',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  },
  {
    title: 'Consumer Electronics',
    description:
      'Compact, precision magnets for speakers, earbuds, haptic feedback systems, and magnetic attachment mechanisms.',
    icon: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z',
  },
  {
    title: 'Automotive',
    description:
      'EV traction motors, sensors, actuators, and ADAS components benefit from automotive-grade high-coercivity magnets.',
    icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
  },
  {
    title: 'Medical Devices',
    description:
      'Biocompatible magnetic solutions for MRI systems, magnetic therapy devices, and precision medical instrumentation.',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z',
  },
  {
    title: 'Industrial Automation',
    description:
      'Magnetic separators, holding systems, sensors, and robotic end-effectors powered by high-performance permanent magnets.',
    icon: 'M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.43l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.64-.07.98 0 .34.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.25.24.43.49.43h4c.25 0 .46-.18.49-.43l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z',
  },
]

// Map product shape to local image path (generated AI images, no watermark)
export function getProductImage(shape: string): string {
  const s = shape.toLowerCase()
  if (s.includes('block') || s.includes('rect')) return '/images/magnet-block.png'
  if (s.includes('ring')) return '/images/magnet-ring.png'
  if (s.includes('arc') || s.includes('segment')) return '/images/magnet-arc.png'
  if (s.includes('disc') || s.includes('disk')) return '/images/magnet-disc.png'
  if (s.includes('cylinder')) return '/images/magnet-disc.png'
  if (s.includes('assembly') || s.includes('rotor')) return '/images/solution-automotive.png'
  return '/images/magnet-disc.png'
}

// Application images mapped from generated solution images
export const APPLICATION_IMAGES: string[] = [
  '/images/solution-automotive.png',   // Motors
  '/images/solution-wind.png',         // Wind Energy
  '/images/solution-electronics.png',  // Consumer Electronics
  '/images/solution-automotive.png',   // Automotive
  '/images/solution-medical.png',      // Medical Devices
  '/images/solution-automation.png',   // Industrial Automation
]

export interface Advantage {
  title: string
  description: string
}

export const ADVANTAGES: Advantage[] = [
  {
    title: 'High Magnetic Strength',
    description:
      'Premium grade NdFeB with BHmax up to 55 MGOe, delivering maximum magnetic energy density in compact form factors.',
  },
  {
    title: 'Precision Manufacturing',
    description:
      'Advanced processing capabilities including wire EDM, surface grinding, and precision machining with tolerances to +/- 0.05mm.',
  },
  {
    title: 'Custom Solutions',
    description:
      'Full custom magnet design and engineering support, from material selection and grade optimization to coating and assembly.',
  },
  {
    title: 'Global Certification',
    description:
      'ISO 9001, IATF 16949, and RoHS compliant manufacturing. Full material certification and test reports provided.',
  },
  {
    title: 'Fast Delivery',
    description:
      'Standard grades shipped within 7-10 days. Dedicated production capacity for volume orders with flexible lead times.',
  },
  {
    title: 'Competitive Pricing',
    description:
      'Direct manufacturer pricing with no middleman markup. Volume discounts and long-term supply agreements available.',
  },
]
