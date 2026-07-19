import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { createCatalogSnapshot, createPrismaClient } from './verify-catalog-integrity.mjs'
import { createConsistentCatalogBackup, relativeBackupPath } from './consistent-sqlite-backup.mjs'

function resolveLocalDatabase(databaseUrl) {
  if (!databaseUrl.startsWith('file:')) {
    throw new Error('db:backup currently supports local SQLite file databases only')
  }
  const filePath = databaseUrl.slice('file:'.length).split('?')[0]
  return path.resolve(process.cwd(), filePath)
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL || 'file:./admin.db'
  const sourceDatabase = resolveLocalDatabase(databaseUrl)
  const outputDirectory = path.resolve(process.cwd(), 'backups/catalog')
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const databaseCopyName = `${timestamp}-${path.basename(sourceDatabase)}`
  const snapshotCopyName = `${timestamp}-catalog-snapshot.json`

  await mkdir(outputDirectory, { recursive: true })
  const destinationPath = path.join(outputDirectory, databaseCopyName)
  const relativeDestination = relativeBackupPath(destinationPath)
  const snapshot = await createConsistentCatalogBackup({
    sourceUrl: databaseUrl,
    destinationPath: relativeDestination,
    snapshotFromDatabase: async (backupUrl) => {
      const backupPrisma = createPrismaClient(backupUrl)
      try {
        return await createCatalogSnapshot(backupPrisma)
      } finally {
        await backupPrisma.$disconnect()
      }
    },
  })
  const manifest = { ...snapshot, databaseCopy: databaseCopyName, sourceDatabase: path.basename(sourceDatabase) }
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`

  await writeFile(path.join(outputDirectory, snapshotCopyName), serialized, 'utf8')
  await writeFile(path.join(outputDirectory, 'catalog-snapshot.json'), serialized, 'utf8')

  process.stdout.write(`Catalog backup created: ${databaseCopyName}\n`)
  process.stdout.write(`Snapshot counts: ${JSON.stringify(snapshot.counts)}\n`)
}

main().catch((error) => {
  process.stderr.write(`Database backup failed: ${error.message}\n`)
  process.exitCode = 1
})
