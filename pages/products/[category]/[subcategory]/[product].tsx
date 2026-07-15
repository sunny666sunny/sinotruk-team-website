import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductDetail from '@/components/product/ProductDetail'
import { allProducts, getProductById, Product } from '@/data/products'

interface ProductDetailPageProps {
  product: Product | null
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
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
      <Head>
        <title>{product.name} - SINOTRUK</title>
        <meta name="description" content={product.description} />
      </Head>

      <Header />

      <main className="flex-grow">
        <ProductDetail product={product} />
      </main>

      <Footer />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allProducts.map((product) => ({
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
  const product = getProductById(productId) || null

  return {
    props: {
      product,
    },
  }
}