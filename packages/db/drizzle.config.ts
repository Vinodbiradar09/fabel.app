import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './drizzle',
  dbCredentials: {
    // Migrations run against Neon's DIRECT (unpooled) connection, never the pooler.
    url: process.env.DATABASE_URL_UNPOOLED ?? '',
  },
})
