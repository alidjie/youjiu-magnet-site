import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import SectionTitle from '@/components/SectionTitle'
import { PRODUCT_SERIES, getProductImage } from '@/lib/site-data'
import type { Product } from '@/types'

export const metadata = {
  title: 'Products & Services',
  description:
    'Explore YOUJIU\'s range of NdFeB magnets: sintered NdFeB (N35-N52, high-temp grades), bonded NdFeB, and custom magnetic assemblies. Full magnetic specifications and shapes available.',
}

const CATEGORIES = [
  { key: 'sintered', label: 'Sintered NdFeB', description: 'High-energy permanent magnets with BHmax up to 55 MGOe.' },
  { key: 'bonded', label: 'Bonded NdFeB', description: 'Isotropic and anisotropic bonded magnets for complex geometries.' },
  { key: 'assembly', label: 'Magnetic Assemblies', description: 'Engineered assemblies with steel yokes, housings, and rotors.' },
] as const

// NdFeB magnetic property specifications (CGS units)
const MAGNET_SPECS = [
  { grade: 'N35', br: '11.7-12.1', hcb: '>=10.9', hcj: '>=12.0', bhmax: '33-36', maxTemp: '80' },
  { grade: 'N42', br: '12.9-13.2', hcb: '>=11.3', hcj: '>=12.0', bhmax: '40-43', maxTemp: '80' },
  { grade: 'N52', br: '14.3-14.7', hcb: '>=11.3', hcj: '>=12.0', bhmax: '50-53', maxTemp: '80' },
  { grade: '35M', br: '11.7-12.1', hcb: '>=10.9', hcj: '>=14.0', bhmax: '33-36', maxTemp: '100' },
  { grade: '42M', br: '12.9-13.2', hcb: '>=11.6', hcj: '>=14.0', bhmax: '40-43', maxTemp: '100' },
  { grade: '30H', br: '10.8-11.2', hcb: '>=10.2', hcj: '>=17.0', bhmax: '28-31', maxTemp: '120' },
  { grade: '42H', br: '12.9-13.2', hcb: '>=11.6', hcj: '>=17.0', bhmax: '40-43', maxTemp: '120' },
  { grade: '30SH', br: '10.8-11.2', hcb: '>=10.2', hcj: '>=20.0', bhmax: '28-31', maxTemp: '150' },
  { grade: '42SH', br: '12.9-13.2', hcb: '>=11.6', hcj: '>=20.0', bhmax: '40-43', maxTemp: '150' },
  { grade: '30UH', br: '10.8-11.2', hcb: '>=10.2', hcj: '>=25.0', bhmax: '28-31', maxTemp: '180' },
  { grade: '35UH', br: '11.7-12.1', hcb: '>=10.9', hcj: '>=25.0', bhmax: '33-36', maxTemp: '180' },
  { grade: '28EH', br: '10.4-10.8', hcb: '>=9.8', hcj: '>=30.0', bhmax: '26-29', maxTemp: '200' },
  { grade: '33EH', br: '11.3-11.7', hcb: '>=10.6', hcj: '>=30.0', bhmax: '31-34', maxTemp: '200' },
]

const SHAPES = [
  { name: 'Block', svg: <rect x="4" y="6" width="16" height="12" rx="1" /> },
  { name: 'Disc', svg: <circle cx="12" cy="12" r="8" /> },
  { name: 'Ring', svg: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /></> },
  { name: 'Arc', svg: <path d="M4 18 A8 8 0 0 1 20 18 L16 18 A4 4 0 0 0 8 18 Z" /> },
  { name: 'Cylinder', svg: <><ellipse cx="12" cy="6" rx="6" ry="2.5" /><path d="M6 6v12" /><path d="M18 6v12" /><ellipse cx="12" cy="18" rx="6" ry="2.5" /></> },
  { name: 'Custom', svg: <path d="M6 4 L18 4 L20 10 L16 14 L18 20 L6 20 L4 14 L8 10 Z" /> },
]

// Fallback products grouped by category
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'fp1', name: 'Sintered NdFeB Block Magnet N42', slug: 'sintered-block-n42',
    category: 'sintered', series: 'N Series', grade: 'N42', shape: 'Block',
    description: 'High-performance sintered NdFeB block magnet with NiCuNi coating.',
    specs: { Br: '12.9-13.2 kGs', BHmax: '40-43 MGOe' },
    images: ['/images/magnet-block.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 1,
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp2', name: 'Sintered NdFeB Ring Magnet N48SH', slug: 'sintered-ring-n48sh',
    category: 'sintered', series: 'SH Series', grade: 'N48SH', shape: 'Ring',
    description: 'High-temperature ring magnet for motor applications, rated up to 150C.',
    specs: { Br: '13.6-14.0 kGs', BHmax: '45-48 MGOe' },
    images: ['/images/magnet-ring.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 2,
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp3', name: 'Sintered NdFeB Arc Segment N35SH', slug: 'sintered-arc-n35sh',
    category: 'sintered', series: 'SH Series', grade: 'N35SH', shape: 'Arc',
    description: 'Precision arc segment magnet for motor rotors with tight tolerances.',
    specs: { Br: '11.7-12.1 kGs', BHmax: '33-36 MGOe' },
    images: ['/images/magnet-arc.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 3,
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp4', name: 'Sintered NdFeB Cylinder N52', slug: 'sintered-cylinder-n52',
    category: 'sintered', series: 'N Series', grade: 'N52', shape: 'Cylinder',
    description: 'Maximum energy product cylinder magnet for high-force applications.',
    specs: { Br: '14.3-14.7 kGs', BHmax: '50-53 MGOe' },
    images: ['/images/magnet-disc.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 4,
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp5', name: 'Bonded NdFeB Disc Magnet BNI-6', slug: 'bonded-disc-bni6',
    category: 'bonded', series: 'Bonded NdFeB', grade: 'BNI-6', shape: 'Disc',
    description: 'Injection-molded bonded NdFeB disc for sensor applications.',
    specs: { Br: '6.0-6.5 kGs', BHmax: '5-6 MGOe' },
    images: ['/images/magnet-disc.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 5,
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'fp6', name: 'Magnetic Assembly - Rotor Stack', slug: 'assembly-rotor-stack',
    category: 'assembly', series: 'Magnetic Assemblies', grade: 'Custom', shape: 'Assembly',
    description: 'Pre-assembled rotor magnet stack with steel yoke integration.',
    specs: { Type: 'Rotor Assembly', Material: 'NdFeB + Steel' },
    images: ['/images/solution-automotive.png'],
    seo_title: null, seo_description: null, seo_keywords: null,
    is_featured: true, is_published: true, sort_order: 6,
    created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z',
  },
]

export default async function ProductsPage() {
  // Fetch all published products from Supabase
  let products: Product[] = FALLBACK_PRODUCTS
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    if (!error && data && data.length > 0) {
      products = data as Product[]
    }
  } catch {
    // Supabase not configured -- use fallback data
  }

  return (
    <>
      {/* 1. Page Title */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="Products & Services"
            subtitle="Comprehensive NdFeB magnet solutions from standard grades to custom-engineered assemblies, manufactured to the highest quality standards."
          />
        </div>
      </section>

      {/* 2. Category Navigation */}
      <section className="border-y border-neutral-200 bg-white py-6">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.key}
                href={`#category-${cat.key}`}
                className="border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product List by Category */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-20">
          {CATEGORIES.map((cat) => {
            const categoryProducts = products.filter(
              (p) => p.category === cat.key
            )
            return (
              <div key={cat.key} id={`category-${cat.key}`}>
                <div className="mb-10 border-l-4 border-neutral-900 pl-6">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {cat.label}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                {categoryProducts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryProducts.map((product) => (
                      <div
                        key={product.id}
                        className="card-hover group overflow-hidden border border-neutral-200 bg-white"
                      >
                                                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                            <Image
                              src={getProductImage(product.shape)}
                              alt={product.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600">
                                {product.series}
                              </span>
                              <span className="bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white">
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
                    <p className="text-sm text-muted-foreground">
                      Products in this category are being updated. Please contact us for details.
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. NdFeB Magnetic Properties Reference Table */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="NdFeB Magnetic Properties Reference"
            subtitle="Standard NdFeB magnet grades with typical magnetic properties in CGS units. Custom grades available upon request."
            centered
          />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-neutral-900 bg-white">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Grade</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Br (kGs)</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Hcb (kOe)</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Hcj (kOe)</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">BHmax (MGOe)</th>
                  <th className="px-4 py-3 text-right font-semibold text-foreground">Max Temp (C)</th>
                </tr>
              </thead>
              <tbody>
                {MAGNET_SPECS.map((spec, i) => {
                  // Determine series group boundary for visual separation
                  const isSeriesStart =
                    i === 0 ||
                    MAGNET_SPECS[i - 1].grade.charAt(0) !== spec.grade.charAt(0) ||
                    (spec.grade.includes('M') && !MAGNET_SPECS[i - 1].grade.includes('M')) ||
                    (spec.grade.includes('SH') && !MAGNET_SPECS[i - 1].grade.includes('SH')) ||
                    (spec.grade.includes('UH') && !MAGNET_SPECS[i - 1].grade.includes('UH')) ||
                    (spec.grade.includes('EH') && !MAGNET_SPECS[i - 1].grade.includes('EH') &&
                     !spec.grade.includes('SH') && !spec.grade.includes('UH'))
                  return (
                    <tr
                      key={spec.grade}
                      className={`border-b border-neutral-200 ${isSeriesStart ? 'border-t-2 border-t-neutral-300' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
                    >
                      <td className="px-4 py-2.5 font-medium text-foreground">{spec.grade}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-neutral-700">{spec.br}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-neutral-700">{spec.hcb}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-neutral-700">{spec.hcj}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-neutral-700">{spec.bhmax}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-neutral-700">{spec.maxTemp}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            * Values are typical ranges. Actual properties may vary by production batch.
            Contact our engineering team for detailed specifications and custom requirements.
          </p>

          {/* Temperature series summary */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_SERIES.map((series) => (
              <div key={series.name} className="border border-neutral-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{series.name}</h3>
                  <span className="bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white">
                    {series.maxTemp}
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-500">{series.gradeRange}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {series.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Product Shapes */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Available Shapes"
            subtitle="We manufacture NdFeB magnets in a wide variety of shapes and sizes, from miniatures to large blocks. Custom shapes available upon request."
            centered
          />
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {SHAPES.map((shape) => (
              <div
                key={shape.name}
                className="card-hover border border-neutral-200 bg-neutral-50 p-8 text-center"
              >
                <div className="flex h-20 items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-16 w-16 text-neutral-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {shape.svg}
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-foreground">{shape.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-neutral-950 py-20 lg:py-28">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Need a Custom Magnet?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
            Our engineering team can help you select the right grade, shape, and coating
            for your specific application. Get a quote within 24 hours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-neutral-950 transition-all hover:bg-neutral-200"
            >
              Request a Quote
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:border-white hover:bg-white/10"
            >
              View Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
