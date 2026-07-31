export type RelatedLink = { label: string; href: string }
export type RelatedLinkInput = { currentPath: string; candidates: RelatedLink[]; limit?: number }

export function resolveRelatedLinks({ currentPath, candidates, limit = candidates.length }: RelatedLinkInput): RelatedLink[] {
  const seen = new Set([currentPath])
  return candidates.filter(({ label, href }) => {
    if (!label.trim() || !href.startsWith('/') || href.startsWith('//') || seen.has(href)) return false
    seen.add(href)
    return true
  }).slice(0, limit)
}
