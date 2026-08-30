import fs from 'fs'
import path from 'path'
import type { Solution } from '@/types'

const SOLUTIONS_DIR = path.join(process.cwd(), 'content', 'solutions')

export function getAllSolutions(): Solution[] {
  try {
    const files = fs.readdirSync(SOLUTIONS_DIR).filter(f => f.endsWith('.json'))

    const solutions = files.map(file => {
      const filePath = path.join(SOLUTIONS_DIR, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      return JSON.parse(raw) as Solution
    })

    return solutions
      .filter(s => s.published)
      .sort((a, b) => a.sortOrder - b.sortOrder)
  } catch {
    return []
  }
}

export function getSolutionBySlug(slug: string): Solution | null {
  const solutions = getAllSolutions()
  return solutions.find(s => s.slug === slug) || null
}
