import { Hono } from 'hono'
import { Math } from './routes/math'
import { Fun } from './routes/fun'
import { Test } from './routes/test'

const app = new Hono()

app.get('/', (c) => {
  return c.text(`
  TURU REST API v0.1.0
  Cek github.com/indra87g/turu-api untuk dokumentasi.
  
  Kumpulan REST API berguna untuk aplikasi anda.

  `)
})

app.route('/math', Math)
app.route('/fun', Fun)
app.route('/test', Test)

app.get('/info', (c) => {
  return c.json({
    name: 'Turu API',
    server: 'https://turu-api.girsang395.worker.dev',
    version: 'v0.1.0',
    runtime: 'Bun',
    backend: 'Hono',
    deployer: 'Cloudflare KV'
  })
})

app.get('/hello/:name', (c) => {
  const name = c.req.param('name')
  return c.json({
    message: `Hello, ${name} !`
  })
})

export default app
