import path from 'node:path'

import { createClient } from '@libsql/client'

export async function vacuumIntoSqlite(sourceUrl, destinationPath) {
  const client = createClient({ url: sourceUrl })
  const escapedDestination = destinationPath.replaceAll('\\', '/').replaceAll("'", "''")
  try {
    await client.execute(`VACUUM INTO '${escapedDestination}'`)
  } finally {
    client.close()
  }
}

export async function createConsistentCatalogBackup({
  sourceUrl,
  destinationPath,
  vacuumInto = vacuumIntoSqlite,
  snapshotFromDatabase,
}) {
  await vacuumInto(sourceUrl, destinationPath)
  const backupUrl = `file:${destinationPath.replaceAll('\\', '/')}`
  return snapshotFromDatabase(backupUrl)
}

export function relativeBackupPath(destinationPath, cwd = process.cwd()) {
  const relative = path.relative(cwd, destinationPath)
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Backup destination must stay inside the project directory')
  }
  return relative
}
