import Link from 'next/link'
import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import { getAllSolutions } from '@/lib/solutions'

// Pre-render solutions at build time for SEO
export const dynamic = 'force-static'

export function generateMetadata() {
  const solutions = getAllSolutions()
  const industries = solutions.map(s => s.industry).join(', ')
  return {
    title: 'Industry Solutions | YOUJIU NdFeB Magnets',
    description: `YOUJIU provides tailored NdFeB magnet solutions for ${industries}. Custom engineering from design to production.`,
  }
}

const CAPABILITIES = [
  {
    title: 'Magnetic Circuit Design',
    description:
      'Custom magnetic circuit design using finite element analysis (FEA) to optimize flux distribution, field direction, and magnetic force for your specific application.',
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
      </>
    ),
  },
  {
    title: 'Simulation & Analysis',
    description:
      'Advanced electromagnetic simulation and thermal analysis to predict magnet performance under real-world operating conditions before prototyping.',
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 14l3-4 4 3 5-7" />
        <circle cx="7" cy="14" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="13" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: 'Custom Tooling',
    description:
      'In-house tooling design and fabrication for specialized magnet shapes, multi-pole magnetization patterns, and assembly fixtures.',
    icon: (
      <>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </>
    ),
  },
  {
    title: 'Quality Testing',
    description:
      'Comprehensive testing including flux measurement, demagnetization curve analysis, salt spray testing, and dimensional inspection with full reporting.',
    icon: (
      <>
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2L4 6v6c0 5 3.5 9.5 8 11c4.5-1.5 8-6 8-11V6L12 2z" />
      </>
    ),
  },
]

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description:
      'We discuss your application requirements, performance targets, operating environment, and budget constraints to define the project scope.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Our engineers create detailed magnetic circuit designs with FEA simulation, selecting the optimal grade, shape, and coating for your application.',
  },
  {
    number: '03',
    title: 'Prototyping',
    description:
      'We produce sample magnets and assemblies for testing and validation in your application, with iterative refinement based on your feedback.',
  },
  {
    number: '04',
    title: 'Production',
    description:
      'We scale to full production with rigorous quality control, on-time delivery, and ongoing technical support throughout the product lifecycle.',
  },
]

export default function SolutionsPage() {
  const SOLUTIONS = getAllSolutions()

  return (
    <>
      {/* 1. Page Title */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="Industry Solutions"
            subtitle="Tailored NdFeB magnet solutions engineered for the unique demands of each industry. From material selection to volume production, YOUJIU delivers precision magnetic components that power critical applications worldwide."
          />
        </div>
      </section>

      {/* 2. Industry Solutions (alternating layout) */}
      <section className="section-padding bg-white">
        <div className="container-custom space-y-24">
          {SOLUTIONS.map((sol, i) => (
            <div key={sol.title} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              {/* Image */}
              <div className={`relative aspect-[3/2] overflow-hidden bg-neutral-100 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={sol.image}
                  alt={sol.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                <span className="inline-block bg-neutral-900 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                  Industry Solution
                </span>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {sol.title}
                </h2>
                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                      The Challenge
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {sol.painPoint}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                      The YOUJIU Solution
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {sol.youjiuSolution}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {sol.advantages.map((adv) => (
                    <li key={adv} className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-900" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm text-foreground">{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Capabilities */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="Our Capabilities"
            subtitle="Full-service magnetic engineering from concept to production, backed by advanced simulation, precision manufacturing, and rigorous quality assurance."
            centered
          />
          <div className="mt-16 grid grid-cols-1 gap-px bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="card-hover group bg-white p-8 lg:p-10">
                <div className="flex h-14 w-14 items-center justify-center border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {cap.icon}
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Custom Development Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            title="Custom Development Process"
            subtitle="A structured four-step process that transforms your requirements into production-ready magnetic solutions."
            centered
          />
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="relative">
                <span className="block text-5xl font-bold tracking-tight text-neutral-200">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-neutral-950 py-20 lg:py-28">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Have a Magnetic Challenge?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
            Our engineering team is ready to help you design the optimal magnet solution
            for your application. Share your requirements and get a proposal within 48 hours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-neutral-950 transition-all hover:bg-neutral-200"
            >
              Start Your Project
            </Link>
            <Link
              href="/cases"
              className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:border-white hover:bg-white/10"
            >
              View Success Stories
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
