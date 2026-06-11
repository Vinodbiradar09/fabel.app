import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not set — point it at the Neon POOLED (-pooler) connection string'
  )
}

/**
 * Long-lived Node services use a small pooled `pg` Pool against Neon's POOLED
 * (-pooler) endpoint — NOT the Neon serverless driver (that's edge/Workers only).
 */
const pool = new Pool({ connectionString, max: 10 })

export const db = drizzle(pool, { schema })
export { pool }
