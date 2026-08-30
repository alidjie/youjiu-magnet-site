import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { ContactSubmission } from '@/types'

export const dynamic = 'force-dynamic'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return null
  }

  const [
    { count: totalProducts },
    { count: publishedProducts },
    { count: featuredProducts },
    { count: newInquiries },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true),
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_featured', true),
    supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new'),
    supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const stats = [
    { label: 'Total Products', value: totalProducts ?? 0 },
    { label: 'Published', value: publishedProducts ?? 0 },
    { label: 'New Inquiries', value: newInquiries ?? 0 },
    { label: 'Featured', value: featuredProducts ?? 0 },
  ]

  const inquiries = (recentInquiries as ContactSubmission[] | null) ?? []

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your magnet business
        </p>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          Add Product
        </Link>
        <Link
          href="/admin/products"
          className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          View All Products
        </Link>
        <Link
          href="/admin/inquiries"
          className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          View Inquiries
        </Link>
      </div>

      {/* Recent inquiries */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Recent Inquiries
        </h3>
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {inquiry.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {inquiry.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {inquiry.company || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {formatDate(inquiry.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                          inquiry.status === 'new'
                            ? 'bg-black text-white'
                            : inquiry.status === 'read'
                              ? 'bg-gray-200 text-gray-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    No inquiries yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
