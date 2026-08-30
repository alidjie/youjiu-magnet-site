'use client'

import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-bold text-gray-900">Add New Product</h2>
      <ProductForm mode="create" />
    </div>
  )
}
