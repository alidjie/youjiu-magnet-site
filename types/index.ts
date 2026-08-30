export interface Product {
  id: string
  name: string
  slug: string
  category: 'sintered' | 'bonded' | 'assembly'
  series: string
  grade: string
  shape: string
  description: string
  specs: Record<string, string>
  images: string[]
  seo_title: string | null
  seo_description: string | null
  seo_keywords: string | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  product_requirement: string | null
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}
