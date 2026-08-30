'use client'

import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/site-data'

interface NavbarProps {
  active?: string
}

export default function Navbar({ active }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <nav className="container-custom flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            YOUJIU
          </span>
        </Link>

        {/* Nav items */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                active === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="/contact" className="btn-primary text-sm">
          Get Quote
        </Link>
      </nav>
    </header>
  )
}
