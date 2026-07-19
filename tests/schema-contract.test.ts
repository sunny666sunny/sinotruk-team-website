import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const MIGRATION_PATH = 'prisma/migrations/20260719135000_procurement_content_automation/migration.sql'

function modelBlock(schema: string, name: string): string {
  const match = schema.match(new RegExp(`model ${name} \\{[\\s\\S]*?\\n\\}`))
  assert.ok(match, `model ${name} must exist`)
  return match[0]
}

function assertField(model: string, pattern: RegExp, label: string) {
  assert.match(model, pattern, label)
}

test('采购字段位于正确模型且保持旧数据兼容', async () => {
  const schema = await readFile('prisma/schema.prisma', 'utf8')
  const product = modelBlock(schema, 'Product')
  const part = modelBlock(schema, 'Part')
  const inquiry = modelBlock(schema, 'Inquiry')

  assertField(product, /^\s*normalizedSpecs\s+String\s+@default\("\{}"\)$/m, 'Product.normalizedSpecs contract')
  assertField(product, /^\s*applicationTags\s+String\s+@default\("\[\]"\)$/m, 'Product.applicationTags contract')
  assertField(product, /^\s*marketTags\s+String\s+@default\("\[\]"\)$/m, 'Product.marketTags contract')
  assertField(part, /^\s*compatibleModels\s+String\s+@default\("\[\]"\)$/m, 'Part.compatibleModels contract')
  assertField(inquiry, /^\s*company\s+String\?$/m, 'Inquiry.company must be optional')
  assertField(inquiry, /^\s*destinationPort\s+String\?$/m, 'Inquiry.destinationPort must be optional')
  assertField(inquiry, /^\s*quantity\s+Int\?$/m, 'Inquiry.quantity must be optional')
  assertField(inquiry, /^\s*useCase\s+String\?$/m, 'Inquiry.useCase must be optional')
  assertField(inquiry, /^\s*configuration\s+String\?$/m, 'Inquiry.configuration must be optional')
  assertField(inquiry, /^\s*selectionPayload\s+String\s+@default\("\[\]"\)$/m, 'Inquiry.selectionPayload contract')
  assertField(inquiry, /^\s*consent\s+Boolean\s+@default\(false\)$/m, 'Inquiry.consent contract')
})

test('新闻来源字段与自动化模型具有精确约束', async () => {
  const schema = await readFile('prisma/schema.prisma', 'utf8')
  const news = modelBlock(schema, 'News')
  const source = modelBlock(schema, 'NewsSource')
  const job = modelBlock(schema, 'ContentJob')
  const revision = modelBlock(schema, 'NewsRevision')

  assertField(news, /^\s*sourceUrl\s+String\?\s+@unique$/m, 'News.sourceUrl must be optional and unique')
  assertField(news, /^\s*sourceTitle\s+String\?$/m, 'News.sourceTitle must be optional')
  assertField(news, /^\s*sourceDate\s+String\?$/m, 'News.sourceDate must be optional')
  assertField(news, /^\s*sourceFingerprint\s+String\?\s+@unique$/m, 'News.sourceFingerprint must be optional and unique')
  assertField(news, /^\s*generatedBy\s+String\?$/m, 'News.generatedBy must be optional')
  assertField(news, /^\s*revisions\s+NewsRevision\[\]$/m, 'News revisions relation')
  assertField(news, /^\s*jobs\s+ContentJob\[\]$/m, 'News jobs relation')

  for (const [pattern, label] of [
    [/^\s*id\s+String\s+@id\s+@default\(cuid\(\)\)$/m, 'NewsSource.id'],
    [/^\s*name\s+String$/m, 'NewsSource.name'],
    [/^\s*baseUrl\s+String$/m, 'NewsSource.baseUrl'],
    [/^\s*feedUrl\s+String$/m, 'NewsSource.feedUrl'],
    [/^\s*sourceType\s+String\s+@default\("rss"\)$/m, 'NewsSource.sourceType'],
    [/^\s*enabled\s+Boolean\s+@default\(false\)$/m, 'NewsSource.enabled'],
    [/^\s*pollIntervalMinutes\s+Int\s+@default\(360\)$/m, 'NewsSource.pollIntervalMinutes'],
    [/^\s*dailyLimit\s+Int\s+@default\(3\)$/m, 'NewsSource.dailyLimit'],
    [/^\s*allowImages\s+Boolean\s+@default\(false\)$/m, 'NewsSource.allowImages'],
    [/^\s*defaultCategory\s+String\?$/m, 'NewsSource.defaultCategory'],
    [/^\s*defaultTags\s+String\s+@default\("\[\]"\)$/m, 'NewsSource.defaultTags'],
    [/^\s*lastCursor\s+String\?$/m, 'NewsSource.lastCursor'],
    [/^\s*lastPolledAt\s+DateTime\?$/m, 'NewsSource.lastPolledAt'],
    [/^\s*failureCount\s+Int\s+@default\(0\)$/m, 'NewsSource.failureCount'],
    [/^\s*createdAt\s+DateTime\s+@default\(now\(\)\)$/m, 'NewsSource.createdAt'],
    [/^\s*updatedAt\s+DateTime\s+@updatedAt$/m, 'NewsSource.updatedAt'],
    [/^\s*jobs\s+ContentJob\[\]$/m, 'NewsSource.jobs'],
  ] as const) assertField(source, pattern, label)

  assertField(job, /^\s*id\s+String\s+@id\s+@default\(cuid\(\)\)$/m, 'ContentJob.id')
  assertField(job, /^\s*sourceId\s+String\?$/m, 'ContentJob.sourceId must be optional')
  assertField(job, /^\s*sourceUrl\s+String\s+@unique$/m, 'ContentJob.sourceUrl must be required and unique')
  assertField(job, /^\s*fingerprint\s+String\s+@unique$/m, 'ContentJob.fingerprint must be required and unique')
  assertField(job, /^\s*status\s+String\s+@default\("queued"\)$/m, 'ContentJob.status contract')
  assertField(job, /^\s*sourceTitle\s+String\?$/m, 'ContentJob.sourceTitle must be optional')
  assertField(job, /^\s*sourceDate\s+String\?$/m, 'ContentJob.sourceDate must be optional')
  assertField(job, /^\s*extractedFacts\s+String\s+@default\("\[\]"\)$/m, 'ContentJob.extractedFacts contract')
  assertField(job, /^\s*generatedPayload\s+String\?$/m, 'ContentJob.generatedPayload must be optional')
  assertField(job, /^\s*errorStage\s+String\?$/m, 'ContentJob.errorStage must be optional')
  assertField(job, /^\s*errorMessage\s+String\?$/m, 'ContentJob.errorMessage must be optional')
  assertField(job, /^\s*attempts\s+Int\s+@default\(0\)$/m, 'ContentJob.attempts contract')
  assertField(job, /^\s*newsId\s+String\?$/m, 'ContentJob.newsId must be optional')
  assertField(job, /^\s*createdAt\s+DateTime\s+@default\(now\(\)\)$/m, 'ContentJob.createdAt')
  assertField(job, /^\s*updatedAt\s+DateTime\s+@updatedAt$/m, 'ContentJob.updatedAt')
  assertField(job, /^\s*publishedAt\s+DateTime\?$/m, 'ContentJob.publishedAt must be optional')
  assertField(job, /^\s*source\s+NewsSource\?\s+@relation\(fields: \[sourceId\], references: \[id\], onDelete: SetNull\)$/m, 'ContentJob.source SetNull relation')
  assertField(job, /^\s*news\s+News\?\s+@relation\(fields: \[newsId\], references: \[id\], onDelete: SetNull\)$/m, 'ContentJob.news SetNull relation')
  assert.doesNotMatch(job, /Category|Subcategory|Product|Part/)

  assertField(revision, /^\s*id\s+String\s+@id\s+@default\(cuid\(\)\)$/m, 'NewsRevision.id')
  assertField(revision, /^\s*newsId\s+String$/m, 'NewsRevision.newsId must be required')
  assertField(revision, /^\s*payload\s+String$/m, 'NewsRevision.payload must be required')
  assertField(revision, /^\s*reason\s+String$/m, 'NewsRevision.reason must be required')
  assertField(revision, /^\s*createdAt\s+DateTime\s+@default\(now\(\)\)$/m, 'NewsRevision.createdAt')
  assertField(revision, /^\s*news\s+News\s+@relation\(fields: \[newsId\], references: \[id\], onDelete: Cascade\)$/m, 'NewsRevision.news Cascade relation')
})

test('增量迁移只增加采购与内容自动化结构', async () => {
  const sql = await readFile(MIGRATION_PATH, 'utf8').catch(() => '')

  assert.match(sql, /^BEGIN TRANSACTION;$/m)
  assert.match(sql, /^COMMIT;$/m)
  assert.match(sql, /ALTER TABLE "Product" ADD COLUMN "normalizedSpecs"/)
  assert.match(sql, /ALTER TABLE "Part" ADD COLUMN "compatibleModels"/)
  assert.match(sql, /ALTER TABLE "Inquiry" ADD COLUMN "selectionPayload"/)
  assert.match(sql, /CREATE TABLE "NewsSource"/)
  assert.match(sql, /CREATE TABLE "ContentJob"/)
  assert.match(sql, /CREATE TABLE "NewsRevision"/)
  assert.match(sql, /News_sourceUrl_key/)
  assert.match(sql, /News_sourceFingerprint_key/)
  assert.match(sql, /ON DELETE SET NULL ON UPDATE CASCADE/)
  assert.match(sql, /ON DELETE CASCADE ON UPDATE CASCADE/)
  assert.doesNotMatch(sql, /DROP TABLE "(?:Category|Subcategory|Product|Part)"/)
  assert.doesNotMatch(sql, /DROP TABLE/)
  assert.doesNotMatch(sql, /DROP COLUMN/)
})
