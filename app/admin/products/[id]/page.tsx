import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/types'
import ProductForm from '@/components/admin/ProductForm'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return null
  }

  const { id } = await params

  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!data) {
    notFound()
  }

  const product = data as Product

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-gray-900">Edit Product</h2>
      <ProductForm mode="edit" product={product} />
    </div>
  )
}
