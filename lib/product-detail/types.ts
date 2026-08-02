export type ProductPerformanceItem = { title: string; description: string; image: string }

export type ProductGalleryItem = {
  image: string
  alt: string
  title: string
  description: string
}

export type ProductApplicationArea = {
  title: string
  description: string
  bullets: string[]
  image: string
  href: string
}

export type ProductSolution = {
  title: string
  description: string
  bullets: string[]
  image: string
}

export type ProductFaq = { question: string; answer: string }

export type ProductDetailContent = {
  performanceSummary: string
  performanceItems: ProductPerformanceItem[]
  gallery: ProductGalleryItem[]
  applicationAreas: ProductApplicationArea[]
  solutions: ProductSolution[]
  faqs: ProductFaq[]
}
