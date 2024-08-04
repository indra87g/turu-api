import { Hono } from 'hono'

const Math = new Hono()

Math.get('/add', (c) => {
  const num1 = parseFloat(c.req.query('num1'));
  const num2 = parseFloat(c.req.query('num2'));

  if (isNaN(num1) || isNaN(num2)) {
    return c.text('Invalid number provided.');
  }

  const result = num1 + num2;
  return c.text(result);
})

export { Math }