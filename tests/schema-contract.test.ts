import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('采购和内容自动化字段存在', async () => {
  const schema = await readFile('prisma/schema.prisma', 'utf8')
  for (const token of [
    'normalizedSpecs',
    'applicationTags',
    'marketTags',
    'compatibleModels',
    'selectionPayload',
    'model NewsSource',
    'model ContentJob',
    'model NewsRevision',
  ]) {
    assert.match(schema, new RegExp(token))
  }
})

test('内容任务关系不会级联删除现有目录记录', async () => {
  const schema = await readFile('prisma/schema.prisma', 'utf8')
  const contentJob = schema.match(/model ContentJob \{[\s\S]*?\n\}/)?.[0] ?? ''

  assert.match(contentJob, /source\s+NewsSource\?\s+@relation\([^\n]*onDelete: SetNull\)/)
  assert.match(contentJob, /news\s+News\?\s+@relation\([^\n]*onDelete: SetNull\)/)
  assert.doesNotMatch(contentJob, /Category|Subcategory|Product|Part/)
})
