import { prisma } from '../lib/db'
import { fetchSourceDocument } from '../lib/content-automation/feed'
import { parseFeed } from '../lib/content-automation/extract'
import { queuedJobData, runSourceOnce } from '../lib/content-automation/worker'

async function main() {
  const sources = await prisma.newsSource.findMany({ where: { enabled: true } })
  let queued = 0
  for (const source of sources) {
    const allowedHost = new URL(source.baseUrl).hostname
    try {
      const result = await runSourceOnce(source, {
        fetchFeed: async (item) => {
          const document = await fetchSourceDocument(item.feedUrl, { allowedHosts: [allowedHost], maxBytes: 2_000_000, timeoutMs: 10_000, maxRedirects: 3 })
          return parseFeed(document.body, document.url)
        },
        createJob: async (item, currentSource) => {
          try {
            await prisma.contentJob.create({ data: queuedJobData(item, currentSource.id) })
            return true
          } catch (error: any) {
            if (error?.code === 'P2002') return false
            throw error
          }
        },
      })
      queued += result.queued
      await prisma.newsSource.update({ where: { id: source.id }, data: { lastPolledAt: new Date(), failureCount: 0 } })
    } catch (error) {
      await prisma.newsSource.update({ where: { id: source.id }, data: { failureCount: { increment: 1 } } })
      console.error(`Content source ${source.id} failed:`, error instanceof Error ? error.message : error)
    }
  }
  console.log(`Content worker completed. Queued ${queued} item(s) from ${sources.length} enabled source(s).`)
}

main().finally(() => prisma.$disconnect())
