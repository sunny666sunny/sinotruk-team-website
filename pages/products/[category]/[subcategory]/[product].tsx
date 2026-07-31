import { GetStaticPaths, GetStaticProps } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductDetail from '@/components/product/ProductDetail'
import type { ProcurementProduct } from '@/lib/content/serializers'
import { getPublishedProducts } from '@/lib/content/repository'
import { SeoHead } from '@/components/seo/SeoHead'

interface ProductDetailPageProps {
  product: ProcurementProduct | null
  seoTitle: string
  seoDescription: string
}

export default function ProductDetailPage({ product, seoTitle, seoDescription }: ProductDetailPageProps) {
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600">Product not found</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead input={{ path: `/products/${product.category}/${product.subcategory}/${product.id}`, pageType: 'product', name: product.name, description: seoDescription, image: product.image, override: { title: seoTitle }, breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: product.name, path: `/products/${product.category}/${product.subcategory}/${product.id}` }] }} />

      <Header />

      <main className="flex-grow">
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
  const products = await getPublishedProducts()
  const product = products.find((item) => item.id === productId) || null
  const matchingProducts = product ? products.filter((item) => item.name === product.name) : []
  const recordNumber = product ? matchingProducts.findIndex((item) => item.id === product.id) + 1 : 0
  const recordLabel = matchingProducts.length > 1 ? `catalogue record ${recordNumber} of ${matchingProducts.length}` : ''

  return {
    props: {
      product,
      seoTitle: product ? `${product.name}${recordLabel ? ` — ${recordLabel}` : ''} | SINOTRUK TEAM` : 'Product not found | SINOTRUK TEAM',
      seoDescription: product ? `${product.name}${recordLabel ? ` — ${recordLabel}` : ''}: ${product.description}` : 'The requested product could not be found.',
    },
  }
}
