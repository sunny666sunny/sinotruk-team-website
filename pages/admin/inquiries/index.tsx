import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

type Inquiry = { id: string; name: string; company?: string | null; phone: string; email: string; country: string; quantity?: number | null; useCase?: string | null; destinationPort?: string | null; selectionPayload: string[]; createdAt: string; };

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/admin/inquiries').then((response) => response.json()).then((data) => setInquiries(data.inquiries || [])).finally(() => setLoading(false)); }, []);
  return <AdminLayout title="询盘管理"><div className="rounded-xl bg-white shadow-sm"><div className="border-b px-6 py-4"><p className="text-sm text-gray-500">查看 RFQ 联系方式、采购要求和候选车型/配件。</p></div>{loading ? <div className="p-8 text-sm text-gray-500">正在加载询盘…</div> : <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-gray-50 text-gray-500"><tr><th className="px-4 py-3">联系人</th><th className="px-4 py-3">国家</th><th className="px-4 py-3">采购需求</th><th className="px-4 py-3">候选清单</th><th className="px-4 py-3">提交时间</th></tr></thead><tbody className="divide-y">{inquiries.map((item) => <tr key={item.id}><td className="px-4 py-4"><p className="font-semibold text-gray-900">{item.name}</p><p className="text-gray-500">{item.email}</p><p className="text-gray-500">{item.phone}</p></td><td className="px-4 py-4 text-gray-700">{item.country}</td><td className="px-4 py-4 text-gray-700"><p>{item.quantity ? `${item.quantity} unit(s)` : 'Quantity not specified'}</p><p>{item.useCase || 'Use case not specified'}</p><p>{item.destinationPort || 'Destination port not specified'}</p></td><td className="px-4 py-4 text-gray-700">{item.selectionPayload.length ? item.selectionPayload.join(', ') : 'No shortlist items'}</td><td className="px-4 py-4 text-gray-500">{new Date(item.createdAt).toLocaleString('zh-CN')}</td></tr>)}{!inquiries.length && <tr><td colSpan={5} className="px-4 py-10 text-center text-gray-400">暂无询盘</td></tr>}</tbody></table></div>}</div></AdminLayout>;
}
