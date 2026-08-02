import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

import { newsItems } from '@/data/news'
import { auditReviewedNews, highRiskContentPatterns } from '@/lib/content/editorial-audit'

const roots = ['data', 'pages', 'components']

async function sourceFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(file)
    return /\.(ts|tsx)$/.test(entry.name) ? [file] : []
  }))
  return nested.flat()
}

async function main() {
  const files = (await Promise.all(roots.map(sourceFiles))).flat()
  const sourceFindings: Array<{ file: string; pattern: string }> = []
  for (const file of files) {
    const content = await readFile(file, 'utf8')
    for (const pattern of highRiskContentPatterns) {
      if (pattern.test(content)) sourceFindings.push({ file: file.replaceAll('\\', '/'), pattern: pattern.source })
    }
  }
  const result = { reviewedNews: newsItems.length, newsFindings: auditReviewedNews(newsItems), sourceFindings }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
  if (result.newsFindings.some((item) => item.level === 'high')) process.exitCode = 1
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
})
