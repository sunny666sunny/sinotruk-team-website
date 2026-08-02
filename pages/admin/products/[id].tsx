import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/components/admin/AdminLayout'
import { Save, ArrowLeft, Plus, Trash2, Upload, Sparkles, Loader2, Link, Search } from 'lucide-react'
import { ProductDetailContentEditor } from '@/components/admin/ProductDetailContentEditor'
import { generateProductDetailContent } from '@/lib/product-detail/generate'
import type { ProductDetailContent } from '@/lib/product-detail/types'

interface Category { id: string; name: string; subcategories: { id: string; name: string }[] }
interface PerformanceItem { id?: string; title: string; description: string; image: string }
interface ProductForm {
  name: string; categoryId: string; subcategoryId: string; description: string
  image: string; bannerImage: string; isActive: boolean; sortOrder: number
  specifications: { key: string; value: string }[]
  features: string[]
  detailedFeatures: { key: string; value: string }[]
  galleryImages: string[]
  performanceItems: PerformanceItem[]
  detailContent?: ProductDetailContent
}

interface AIProduct {
  name: string; description: string
  specifications: { key: string; value: string }[]
  features: string[]
  detailedFeatures: { key: string; value: string }[]
  imageUrls: string[]
  category: string; subcategory: string
}

const emptyForm: ProductForm = {
  name: '', categoryId: '', subcategoryId: '', description: '', image: '', bannerImage: '',
  isActive: true, sortOrder: 0, specifications: [], features: [], detailedFeatures: [],
  galleryImages: [], performanceItems: [],
}

export default function ProductEdit() {
  const router = useRouter()
  const { id } = router.query
  const isNew = id === 'new'
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [error, setError] = useState('')

  // AI Extraction
  const [aiUrl, setAiUrl] = useState('')
  const [aiModel, setAiModel] = useState('')
  const [aiExtracting, setAiExtracting] = useState(false)
  const [aiExtracted, setAiExtracted] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    fetch('/api/admin/categories', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(d => setCategories(d.categories)).catch(() => {})

    if (!isNew && id) {
      setLoading(true)
      fetch(`/api/admin/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json()).then(p => {
          setForm({
            name: p.name, categoryId: p.categoryId, subcategoryId: p.subcategoryId,
            description: p.description, image: p.image, bannerImage: p.bannerImage || '',
            isActive: p.isActive, sortOrder: p.sortOrder,
            specifications: Object.entries(p.specifications || {}).map(([k, v]) => ({ key: k, value: v as string })),
            features: p.features || [],
            detailedFeatures: Object.entries(p.detailedFeatures || {}).map(([k, v]) => ({ key: k, value: v as string })),
            galleryImages: p.galleryImages || [],
            performanceItems: p.performanceItems || [],
            detailContent: p.detailContent,
          })
        }).catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [id, isNew])

  const currentCategory = categories.find(c => c.id === form.categoryId)
  const subcategories = currentCategory?.subcategories || []

  const handleUpload = async (file: File, field: string) => {
    setUploading(field)
    const token = localStorage.getItem('admin_token')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd })
    const data = await res.json()
    setUploading(null)
    if (data.url) setForm(prev => ({ ...prev, [field]: data.url }))
    return data.url
  }

  // AI Extract Product
  const handleAIExtract = async () => {
    if (!aiUrl.trim() && !aiModel.trim()) { setError('请输入产品URL或产品型号'); return }
    setAiExtracting(true)
    setError('')
    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch('/api/admin/ai/extract-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ url: aiUrl.trim(), modelName: aiModel.trim() }),
      })
      const data = await res.json()
      if (data.success) {
        const p: AIProduct = data.product
        // Auto-fill form
        setForm(prev => ({
          ...prev,
          name: p.name || prev.name,
          description: p.description || prev.description,
          specifications: p.specifications?.length ? p.specifications : prev.specifications,
          features: p.features?.length ? p.features : prev.features,
          detailedFeatures: p.detailedFeatures?.length ? p.detailedFeatures : prev.detailedFeatures,
          image: p.imageUrls?.[0] || prev.image,
          bannerImage: p.imageUrls?.[1] || prev.bannerImage,
          galleryImages: p.imageUrls?.length > 1 ? p.imageUrls.slice(1) : prev.galleryImages,
          // Map category name to category ID
          categoryId: categories.find(c => c.name.toLowerCase().includes(p.category?.toLowerCase()) || p.category?.toLowerCase().includes(c.name.toLowerCase()))?.id || prev.categoryId,
          subcategoryId: categories.find(c => c.name.toLowerCase().includes(p.category?.toLowerCase()))?.subcategories?.find((s: any) => s.name.toLowerCase().includes(p.subcategory?.toLowerCase()))?.id || prev.subcategoryId,
        }))
        setAiExtracted(true)
      } else {
        setError(data.error || 'AI提取失败')
      }
    } catch {
      setError('网络错误，请重试')
    }
    setAiExtracting(false)
  }

  const handleSave = async () => {
    setError('')
    setSaving(true)
    const token = localStorage.getItem('admin_token')
    const body = {
      ...form,
      specifications: Object.fromEntries(form.specifications.filter(s => s.key).map(s => [s.key, s.value])),
      detailedFeatures: Object.fromEntries(form.detailedFeatures.filter(s => s.key).map(s => [s.key, s.value])),
    }
    const url = isNew ? '/api/admin/products' : `/api/admin/products/${id}`
    const method = isNew ? 'POST' : 'PUT'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) })
    const data = await res.json()
    setSaving(false)
    if (data.product) router.push('/admin/products')
    else setError(data.error || '保存失败')
  }

  const handleGenerateDetailContent = () => {
    if (!form.name.trim() || !form.image || !form.categoryId || !form.subcategoryId) {
      setError('请先填写产品名称、主图、分类和子分类，再自动补全详情 SEO 内容')
      return
    }
    const subcategory = form.subcategoryId.includes(':') ? form.subcategoryId.split(':').slice(1).join(':') : form.subcategoryId
    const productId = typeof id === 'string' && id !== 'new' ? id : form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const detailContent = generateProductDetailContent({
      id: productId,
      name: form.name,
      category: form.categoryId,
      subcategory,
      description: form.description,
      image: form.image,
      bannerImage: form.bannerImage || undefined,
      specifications: Object.fromEntries(form.specifications.filter((item) => item.key).map((item) => [item.key, item.value])),
      features: form.features,
      detailedFeatures: Object.fromEntries(form.detailedFeatures.filter((item) => item.key).map((item) => [item.key, item.value])),
      galleryImages: form.galleryImages,
      performanceItems: form.performanceItems,
    })
    setForm((previous) => ({ ...previous, detailContent }))
    setError('')
  }

  if (loading) {
    return (
      <AdminLayout title="编辑产品">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#26807d]" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={isNew ? '添加产品' : '编辑产品'}>
      <div className="max-w-4xl">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft size={18} /> 返回产品列表
        </button>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        {/* AI Extraction Card */}
        {isNew && (
          <div className="bg-gradient-to-r from-[#26807d]/5 to-[#26807d]/10 border border-[#26807d]/20 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={20} className="text-[#26807d]" />
              <h2 className="font-semibold text-gray-900">AI 智能提取产品信息</h2>
              {aiExtracted && (
                <span className="ml-auto text-xs text-green-600 font-medium flex items-center gap-1">
                  <Sparkles size={12} /> 已提取完成
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">产品 URL（输入 sinotruk.international 产品链接）</label>
                <div className="flex gap-2">
                  <input
                    value={aiUrl}
                    onChange={e => setAiUrl(e.target.value)}
                    placeholder="https://sinotruk.international/products/..."
                    className="flex-1 px-4 py-2.5 border border-[#26807d]/30 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d] bg-white"
                    onKeyDown={e => e.key === 'Enter' && handleAIExtract()}
                  />
                  <Link size={16} className="text-gray-400 self-center shrink-0" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">或输入产品型号</label>
                <div className="flex gap-2">
                  <input
                    value={aiModel}
                    onChange={e => setAiModel(e.target.value)}
                    placeholder="如: HOWO TX 6x4 Dump Truck"
                    className="flex-1 px-4 py-2.5 border border-[#26807d]/30 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d] bg-white"
                    onKeyDown={e => e.key === 'Enter' && handleAIExtract()}
                  />
                  <Search size={16} className="text-gray-400 self-center shrink-0" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAIExtract}
                disabled={aiExtracting}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#26807d] text-white rounded-lg hover:bg-[#1d6b68] transition text-sm font-medium disabled:opacity-50"
              >
                {aiExtracting ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {aiExtracting ? 'AI提取中...' : 'AI 提取产品信息'}
              </button>
              {aiExtracted && (
                <span className="text-xs text-gray-500 self-center">
                  已自动填写下方表单，请检查并补充完善后保存
                </span>
              )}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">基本信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">产品名称 *</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#26807d] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类 *</label>
                <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value, subcategoryId: '' })} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#26807d] outline-none">
                  <option value="">选择分类</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">子分类 *</label>
                <select value={form.subcategoryId} onChange={e => setForm({ ...form, subcategoryId: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#26807d] outline-none">
                  <option value="">选择子分类</option>
                  {subcategories.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#26807d] outline-none" />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">图片</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">主图</label>
                <div className="flex gap-2">
                  <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/product.png" className="flex-1 px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                  <label className="flex items-center gap-1 px-3 py-2.5 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 text-sm">
                    <Upload size={16} /> {uploading === 'image' ? '...' : '上传'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'image')} />
                  </label>
                </div>
                {form.image && <img src={form.image} className="mt-2 w-24 h-24 object-cover rounded border" alt="Preview" />}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banner图</label>
                <div className="flex gap-2">
                  <input value={form.bannerImage} onChange={e => setForm({ ...form, bannerImage: e.target.value })} placeholder="/images/banner.png" className="flex-1 px-4 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                  <label className="flex items-center gap-1 px-3 py-2.5 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 text-sm">
                    <Upload size={16} /> {uploading === 'bannerImage' ? '...' : '上传'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleUpload(e.target.files[0], 'bannerImage')} />
                  </label>
                </div>
                {form.bannerImage && <img src={form.bannerImage} className="mt-2 w-24 h-24 object-cover rounded border" alt="Preview" />}
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
            {form.specifications.map((spec, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={spec.key} onChange={e => { const s = [...form.specifications]; s[i].key = e.target.value; setForm({ ...form, specifications: s }) }} placeholder="键 (例: 发动机)" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                <input value={spec.value} onChange={e => { const s = [...form.specifications]; s[i].value = e.target.value; setForm({ ...form, specifications: s }) }} placeholder="值 (例: 371 HP)" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                <button onClick={() => setForm({ ...form, specifications: form.specifications.filter((_, j) => j !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">产品特点</h2>
              <button onClick={() => setForm({ ...form, features: [...form.features, ''] })} className="flex items-center gap-1 text-sm text-[#26807d] hover:underline">
                <Plus size={16} /> 添加
              </button>
            </div>
            {form.features.map((feature, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={feature} onChange={e => { const f = [...form.features]; f[i] = e.target.value; setForm({ ...form, features: f }) }} placeholder="特点描述" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                <button onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Detailed Features */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">详细特性</h2>
              <button onClick={() => setForm({ ...form, detailedFeatures: [...form.detailedFeatures, { key: '', value: '' }] })} className="flex items-center gap-1 text-sm text-[#26807d] hover:underline">
                <Plus size={16} /> 添加
              </button>
            </div>
            {form.detailedFeatures.map((item, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={item.key} onChange={e => { const f = [...form.detailedFeatures]; f[i].key = e.target.value; setForm({ ...form, detailedFeatures: f }) }} placeholder="键 (例: Cabin Type)" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                <input value={item.value} onChange={e => { const f = [...form.detailedFeatures]; f[i].value = e.target.value; setForm({ ...form, detailedFeatures: f }) }} placeholder="值 (例: HW76 Standard Cab)" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                <button onClick={() => setForm({ ...form, detailedFeatures: form.detailedFeatures.filter((_, j) => j !== i) })} className="p-2 text-red-500 hover:bg-red-50 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Performance Items */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">性能参数</h2>
              <button onClick={() => setForm({ ...form, performanceItems: [...form.performanceItems, { title: '', description: '', image: '' }] })} className="flex items-center gap-1 text-sm text-[#26807d] hover:underline">
                <Plus size={16} /> 添加
              </button>
            </div>
            {form.performanceItems.map((item, i) => (
              <div key={i} className="border rounded-lg p-4 mb-3">
                <div className="flex justify-end mb-2">
                  <button onClick={() => setForm({ ...form, performanceItems: form.performanceItems.filter((_, j) => j !== i) })} className="p-1 text-red-500 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input value={item.title} onChange={e => { const items = [...form.performanceItems]; items[i].title = e.target.value; setForm({ ...form, performanceItems: items }) }} placeholder="Title" className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                  <div className="flex gap-2">
                    <input value={item.image} onChange={e => { const items = [...form.performanceItems]; items[i].image = e.target.value; setForm({ ...form, performanceItems: items }) }} placeholder="Image URL" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                    <label className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 text-sm">
                      <Upload size={14} />
                      <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleUpload(e.target.files[0], 'perf_temp').then(url => { if (url) { const items = [...form.performanceItems]; items[i].image = url; setForm({ ...form, performanceItems: items }) } }) }} />
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    <textarea value={item.description} onChange={e => { const items = [...form.performanceItems]; items[i].description = e.target.value; setForm({ ...form, performanceItems: items }) }} placeholder="Description" rows={2} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">图片库</h2>
              <button onClick={() => setForm({ ...form, galleryImages: [...form.galleryImages, ''] })} className="flex items-center gap-1 text-sm text-[#26807d] hover:underline">
                <Plus size={16} /> 添加
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {form.galleryImages.map((img, i) => (
                <div key={i} className="relative group border rounded-lg overflow-hidden">
                  {img ? <img src={img} className="w-full h-24 object-cover" alt="Gallery" /> : <div className="w-full h-24 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">无图片</div>}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <label className="p-1.5 bg-white rounded cursor-pointer"><Upload size={14} />
                      <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) handleUpload(e.target.files[0], 'gallery_temp').then(url => { if (url) { const g = [...form.galleryImages]; g[i] = url; setForm({ ...form, galleryImages: g }) } }) }} />
                    </label>
                    <button onClick={() => setForm({ ...form, galleryImages: form.galleryImages.filter((_, j) => j !== i) })} className="p-1.5 bg-white rounded text-red-500"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ProductDetailContentEditor value={form.detailContent} onChange={(detailContent) => setForm((previous) => ({ ...previous, detailContent }))} onGenerate={handleGenerateDetailContent} />

          {/* Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">设置</h2>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
                <span className="text-sm">{form.isActive ? '启用' : '重新启用此产品'}</span>
              </label>
              <div>
                <label className="block text-xs text-gray-500 mb-1">排序</label>
                <input type="number" value={form.sortOrder} onChange={e => setForm({ ...form, sortOrder: Number(e.target.value) })} className="w-20 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#26807d]" />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#26807d] text-white rounded-lg hover:bg-[#1d6b68] transition disabled:opacity-50">
              <Save size={18} /> {saving ? '保存中...' : '保存产品'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
