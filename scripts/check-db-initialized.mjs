import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const prisma = new PrismaClient({ adapter: new PrismaLibSql({ url: process.env.DATABASE_URL || 'file:admin.db' }) })

try {
  const marker = await prisma.setting.findUnique({ where: { key: 'database_initialized' } })
  if (marker) process.exitCode = 0
  else {
    const [admins, products, news, parts] = await Promise.all([
      prisma.admin.count(), prisma.product.count(), prisma.news.count(), prisma.part.count(),
    ])
    if (admins + products + news + parts > 0) {
      await prisma.setting.create({ data: { key: 'database_initialized', value: new Date().toISOString() } })
      process.exitCode = 0
    } else process.exitCode = 10
  }
} finally {
  await prisma.$disconnect()
}
