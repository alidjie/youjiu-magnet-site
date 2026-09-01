import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import SectionTitle from '@/components/SectionTitle'
import { ADVANTAGES, APPLICATIONS, APPLICATION_IMAGES, getProductImage } from '@/lib/site-data'
import type { Product } from '@/types'

export const metadata = {
  title: 'Premium NdFeB Magnets for Global Industries',
  description:
    'YOUJIU delivers high-performance neodymium magnets engineered for precision applications worldwide. Sintered NdFeB, Bonded NdFeB, and magnetic assemblies.',
}

// SVG icons for advantages (ADVANTAGES data does not include an icon field)
function AdvantageIcon({ index }: { index: number }) {
  const common = {
    viewBox: '0 0 24 24',
    className: 'h-7 w-7',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (index) {
    case 0: // High Magnetic Strength - horseshoe magnet
      return (
        <svg {...common}>
          <path d="M5 5v7a7 7 0 0 0 14 0V5" />
          <path d="M5 5h4v7a3 3 0 0 0 6 0V5h4" />
        </svg>
      )
    case 1: // Precision Manufacturing - crosshair
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 2: // Custom Solutions - sliders
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h16" />
          <circle cx="8" cy="6" r="2" fill="white" />
          <circle cx="16" cy="12" r="2" fill="white" />
          <circle cx="10" cy="18" r="2" fill="white" />
        </svg>
      )
    case 3: // Global Certification - shield with check
      return (
        <svg {...common}>
          <path d="M12 2L4 6v6c0 5 3.5 9.5 8 11c4.5-1.5 8-6 8-11V6L12 2z" />
          <path d="M9 12l2 2l4-4" />
        </svg>
      )
    case 4: // Fast Delivery - lightning bolt
      return (
        <svg {...common}>
          <path d="M13 2L4 14h6l-1 8l9-12h-6l1-8z" />
        </svg>
      )
    case 5: // Competitive Pricing - tag
      return (
        <svg {...common}>
          <path d="M21.4 11.6l-9-9C12 2.2 11.5 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .5.2 1 .6 1.4l9 9c.4.4.9.6 1.4.6s1-.2 1.4-.6l7-7c.4-.4.6-.9.6-1.4 0-.5-.2-1-.6-1.4z" />
          <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    default:
      return null
  }
}

// Fallback products used when Supabase is unavailable or table is empty
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'fp1',
    name: 'Sintered NdFeB Block Magnet N42',
    slug: 'sintered-block-n42',
    category: 'sintered',
    series: 'N Series',
    grade: 'N42',
    shape: 'Block',
    description:
      'High-performance sintered NdFeB block magnet with NiCuNi coating for maximum corrosion resistance.',
    specs: { Br: '1.29-1.32 T', BHmax: '318-342 kJ/m3' },
    images: ['/images/magnet-block.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 1,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp2',
    name: 'Sintered NdFeB Ring Magnet N48SH',
    slug: 'sintered-ring-n48sh',
    category: 'sintered',
    series: 'SH Series',
    grade: 'N48SH',
    shape: 'Ring',
    description:
      'High-temperature ring magnet for motor applications, rated for continuous operation up to 150C.',
    specs: { Br: '1.36-1.40 T', BHmax: '366-390 kJ/m3' },
    images: ['/images/magnet-ring.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp3',
    name: 'Sintered NdFeB Arc Segment N35SH',
    slug: 'sintered-arc-n35sh',
    category: 'sintered',
    series: 'SH Series',
    grade: 'N35SH',
    shape: 'Arc',
    description:
      'Precision arc segment magnet for motor rotors with tight dimensional tolerances and uniform magnetic field.',
    specs: { Br: '1.17-1.21 T', BHmax: '263-287 kJ/m3' },
    images: ['/images/magnet-arc.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp4',
    name: 'Bonded NdFeB Disc Magnet BNI-6',
    slug: 'bonded-disc-bni6',
    category: 'bonded',
    series: 'Bonded NdFeB',
    grade: 'BNI-6',
    shape: 'Disc',
    description:
      'Injection-molded bonded NdFeB disc for sensor and actuator applications with complex geometry capability.',
    specs: { Br: '0.60-0.65 T', BHmax: '50-60 kJ/m3' },
    images: ['/images/magnet-disc.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 4,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp5',
    name: 'Magnetic Assembly - Rotor Stack',
    slug: 'assembly-rotor-stack',
    category: 'assembly',
    series: 'Magnetic Assemblies',
    grade: 'Custom',
    shape: 'Assembly',
    description:
      'Pre-assembled rotor magnet stack with steel yoke integration, ready for direct motor assembly.',
    specs: { Type: 'Rotor Assembly', Material: 'NdFeB + Steel' },
    images: ['/images/solution-automotive.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp6',
    name: 'Sintered NdFeB Cylinder Magnet N52',
    slug: 'sintered-cylinder-n52',
    category: 'sintered',
    series: 'N Series',
    grade: 'N52',
    shape: 'Cylinder',
    description:
      'Maximum energy product cylinder magnet for high-force holding and clamping applications.',
    specs: { Br: '1.43-1.47 T', BHmax: '398-422 kJ/m3' },
    images: ['/images/magnet-disc.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 6,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
]

const CLIENT_LOGOS = [
  'MotorTech',
  'WindCorp',
  'AutoParts',
  'PrecisionDyn',
  'Robotica',
  'MedDevice',
  'EnergyLab',
  'MfgHub',
]

export default async function HomePage() {
  // Fetch featured products from Supabase
  let featuredProducts: Product[] = FALLBACK_PRODUCTS
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .limit(6)
    if (!error && data && data.length > 0) {
      featuredProducts = data as Product[]
    }
  } catch {
    // Supabase not configured -- use fallback data
  }

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900">
        {/* Hero background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
        </div>
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="container-custom relative z-10 py-32 text-center">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-neutral-400">
            YOUJIU Magnetics
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Premium NdFeB Magnets for Global Industries
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
            YOUJIU delivers high-performance neodymium magnets engineered for
            precision applications worldwide
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Request a Quote
            </Link>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-white transition-all hover:border-white hover:bg-white hover:text-neutral-950"
            >
              Explore Products
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <svg
            className="h-6 w-6 animate-bounce text-neutral-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path d="M19 14l-7 7-7-7M19 6l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* 2. Why Choose YOUJIU */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Why Choose YOUJIU"
            subtitle="Six reasons why leading manufacturers worldwide trust YOUJIU for their permanent magnet requirements."
            centered
          />
          <div className="mt-16 grid grid-cols-1 gap-px bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={i}
                className="card-hover group bg-white p-8 lg:p-10"
              >
                <div className="flex h-14 w-14 items-center justify-center border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                  <AdvantageIcon index={i} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {adv.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="Our Product Series"
            subtitle="Explore our range of high-performance NdFeB magnets, from standard grades to custom-engineered assemblies."
            centered
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href="/products"
                className="card-hover group block overflow-hidden border border-neutral-200 bg-white"
              >
                {/* Product image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={getProductImage(product.shape)}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Product info */}
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                      {product.series}
                    </span>
                    <span className="inline-block bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white">
                      {product.grade}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-foreground">
                    View Details
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Applications */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Applications"
            subtitle="YOUJIU magnets power critical applications across diverse industries worldwide."
            centered
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APPLICATIONS.map((app, i) => (
              <div
                key={i}
                className="card-hover group overflow-hidden border border-neutral-200 bg-neutral-50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={APPLICATION_IMAGES[i] || '/images/magnet-disc.png'}
                    alt={app.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white">
                    {app.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trusted by Industry Leaders */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="Trusted by Industry Leaders"
            subtitle="Join the growing list of manufacturers who rely on YOUJIU magnets for their most demanding applications."
            centered
          />
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {CLIENT_LOGOS.map((logo) => (
              <div
                key={logo}
                className="flex h-20 items-center justify-center border border-neutral-200 bg-white"
              >
                <span className="text-sm font-semibold tracking-wide text-neutral-400">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="bg-neutral-950 py-20 lg:py-28">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
            Get a personalized quote within 24 hours. Our engineering team is
            ready to help you select the right magnet grade and shape for your
            application.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-neutral-950 transition-all hover:bg-neutral-200"
            >
              Get a Quote Now
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
