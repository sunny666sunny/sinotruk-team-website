import type { NextApiResponse } from 'next'
import { submitToIndexNow } from '@/lib/seo/submission'

const unscoped = (value: string) => value.includes(':') ? value.split(':').slice(1).join(':') : value

export function productPublicPath(categoryId: string, subcategoryId: string, id: string) {
  let category = categoryId === 'new-energy' ? 'new-energy-vehicle' : categoryId
  let subcategory = unscoped(subcategoryId)
  if (category === 'light-vehicle' && ['cargo-truck', 'light-cargo', 'light-tipper'].includes(subcategory)) category = 'light-truck'
  if (subcategory === 'light-cargo') subcategory = 'cargo-truck'
  if (subcategory === 'light-tipper') subcategory = 'tipper-truck'
  if (subcategory === 'other-special') subcategory = 'other-truck'
  return `/products/${category}/${subcategory}/${id}`
}

export async function afterContentMutation(res: NextApiResponse, paths: string[]) {
  const uniquePaths = Array.from(new Set(paths))
  await Promise.allSettled(uniquePaths.map((path) => res.revalidate(path)))
  if (process.env.INDEXNOW_KEY) await submitToIndexNow(uniquePaths).catch(() => undefined)
}
