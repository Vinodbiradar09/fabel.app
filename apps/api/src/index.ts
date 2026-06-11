import { serve } from '@hono/node-server'
import * as Sentry from '@sentry/node'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.onError((err, c) => {
  Sentry.captureException(err)
  return c.json({ error: 'internal_server_error' }, 500)
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
