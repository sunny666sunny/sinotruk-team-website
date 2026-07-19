export async function createIfMissing(model, where, data) {
  const existing = await model.findUnique({ where })
  if (existing) return existing
  return model.create({ data })
}

export async function runSeedCli(run, disconnect, writeError = (message) => { process.stderr.write(message) }) {
  try {
    await run()
    return 0
  } catch (error) {
    writeError(`ERROR: ${error}\n`)
    return 1
  } finally {
    await disconnect()
  }
}
