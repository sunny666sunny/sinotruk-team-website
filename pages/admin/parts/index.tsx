import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/admin/AdminLayout'
import { Edit, Trash2, Plus, Search, Package } from 'lucide-react'

interface Part {
  id: string; name: string; partNumber: string; category: string
  description: string; image: string; isActive: boolean
}

const PART_CATEGORIES = ['engine', 'gearbox', 'axle', 'chassis', 'cabin-body', 'other']

const CATEGORY_LABELS: Record<string, string> = {
  engine: '发动机', gearbox: '变速箱', axle: '车桥', chassis: '底盘', 'cabin-body': '驾驶室与车身', other: '其他',
}

export default function PartsList() {
  const router = useRouter()
  const [parts, setParts] = useState<Part[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState('')

  const fetchParts = () => {
    setLoading(true)
    const token = localStorage.getItem('admin_token')
    const params = new URLSearchParams({ page: String(page), limit: '50', category, search })
    fetch(`/api/admin/parts?${params}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => { setParts(d.parts || []); setTotalPages(d.totalPages || 1) })
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchParts() }, [page, category])

  const handleSearch = () => { setPage(1); fetchParts() }

  const handleDelete = async (id: string) => {
    if (!confirm('确定归档此配件？归档后可在编辑页重新启用。')) return
    const token = localStorage.getItem('admin_token')
    await fetch(`/api/admin/parts/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    fetchParts()
  }

  return (
    <AdminLayout title="配件管理">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">配件管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理所有SINOTRUK配件信息</p>
        </div>
        <button onClick={() => router.push('/admin/parts/new')} className="flex items-center gap-2 px-4 py-2 bg-[#26807d] text-white rounded-lg hover:bg-[#1d6b68] transition">
          <Plus size={18} /> 添加配件
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex gap-2 flex-1">
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="搜索名称或料号..." className="flex-1 px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
          <button onClick={handleSearch} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm">
            <Search size={16} />
          </button>
        </div>
        <select value={category} onChange={e => { setCategory(e.target.value); setPage(1) }} className="px-4 py-2 border rounded-lg text-sm outline-none">
          <option value="all">全部分类</option>
          {PART_CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#26807d]" />
          </div>
        ) : parts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Package size={48} />
            <p className="mt-2">暂无配件数据</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">图片</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">名称</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">料号</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">分类</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">状态</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {parts.map(part => (
                  <tr key={part.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {part.image ? <img src={part.image} className="w-12 h-12 object-cover rounded" alt="" /> : <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">无图</div>}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{part.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">{part.partNumber}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{CATEGORY_LABELS[part.category] || part.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${part.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {part.isActive ? '启用' : '禁用'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => router.push(`/admin/parts/${part.id}`)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(part.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded text-sm ${page === i + 1 ? 'bg-[#26807d] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
