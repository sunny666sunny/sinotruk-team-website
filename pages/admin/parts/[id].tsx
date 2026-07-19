import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/admin/AdminLayout'
import { Save, ArrowLeft, Plus, Trash2, Upload } from 'lucide-react'

const PART_CATEGORIES = ['engine', 'gearbox', 'axle', 'chassis', 'cabin-body', 'other']
const CATEGORY_LABELS: Record<string, string> = {
  engine: '发动机', gearbox: '变速箱', axle: '车桥', chassis: '底盘', 'cabin-body': '驾驶室与车身', other: '其他',
}

export default function PartEdit() {
  const router = useRouter()
  const { id } = router.query
  const isNew = id === 'new'
  const [form, setForm] = useState({
    name: '', partNumber: '', category: '', description: '', image: '',
    specifications: [] as { key: string; value: string }[], isActive: true, sortOrder: 0,
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew && id) {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      fetch(`/api/admin/parts/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(p => {
          setForm({
            name: p.name || '', partNumber: p.partNumber || '', category: p.category || '',
            description: p.description || '', image: p.image || '',
            specifications: Object.entries(p.specifications || {}).map(([k, v]) => ({ key: k, value: v as string })),
            isActive: p.isActive !== false, sortOrder: p.sortOrder || 0,
          })
        }).catch(() => setError('加载配件信息失败'))
        .finally(() => setLoading(false))
    }
  }, [id, isNew])

  const handleUpload = async (file: File) => {
    setUploading(true)
    const token = localStorage.getItem('admin_token')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) setForm(prev => ({ ...prev, image: data.url }))
  }

  const handleSave = async () => {
    if (!form.name || !form.partNumber || !form.category) {
      setError('名称、料号和分类为必填项'); return
    }
    setError('')
    setSaving(true)
    const token = localStorage.getItem('admin_token')
    const body = {
      ...form,
      specifications: Object.fromEntries(form.specifications.filter(s => s.key).map(s => [s.key, s.value])),
    }
    const url = isNew ? '/api/admin/parts' : `/api/admin/parts/${id}`
    const method = isNew ? 'POST' : 'PUT'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) })
    const data = await res.json()
    setSaving(false)
    if (data.part) router.push('/admin/parts')
    else setError(data.error || '保存失败')
  }

  if (loading) {
    return (
      <AdminLayout title={isNew ? '添加配件' : '编辑配件'}>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#26807d]" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isNew ? '添加配件' : '编辑配件'}>
      <div className="max-w-3xl">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft size={18} /> 返回配件列表
        </button>

        {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>}

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">基本信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">配件名称 *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="例: HOWO TX Engine Cylinder Head" className="w-full px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">料号 *</label>
                <input value={form.partNumber} onChange={e => setForm({ ...form, partNumber: e.target.value })} placeholder="例: WG9725590100" className="w-full px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类 *</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]">
                  <option value="">选择分类</option>
                  {PART_CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
                <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })} className="w-full px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">图片</label>
                <div className="flex gap-2">
                  <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/parts/part.png" className="flex-1 px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                  <label className="flex items-center gap-1 px-3 py-2.5 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 text-sm">
                    <Upload size={16} /> {uploading ? '...' : '上传'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                  </label>
                </div>
                {form.image && <img src={form.image} className="mt-2 w-24 h-24 object-cover rounded border" alt="Preview" />}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="配件描述..." className="w-full px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">规格参数</h2>
              <button onClick={() => setForm({ ...form, specifications: [...form.specifications, { key: '', value: '' }] })} className="flex items-center gap-1 text-sm text-[#26807d] hover:underline">
                <Plus size={16} /> 添加
              </button>
            </div>
            {form.specifications.length === 0 && (
              <p className="text-sm text-gray-400 py-4">暂无规格参数，点击&ldquo;添加&rdquo;添加</p>
            )}
            {form.specifications.map((spec, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={spec.key} onChange={e => { const s = [...form.specifications]; s[i].key = e.target.value; setForm({ ...form, specifications: s }) }} placeholder="键 (例: 适用车型)" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                <input value={spec.value} onChange={e => { const s = [...form.specifications]; s[i].value = e.target.value; setForm({ ...form, specifications: s }) }} placeholder="值 (例: HOWO TX Series)" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                <button onClick={() => setForm({ ...form, specifications: form.specifications.filter((_, j) => j !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">设置</h2>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
              <span className="text-sm">{form.isActive ? '启用' : '重新启用此配件'}</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#26807d] text-white rounded-lg hover:bg-[#1d6b68] transition disabled:opacity-50">
              <Save size={18} /> {saving ? '保存中...' : '保存配件'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
