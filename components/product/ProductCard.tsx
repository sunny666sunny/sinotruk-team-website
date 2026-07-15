import Link from 'next/link'

interface ProductCardProps {
  product: {
    id: string
    name: string
    category: string
    subcategory: string
    description: string
    image: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.category}/${product.subcategory}/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden card-hover group"
    >
      <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl text-gray-300 group-hover:text-primary/30 transition-colors">🚚</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <span className="text-white font-medium">View Details</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-primary font-medium">View Details →</span>
        </div>
      </div>
    </Link>
  )
}
