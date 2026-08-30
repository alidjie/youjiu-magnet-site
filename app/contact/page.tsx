import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'
import ContactForm from './contact-form'
import { COMPANY } from '@/lib/site-data'

export const metadata = {
  title: 'Contact Us',
  description:
    'Contact YOUJIU for NdFeB magnet quotes, technical support, or partnership opportunities. Email, WhatsApp, and global sales network available.',
}

const SALES_NETWORK = [
  {
    region: 'Headquarters',
    location: 'Taizhou, China',
    description: 'Main manufacturing facility and global operations center.',
  },
  {
    region: 'Europe',
    location: 'Munich, Germany',
    description: 'Sales and technical support for European customers.',
  },
  {
    region: 'North America',
    location: 'Detroit, USA',
    description: 'Automotive and industrial accounts across North America.',
  },
  {
    region: 'Southeast Asia',
    location: 'Singapore',
    description: 'Regional hub for Southeast Asian markets and logistics.',
  },
]

export default function ContactPage() {
  const whatsappLink = `https://wa.me/${COMPANY.whatsapp.replace(/\s+/g, '').replace('+', '')}`

  return (
    <>
      {/* 1. Page Title */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="Contact Us"
            subtitle="Get in touch for quotes, technical support, or partnership opportunities"
          />
        </div>
      </section>

      {/* 2. Contact Form + Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Left: Contact Form */}
            <div className="border border-neutral-200 bg-white p-6 lg:p-8">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Send Us a Message
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and our team will respond within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Right: Contact Info (dark card) */}
            <div className="bg-neutral-950 p-8 text-white lg:p-10">
              <h3 className="text-xl font-bold tracking-tight">
                Contact Information
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Reach out directly through any of the following channels.
              </p>

              <div className="mt-8 space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-neutral-700 bg-neutral-900">
                    <svg className="h-5 w-5 text-neutral-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Email
                    </p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="mt-1 block text-sm text-white transition-colors hover:text-neutral-300"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-neutral-700 bg-neutral-900">
                    <svg className="h-5 w-5 text-neutral-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      WhatsApp
                    </p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-sm text-white transition-colors hover:text-neutral-300"
                    >
                      {COMPANY.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-neutral-700 bg-neutral-900">
                    <svg className="h-5 w-5 text-neutral-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="11" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Address
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-300">
                      {COMPANY.address}
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-neutral-700 bg-neutral-900">
                    <svg className="h-5 w-5 text-neutral-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      Business Hours
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-300">
                      Monday - Friday, 9:00 - 18:00 (GMT+8)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick CTA */}
              <div className="mt-8 border-t border-neutral-800 pt-6">
                <p className="text-sm text-neutral-400">
                  Need an urgent response? Message us on WhatsApp for priority support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Global Sales Network */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionTitle
            title="Global Sales Network"
            subtitle="With headquarters in China and regional representatives worldwide, YOUJIU provides local support to customers across the globe."
            centered
          />
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SALES_NETWORK.map((office) => (
              <div
                key={office.region}
                className="card-hover border border-neutral-200 bg-white p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-neutral-900 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="11" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {office.region}
                </h3>
                <p className="mt-1 text-sm font-medium text-neutral-900">
                  {office.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {office.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="bg-neutral-950 py-20 lg:py-28">
        <div className="container-custom text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s Build Something Together
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-neutral-400">
            Whether you need standard grade magnets or a fully custom magnetic assembly,
            our team is ready to help. Send us your specifications today.
          </p>
          <div className="mt-10">
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-neutral-950 transition-all hover:bg-neutral-200"
            >
              Email Us Directly
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
