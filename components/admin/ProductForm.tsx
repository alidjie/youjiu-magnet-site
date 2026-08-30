'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/types'

interface ProductFormProps {
  mode: 'create' | 'edit'
  product?: Product
}

interface SpecItem {
  key: string
  value: string
}

const CATEGORY_OPTIONS = [
  { value: 'sintered', label: 'Sintered NdFeB' },
  { value: 'bonded', label: 'Bonded NdFeB' },
  { value: 'assembly', label: 'Magnetic Assembly' },
]

const COMMON_SPEC_KEYS = ['Br', 'Hcb', 'Hcj', 'BHmax', 'Max Operating Temp']

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const inputClass =
  'w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black'
const labelClass =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-600'
const sectionClass = 'rounded-lg border border-gray-200 bg-white p-6'

export default function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Basic info
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [slugEdited, setSlugEdited] = useState(mode === 'edit')
  const [category, setCategory] = useState<
    'sintered' | 'bonded' | 'assembly'
  >(product?.category || 'sintered')
  const [series, setSeries] = useState(product?.series || '')
  const [grade, setGrade] = useState(product?.grade || '')
  const [shape, setShape] = useState(product?.shape || '')

  // Description
  const [description, setDescription] = useState(product?.description || '')

  // Specs
  const [specs, setSpecs] = useState<SpecItem[]>(
    product?.specs
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
      : []
  )

  // Images
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [uploading, setUploading] = useState(false)

  // SEO
  const [seoTitle, setSeoTitle] = useState(product?.seo_title || '')
  const [seoDescription, setSeoDescription] = useState(
    product?.seo_description || ''
  )
  const [seoKeywords, setSeoKeywords] = useState(product?.seo_keywords || '')

  // Settings
  const [isFeatured, setIsFeatured] = useState(product?.is_featured || false)
  const [isPublished, setIsPublished] = useState(
    product?.is_published || false
  )
  const [sortOrder, setSortOrder] = useState(product?.sort_order ?? 0)

  // Form state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugEdited) {
      setSlug(generateSlug(value))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlug(value)
    setSlugEdited(true)
  }

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }])
  }

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index))
  }

  const handleSpecChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const updated = [...specs]
    updated[index][field] = value
    setSpecs(updated)
  }

  const handleAddCommonSpec = (key: string) => {
    if (specs.some((s) => s.key === key)) return
    setSpecs([...specs, { key, value: '' }])
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError('')

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Upload failed')
        }

        const { url } = await res.json()
        setImages((prev) => [...prev, url])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const validate = (): boolean => {
    const errors: Record<string, string> = {}
    if (!name.trim()) errors.name = 'Name is required'
    if (!slug.trim()) errors.slug = 'Slug is required'
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validate()) return

    setLoading(true)

    const specsObj: Record<string, string> = {}
    specs.forEach((spec) => {
      if (spec.key.trim() && spec.value.trim()) {
        specsObj[spec.key.trim()] = spec.value.trim()
      }
    })

    const payload = {
      name: name.trim(),
      slug: slug.trim() || generateSlug(name),
      category,
      series: series.trim(),
      grade: grade.trim(),
      shape: shape.trim(),
      description: description.trim(),
      specs: specsObj,
      images,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      seo_keywords: seoKeywords.trim() || null,
      is_featured: isFeatured,
      is_published: isPublished,
      sort_order: Number(sortOrder) || 0,
    }

    try {
      if (mode === 'create') {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to create product')
        }
      } else {
        const res = await fetch(`/api/products/${product!.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Failed to update product')
        }
      }
      router.push('/admin/products')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    router.push('/admin/products')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className={sectionClass}>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={inputClass}
              placeholder="e.g. N42 Sintered NdFeB Disc Magnet"
            />
            {validationErrors.name && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="slug" className={labelClass}>
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              id="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className={inputClass}
              placeholder="auto-generated-from-name"
            />
            {validationErrors.slug && (
              <p className="mt-1 text-xs text-red-600">
                {validationErrors.slug}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value as 'sintered' | 'bonded' | 'assembly'
                )
              }
              className={inputClass}
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="series" className={labelClass}>
              Series
            </label>
            <input
              id="series"
              type="text"
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              className={inputClass}
              placeholder="e.g. N Series"
            />
          </div>
          <div>
            <label htmlFor="grade" className={labelClass}>
              Grade
            </label>
            <input
              id="grade"
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className={inputClass}
              placeholder="e.g. N42"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="shape" className={labelClass}>
              Shape
            </label>
            <input
              id="shape"
              type="text"
              value={shape}
              onChange={(e) => setShape(e.target.value)}
              className={inputClass}
              placeholder="e.g. Disc, Block, Ring, Arc"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className={sectionClass}>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Description
        </h3>
        <label htmlFor="description" className={labelClass}>
          Product Description
        </label>
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          placeholder="Detailed product description..."
        />
      </div>

      {/* Specs */}
      <div className={sectionClass}>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Specifications
        </h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {COMMON_SPEC_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleAddCommonSpec(key)}
              className="rounded border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              + {key}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={spec.key}
                onChange={(e) =>
                  handleSpecChange(index, 'key', e.target.value)
                }
                className={`${inputClass} flex-1`}
                placeholder="Spec name (e.g. Br)"
              />
              <input
                type="text"
                value={spec.value}
                onChange={(e) =>
                  handleSpecChange(index, 'value', e.target.value)
                }
                className={`${inputClass} flex-1`}
                placeholder="Spec value (e.g. 12.5 kG)"
              />
              <button
                type="button"
                onClick={() => handleRemoveSpec(index)}
                className="rounded border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddSpec}
          className="mt-3 rounded border border-dashed border-gray-300 px-4 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          + Add Spec
        </button>
      </div>

      {/* Images */}
      <div className={sectionClass}>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Product Images
        </h3>
        {images.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Product image ${index + 1}`}
                  className="aspect-square w-full rounded-lg border border-gray-200 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute right-1 top-1 rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 ${
              uploading ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Select Images'}
          </label>
          <span className="text-xs text-gray-500">
            JPEG, PNG, WebP, GIF - Max 5MB each
          </span>
        </div>
      </div>

      {/* SEO */}
      <div className={sectionClass}>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          SEO Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="seo_title" className={labelClass}>
              SEO Title
            </label>
            <input
              id="seo_title"
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className={inputClass}
              placeholder="Custom title for search engines"
            />
          </div>
          <div>
            <label htmlFor="seo_description" className={labelClass}>
              SEO Description
            </label>
            <textarea
              id="seo_description"
              rows={3}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              className={inputClass}
              placeholder="Meta description for search engines"
            />
          </div>
          <div>
            <label htmlFor="seo_keywords" className={labelClass}>
              SEO Keywords
            </label>
            <input
              id="seo_keywords"
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              className={inputClass}
              placeholder="Comma-separated keywords"
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className={sectionClass}>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Settings</h3>
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Featured Product</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Published</span>
          </label>
          <div className="flex items-center gap-2">
            <label htmlFor="sort_order" className="text-sm text-gray-700">
              Sort Order
            </label>
            <input
              id="sort_order"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className={`${inputClass} w-24`}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? 'Saving...'
            : mode === 'create'
              ? 'Create Product'
              : 'Update Product'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
