import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search } from 'lucide-react'

interface Product {
  id: string; name: string; categoryId: string; subcategoryId: string
  image: string; isActive: boolean; sortOrder: number
  category: { name: string }; subcategory: { name: string }
}

interface Category { id: string; name: string; subcategories: { id: string; name: string }[] }

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchProducts = () => {
    const token = localStorage.getItem('admin_token')
    const params = new URLSearchParams({ page: String(page), limit: '20', category: filterCategory })
    if (search) params.set('search', search)
    fetch(`/api/admin/products?${params}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setProducts(d.products); setTotalPages(d.totalPages) }).catch(() => {})
  }

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    fetch('/api/admin/categories', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setCategories(d.categories)).catch(() => {})
  }, [])

  useEffect(() => { setLoading(true); fetchProducts(); setLoading(false) }, [page, filterCategory])

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('admin_token')
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    setDeleteId(null)
    fetchProducts()
  }

  return (
    <AdminLayout title="产品管理">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text" placeholder="搜索产品..."
            value={search} onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchProducts()}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26807d] focus:border-transparent outline-none"
          />
        </div>
        <select
          value={filterCategory} onChange={e => { setFilterCategory(e.target.value); setPage(1) }}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#26807d] outline-none"
        >
          <option value="all">全部分类</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 bg-[#26807d] text-white rounded-lg hover:bg-[#1d6b68] transition whitespace-nowrap">
          <Plus size={18} /> 添加产品
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="px-4 py-3 font-medium w-16">图片</th>
                <th className="px-4 py-3 font-medium">名称</th>
                <th className="px-4 py-3 font-medium">分类</th>
                <th className="px-4 py-3 font-medium">子分类</th>
                <th className="px-4 py-3 font-medium">状态</th>
                <th className="px-4 py-3 font-medium w-24">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">无图片</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{p.category?.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{p.subcategory?.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.isActive ? '启用' : '草稿'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${p.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition">
                        <Edit size={16} />
                      </Link>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">未找到产品</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t">
            <span className="text-sm text-gray-500">第 {page} / {totalPages} 页</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded text-sm disabled:opacity-50">上一页</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded text-sm disabled:opacity-50">下一页</button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold">确认归档</h3>
            <p className="text-gray-500 mt-2">归档后产品不会在前台展示，可随时在编辑页重新启用。</p>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded-lg text-sm">取消</button>
              <button onClick={() => handleDelete(deleteId)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">归档</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
