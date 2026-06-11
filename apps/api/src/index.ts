import { serve } from '@hono/node-server'
import { sentry } from '@sentry/hono/node'
import { Hono } from 'hono'

const app = new Hono()

app.use(sentry(app))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve(
  {
    fetch: app.fetch,
    port: 3002,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
