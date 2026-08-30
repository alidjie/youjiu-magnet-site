import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { ContactSubmission } from '@/types'

export const dynamic = 'force-dynamic'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return text.slice(0, max) + '...'
}

const STATUS_FILTERS = [
  { label: 'All', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' },
]

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return null
  }

  const { status } = await searchParams
  const currentStatus = status || ''

  let query = supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (currentStatus && ['new', 'read', 'replied'].includes(currentStatus)) {
    query = query.eq('status', currentStatus)
  }

  const { data } = await query
  const inquiries = (data as ContactSubmission[] | null) ?? []

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Inquiries</h2>
        <p className="mt-1 text-sm text-gray-500">
          Customer contact form submissions
        </p>
      </div>

      {/* Status filter */}
      <div className="mb-4 flex gap-2">
        {STATUS_FILTERS.map((filter) => {
          const isActive = currentStatus === filter.value
          const href = filter.value
            ? `/admin/inquiries?status=${filter.value}`
            : '/admin/inquiries'
          return (
            <Link
              key={filter.label}
              href={href}
              className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-black text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </Link>
          )
        })}
      </div>

      {inquiries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white py-20 text-center">
          <p className="text-sm text-gray-500">No inquiries found.</p>
        </div>
      ) : (
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
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Requirement
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Message
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
              {inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="border-b border-gray-100 last:border-0 align-top"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {inquiry.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="hover:text-black"
                    >
                      {inquiry.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {inquiry.company || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {inquiry.phone || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {inquiry.product_requirement
                      ? truncate(inquiry.product_requirement, 40)
                      : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <details>
                      <summary className="cursor-pointer text-gray-600 hover:text-black">
                        {truncate(inquiry.message, 60)}
                      </summary>
                      <div className="mt-2 whitespace-pre-wrap rounded bg-gray-50 p-3 text-sm text-gray-700">
                        {inquiry.message}
                      </div>
                    </details>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
