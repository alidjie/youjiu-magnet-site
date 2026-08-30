'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminSidebar from '@/components/admin/AdminSidebar'
import type { User } from '@supabase/supabase-js'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false)
      return
    }

    const supabase = createClient()

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/admin/login')
        return
      }

      setUser(session.user)
      setLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace('/admin/login')
        } else {
          setUser(session.user)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, pathname, isLoginPage])

  if (isLoginPage) {
    return <>{children}</>
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />
      <div className="ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <h1 className="text-sm font-semibold tracking-wide text-gray-900">
            YOUJIU Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
