import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LayoutDashboard, Package, Newspaper, FileText, Image, Mail, Search, Settings, LogOut, ChevronLeft, ChevronRight, Truck, Layers, Sparkles, Wrench } from 'lucide-react'

const menuItems = [
  { href: '/admin', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/products', label: '产品管理', icon: Package },
  { href: '/admin/products/categories', label: '分类管理', icon: Layers },
  { href: '/admin/parts', label: '配件管理', icon: Wrench },
  { href: '/admin/news', label: '新闻管理', icon: Newspaper },
  { href: '/admin/pages', label: '页面管理', icon: FileText },
  { href: '/admin/media', label: '媒体库', icon: Image },
  { href: '/admin/inquiries', label: '询盘管理', icon: Mail },
  { href: '/admin/seo', label: 'SEO 优化', icon: Search },
  { href: '/admin/ai', label: 'AI 工具', icon: Sparkles },
  { href: '/admin/settings', label: '系统设置', icon: Settings },
]

export default function AdminLayout({ children, title }: { children: ReactNode; title: string }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    localStorage.removeItem('admin_token')
    fetch('/api/admin/auth/check')
      .then((response) => { if (!response.ok) throw new Error('Unauthorized'); setLoading(false) })
      .catch(() => { router.replace('/admin/login') })
  }, [router])

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    localStorage.removeItem('admin_token')
    router.replace('/admin/login')
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-gray-100"><div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#26807d]" /></div>

  return <div className="flex min-h-screen bg-gray-100">
    <aside className={`${collapsed ? 'w-16' : 'w-60'} fixed inset-y-0 left-0 z-50 flex flex-col bg-[#1a1a2e] text-white transition-all`}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4"><div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-[#26807d]"><Truck size={16} /></div>{!collapsed && <span className="text-sm font-bold">SINOTRUK 后台</span>}</div>
      <nav className="flex-1 overflow-y-auto py-4" aria-label="后台菜单">{menuItems.map((item) => {
        const active = router.pathname === item.href || router.pathname.startsWith(`${item.href}/`)
        return <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined} className={`mx-2 flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm ${active ? 'bg-[#26807d] text-white' : 'text-gray-300 hover:bg-white/10'}`}><item.icon size={18} />{!collapsed && <span>{item.label}</span>}</Link>
      })}</nav>
      <div className="space-y-2 border-t border-white/10 p-4"><button onClick={() => setCollapsed(!collapsed)} className="flex w-full items-center gap-3 text-sm text-gray-400 hover:text-white" aria-label={collapsed ? '展开菜单' : '收起菜单'}>{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}{!collapsed && <span>收起菜单</span>}</button><button onClick={logout} className="flex w-full items-center gap-3 text-sm text-gray-400 hover:text-red-400"><LogOut size={18} />{!collapsed && <span>退出登录</span>}</button></div>
    </aside>
    <div className={`flex-1 ${collapsed ? 'ml-16' : 'ml-60'} transition-all`}><header className="sticky top-0 z-40 bg-white shadow-sm"><div className="flex items-center justify-between px-6 py-4"><h1 className="text-xl font-semibold text-gray-900">{title}</h1><Link href="/" target="_blank" className="text-sm text-[#26807d] hover:underline">查看网站 →</Link></div></header><main className="p-6">{children}</main></div>
  </div>
}
