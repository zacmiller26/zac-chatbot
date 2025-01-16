import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
  dotenv.config({ path: '.env.local' })
}

export default defineConfig({
  out: './drizzle',
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
})
