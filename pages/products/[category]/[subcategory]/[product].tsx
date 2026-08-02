import { GetStaticPaths, GetStaticProps } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductDetail from '@/components/product/ProductDetail'
import type { ProcurementProduct } from '@/lib/content/serializers'
import { getPublishedProduct, getPublishedProducts } from '@/lib/content/repository'
import { SeoHead } from '@/components/seo/SeoHead'
import { generateProductDetailContent } from '@/lib/product-detail/generate'

interface ProductDetailPageProps {
  product: ProcurementProduct | null
  seoTitle: string
  seoDescription: string
  canonicalPath?: string
}

export default function ProductDetailPage({ product, seoTitle, seoDescription, canonicalPath }: ProductDetailPageProps) {
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main" className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600">Product not found</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const detailContent = product.detailContent ?? generateProductDetailContent(product)
  const resolvedCanonicalPath = canonicalPath || `/products/${product.category}/${product.subcategory}/${product.id}`
  const additionalProperties = Object.entries({ ...product.specifications, ...(product.detailedFeatures || {}) })
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([name, value]) => ({ name, value }))

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead input={{ path: resolvedCanonicalPath, pageType: 'product', name: product.name, description: seoDescription, image: product.image, productId: product.id, category: `${product.category.replaceAll('-', ' ')} / ${product.subcategory.replaceAll('-', ' ')}`, productImages: detailContent.gallery.map((item) => ({ url: item.image, caption: item.description })), additionalProperties, faqs: detailContent.faqs, override: { title: seoTitle, canonical: resolvedCanonicalPath }, breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: product.name, path: resolvedCanonicalPath }] }} />

      <Header />

      <main id="main" className="flex-grow">
        <ProductDetail product={product} />
      </main>

      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (await getPublishedProducts()).map((product) => ({
    params: {
      category: product.category,
      subcategory: product.subcategory,
      product: product.id,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async ({ params }) => {
  const productId = params?.product as string
  const [product, products] = await Promise.all([getPublishedProduct(productId), getPublishedProducts()])
  const matchingProducts = product ? products.filter((item) => item.name === product.name) : []
  const exactConfigurationMatches = product
    ? matchingProducts.filter((item) => JSON.stringify(item.specifications) === JSON.stringify(product.specifications))
    : []
  const canonicalProduct = exactConfigurationMatches[0] || product
  const canonicalPath = canonicalProduct
    ? `/products/${canonicalProduct.category}/${canonicalProduct.subcategory}/${canonicalProduct.id}`
    : '/products'
  const recordNumber = product ? matchingProducts.findIndex((item) => item.id === product.id) + 1 : 0
  const recordLabel = matchingProducts.length > 1 ? `catalogue record ${recordNumber} of ${matchingProducts.length}` : ''

  return {
    props: {
      product,
      canonicalPath,
      seoTitle: product ? `${product.name}${recordLabel ? ` — ${recordLabel}` : ''} | SINOTRUK TEAM` : 'Product not found | SINOTRUK TEAM',
      seoDescription: product ? `${product.name}${recordLabel ? ` — ${recordLabel}` : ''}: ${product.description}` : 'The requested product could not be found.',
    },
  }
}
