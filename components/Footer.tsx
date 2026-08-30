import Link from 'next/link'
import { COMPANY, NAV_ITEMS } from '@/lib/site-data'

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Company info */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              {COMPANY.name}
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Premium NdFeB (Neodymium Iron Boron) magnet manufacturer.
              Precision-engineered magnetic solutions for global industries.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="transition-colors hover:text-white"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp.replace(/\s+/g, '').replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp: {COMPANY.whatsapp}
                </a>
              </li>
              <li className="leading-relaxed">{COMPANY.address}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <p className="text-center text-xs text-gray-500">
            &copy; 2024 {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
