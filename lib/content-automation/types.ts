export interface SourcePolicy {
  allowedHosts: string[]
  maxBytes: number
  timeoutMs: number
  maxRedirects: number
}

export interface FeedItem {
  title: string
  url: string
  date?: string
}

export interface FactPacket {
  sourceUrl: string
  sourceTitle: string
  sourceDate?: string
  facts: string[]
  quotedEntities: string[]
  productHints: string[]
}
