import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/types'

export async function GET() {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data as Product[])
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const name = (body.name as string)?.trim()
  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const slug = ((body.slug as string)?.trim() || generateSlug(name))

  const now = new Date().toISOString()

  const product = {
    name,
    slug,
    category: body.category || 'sintered',
    series: body.series || '',
    grade: body.grade || '',
    shape: body.shape || '',
    description: body.description || '',
    specs: body.specs || {},
    images: body.images || [],
    seo_title: body.seo_title || null,
    seo_description: body.seo_description || null,
    seo_keywords: body.seo_keywords || null,
    is_featured: body.is_featured || false,
    is_published: body.is_published || false,
    sort_order: body.sort_order ?? 0,
    created_at: now,
    updated_at: now,
  }

  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data as Product, { status: 201 })
}
