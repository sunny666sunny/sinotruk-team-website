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
  return `Write an original English commercial-truck procurement article using only this verified fact packet. Do not copy long phrases. Do not add numbers, model names, quotations, product claims, or delivery promises that are absent from the facts. Do not state that SINOTRUK TEAM is the manufacturer. Return strict JSON matching the GeneratedArticle contract.\n\n${JSON.stringify(packet)}`
}
