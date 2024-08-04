import { Hono } from 'hono'

const Test = new Hono()

Test.get('/', (c) => {
  return c.text('This is a route for testing unstable features.')
})

export { Test }