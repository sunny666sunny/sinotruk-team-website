import type { FactPacket } from './types'

export interface GeneratedArticle {
  title: string
  slug: string
  excerpt: string
  body: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  relatedProductIds: string[]
  sourceUrl: string
  sourceTitle: string
  sourceDate?: string
}

export function buildEditorialPrompt(packet: FactPacket) {
  return `Write an original English commercial-truck procurement article using only this verified fact packet. Serve one clear buyer search intent and choose a structure that fits this topic instead of a generic five-paragraph template. Add practical information gain through a checklist, comparison method, verification boundary, or RFQ fields supported by the packet. Do not copy long phrases. Do not add numbers, model names, quotations, prices, rankings, authorization, warranty, financing, availability, delivery promises, or product claims that are absent from the facts. Do not use "complete guide" or a year as a title formula. Do not stuff keywords. Do not state that SINOTRUK TEAM is the manufacturer. Return strict JSON matching the GeneratedArticle contract for human review; never imply that the draft is approved for automatic publication.\n\n${JSON.stringify(packet)}`
}
