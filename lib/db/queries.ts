import db from '@/lib/db'
import { context, instructions } from '@/lib/db/schema'

export async function queryInstructions() {
  const results = await db.select().from(instructions)
  return Object.fromEntries(results.map(row => [row.key, row.value]))
}

export async function queryContext() {
  const results = await db.select().from(context).limit(1)
  if (results.length === 0) {
    throw new Error('Context data not found in the database.')
  }
  return results[0]
}
