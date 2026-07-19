export async function createIfMissing(model, where, data) {
  return model.upsert({ where, update: {}, create: data })
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
