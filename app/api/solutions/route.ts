import { NextRequest, NextResponse } from 'next/server'
import { getAllSolutions } from '@/lib/solutions'
import type { Solution } from '@/types'

export const dynamic = 'force-static'

export async function GET() {
  const solutions = getAllSolutions()
  return NextResponse.json({
    total: solutions.length,
    solutions: solutions.map(s => ({
      title: s.title,
      slug: s.slug,
      industry: s.industry,
      seoTitle: s.seoTitle,
      seoKeywords: s.seoKeywords,
    })),
  })
}

/**
 * POST endpoint for creating new solutions via cron job.
 *
 * This endpoint does NOT write to the filesystem (Vercel is read-only).
 * Instead, the DuMate scheduler agent creates the JSON file and pushes
 * it to GitHub via the Contents API, triggering a Vercel rebuild.
 *
 * This endpoint validates the payload and returns the file content
 * that should be pushed to GitHub.
 */
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const title = (body.title as string)?.trim()
  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 })
  }

  const slug = (body.slug as string)?.trim() || title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const solution: Solution = {
    title,
    slug,
    industry: (body.industry as string) || 'General Industry',
    painPoint: (body.painPoint as string) || '',
    youjiuSolution: (body.youjiuSolution as string) || '',
    advantages: (body.advantages as string[]) || [],
    image: (body.image as string) || '/images/solution-automotive.png',
    seoTitle: (body.seoTitle as string) || `${title} | YOUJIU`,
    seoDescription: (body.seoDescription as string) || '',
    seoKeywords: (body.seoKeywords as string) || '',
    published: true,
    sortOrder: (body.sortOrder as number) || 999,
  }

  return NextResponse.json({
    success: true,
    filename: `content/solutions/${slug}.json`,
    content: JSON.stringify(solution, null, 2),
    message: 'Push this file to GitHub via Contents API to publish.',
  }, { status: 201 })
}
