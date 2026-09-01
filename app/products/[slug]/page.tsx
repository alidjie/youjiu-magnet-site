import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SectionTitle from '@/components/SectionTitle'
import { getProductImage } from '@/lib/site-data'
import type { Product } from '@/types'

export const dynamic = 'force-dynamic'

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

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    if (!error && data) {
      return data as Product
    }
  } catch {
    // Supabase not configured
  }
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug) || null
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const imageSrc = product.images?.[0] || getProductImage(product.shape)
  const specsEntries = Object.entries(product.specs || {})

  return (
    <>
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="mb-4 flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/products" className="hover:text-neutral-900">Products</Link>
            <span>/</span>
            <span className="text-neutral-900">{product.name}</span>
          </div>
          <SectionTitle
            title={product.name}
            subtitle={product.description}
          />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-100">
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">{product.series}</span>
                <span className="bg-neutral-900 px-3 py-1 text-xs font-medium text-white">{product.grade}</span>
                <span className="border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600">{product.shape}</span>
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {product.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {specsEntries.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-900">Specifications</h3>
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {specsEntries.map(([key, value], i) => (
                        <tr key={key} className={`border-b border-neutral-200 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                          <td className="px-4 py-3 font-medium text-neutral-700">{key}</td>
                          <td className="px-4 py-3 text-right text-neutral-900">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-neutral-900 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-neutral-800"
                >
                  Request a Quote
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 border border-neutral-300 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-neutral-900 transition-all hover:border-neutral-900 hover:bg-neutral-50"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
