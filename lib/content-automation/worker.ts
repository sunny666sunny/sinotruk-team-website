import { fingerprintUrl } from './fingerprint'
import type { FeedItem } from './types'

export type ContentSource = { id: string; enabled: boolean; dailyLimit: number; feedUrl: string }
export type WorkerDeps = { fetchFeed: (source: ContentSource) => Promise<FeedItem[]>; createJob: (item: FeedItem, source: ContentSource) => Promise<boolean> }

export async function runSourceOnce(source: ContentSource, deps: WorkerDeps) {
  if (!source.enabled || source.dailyLimit < 1) return { queued: 0, duplicates: 0, skippedByLimit: 0 }
  const items = await deps.fetchFeed(source)
  let queued = 0
  let duplicates = 0
  let skippedByLimit = 0
  for (const item of items) {
    if (queued >= source.dailyLimit) { skippedByLimit += 1; continue }
    const created = await deps.createJob({ ...item, url: new URL(item.url).toString() }, source)
    if (created) queued += 1
    else duplicates += 1
  }
  return { queued, duplicates, skippedByLimit }
}

export function queuedJobData(item: FeedItem, sourceId: string) {
  return { sourceId, sourceUrl: item.url, fingerprint: fingerprintUrl(item.url), sourceTitle: item.title, sourceDate: item.date || null, status: 'queued' }
}
