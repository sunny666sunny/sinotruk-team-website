import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { normalizeRfqSubmission } from '@/lib/procurement/rfq'

const FEISHU_WEBHOOK_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/0a8ca31f-bcd9-4079-8085-514663ae7ddd'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const submission = normalizeRfqSubmission(req.body || {})
  if (!submission.ok) return res.status(400).json({ success: false, error: submission.error })
  const { name, phone, email, country, message } = submission.data

  const time = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown'

  await prisma.inquiry.create({ data: {
    name, phone, email, country, message, ip: Array.isArray(ip) ? ip[0] : ip,
    quantity: submission.data.quantity, useCase: submission.data.useCase, destinationPort: submission.data.destinationPort,
    selectionPayload: JSON.stringify(submission.data.selectionPayload), consent: submission.data.consent,
  } })

  const feishuPayload = {
    msg_type: 'interactive',
    card: {
      header: {
        title: {
          content: 'New Inquiry from sinotrukteam.com',
          tag: 'plain_text',
        },
        template: 'turquoise',
      },
      elements: [
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: `**Time:** ${time}\n**IP:** ${ip}`,
          },
        },
        { tag: 'hr' },
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: `**Name:** ${name}`,
          },
        },
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: `**Phone/WhatsApp:** ${phone}`,
          },
        },
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: `**Email:** ${email}`,
          },
        },
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: `**Country:** ${country}`,
          },
        },
        { tag: 'hr' },
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: `**Message:**\n${message}`,
          },
        },
      ],
    },
  }

  try {
    const feishuRes = await fetch(FEISHU_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feishuPayload),
    })

    const feishuResult = await feishuRes.json()

    if (feishuRes.ok && feishuResult.code === 0) {
      return res.status(200).json({ success: true })
    }

    return res.status(500).json({ success: false, error: 'Notification service error' })
  } catch {
    return res.status(500).json({ success: false, error: 'Failed to send notification' })
  }
}
