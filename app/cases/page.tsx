import Link from 'next/link'
import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'

export const metadata = {
  title: 'Customer Success Stories',
  description:
    'Real-world case studies showing how YOUJIU NdFeB magnets solved challenges in EV motors, wind energy, audio, and industrial automation. Proven results with measurable outcomes.',
}

const CASES = [
  {
    industry: 'Automotive',
    title: 'EV Traction Motor Magnet Solution',
    image: 'https://images.unsplash.com/photo-1567789884554-a7264f1a7226?w=800&q=80',
    overview:
      'A leading EV manufacturer needed high-temperature arc magnets for their next-generation traction motor program. The magnets had to maintain performance at 150C while meeting strict automotive quality standards.',
    product: 'Sintered NdFeB Arc Magnets (N42SH)',
    result: '30% efficiency improvement',
    resultLabel: 'Motor Efficiency',
  },
  {
    industry: 'Wind Energy',
    title: 'Offshore Wind Turbine Generator',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
    overview:
      'An offshore wind farm developer required large-volume UH-grade block magnets for a 10MW turbine generator. The magnets needed to withstand salt spray and maintain performance over a 25-year service life.',
    product: 'Sintered NdFeB Block Magnets (N35UH)',
    result: '25-year design life',
    resultLabel: 'Operational Lifespan',
  },
  {
    industry: 'Consumer Electronics',
    title: 'Premium Audio Speaker Magnets',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    overview:
      'A premium audio brand needed high-grade ring magnets for their flagship headphone line. The magnets had to deliver powerful, distortion-free sound in a compact form factor.',
    product: 'Sintered NdFeB Ring Magnets (N48)',
    result: '40% louder output',
    resultLabel: 'Sound Pressure Level',
  },
  {
    industry: 'Industrial Automation',
    title: 'Magnetic Separation System',
    image: 'https://images.unsplash.com/photo-1581092160615-0d3a5c9e8a3e?w=800&q=80',
    overview:
      'A mining company required a custom magnetic assembly for their mineral separation conveyor system. The system needed to achieve high separation efficiency while handling abrasive materials.',
    product: 'Magnetic Assembly - Separator Bar',
    result: '99.8% separation efficiency',
    resultLabel: 'Separation Rate',
  },
]

const PROCESS_STEPS = [
  {
    title: 'Requirement Analysis',
    description:
      'We analyze your application requirements, including magnetic force, operating temperature, environmental conditions, and dimensional constraints.',
  },
  {
    title: 'Solution Design',
    description:
      'Our engineering team designs the optimal magnet grade, shape, and coating, validated through FEA simulation and performance modeling.',
  },
  {
    title: 'Sample Development',
    description:
      'We produce prototype samples for your testing and validation, with iterative refinement based on real-world performance data.',
  },
  {
    title: 'Mass Production',
    description:
      'We scale to full production with rigorous quality control, on-time delivery, and ongoing technical support throughout the product lifecycle.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'YOUJIU\'s engineering team helped us optimize our magnet design, resulting in a 30% efficiency improvement in our EV traction motors. Their technical expertise and responsive service are exceptional.',
    name: 'Zhang Wei',
    title: 'R&D Director, MotorTech',
  },
  {
    quote:
      'The quality and consistency of YOUJIU\'s magnets have been outstanding. We\'ve been using their products for over 5 years with zero field failures. They are a trusted partner for our wind energy projects.',
    name: 'Sarah Chen',
    title: 'Procurement Manager, WindCorp',
  },
]

export default function CasesPage() {
  return (
    <>
      {/* 1. Page Title */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="Customer Success Stories"
            subtitle="Real-world applications where YOUJIU magnets delivered measurable results. From EV motors to wind turbines, discover how our engineering expertise solves complex magnetic challenges."
          />
        </div>
      </section>

      {/* 2. Case Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {CASES.map((item) => (
              <div
                key={item.title}
                className="card-hover group overflow-hidden border border-neutral-200 bg-white"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute left-4 top-4 bg-neutral-900 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                    {item.industry}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.overview}
                  </p>
                  <div className="mt-4 border-t border-neutral-100 pt-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Product Used
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {item.product}
                    </p>
                  </div>
                  {/* Result highlight */}
                  <div className="mt-6 flex items-end justify-between border-t border-neutral-100 pt-6">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                        {item.resultLabel}
                      </p>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">
                        {item.result}
                      </p>
                    </div>
                    <svg className="h-8 w-8 text-neutral-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How We Work */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="How We Work"
            subtitle="A proven four-step process that transforms your requirements into production-ready magnetic solutions."
            centered
          />
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-neutral-900 bg-neutral-900 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Trusted by manufacturers worldwide for quality, reliability, and engineering expertise."
            centered
          />
          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="border border-neutral-200 bg-neutral-50 p-8 lg:p-10"
              >
                <svg className="h-10 w-10 text-neutral-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <blockquote className="mt-6 text-base leading-relaxed text-foreground">
                  {t.quote}
                </blockquote>
                <div className="mt-6 border-t border-neutral-200 pt-4">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-neutral-950 py-20 lg:py-28">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Write Your Success Story?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
            Join the manufacturers who trust YOUJIU for their most demanding magnetic applications.
            Get a personalized quote within 24 hours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-neutral-950 transition-all hover:bg-neutral-200"
            >
              Get a Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:border-white hover:bg-white/10"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
