'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Inquiries', href: '/admin/inquiries' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#0a0a0a] text-white">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="text-xl font-bold tracking-tight">
          YOUJIU
        </Link>
      </div>
      <nav className="px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-1 block rounded px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 px-6 py-4">
        <Link
          href="/"
          className="text-xs text-gray-500 transition-colors hover:text-white"
        >
          ← Back to Website
        </Link>
      </div>
    </aside>
  )
}
