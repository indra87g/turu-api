import { Hono } from "hono";
import { prettyJSON } from 'hono/pretty-json'
import { swaggerUI } from '@hono/swagger-ui'

import { Calculate } from "./routes/calculate";

const app = new Hono().basePath("/api");
app.use(prettyJSON());
app.notFound((c) => c.json({ success: false, message: 'Endpoint not found!' }, 404));

app.get("/", (c) => {
  return c.json({
    success: true,
    name: "TURU REST API",
    description:
      "Free REST API for lazy people (fyi: turu is mean sleep in indonesia, Javanese language)",
    author: "indra87g",
    version: "0.1.2",
    license: "MIT",
    github: "https://github.com/indra87g/turu-api",
    status: "https://stats.uptimerobot.com/6tNlOje1Uv",
  });
});
app.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.text(`Hello, ${name}!`);
});
app.route("/calculate", Calculate);

const openApiSpec = {
  openapi: '3.0.0',
  info: {
    version: '0.1.2',
    title: 'TURU REST API',
    description: 'Free REST API for lazy people (fyi: turu is mean sleep in indonesia, Javanese language)',
    contact: {
      name: 'indra87g',
      url: 'https://github.com/indra87g/turu-api',
    },
  },
  servers: [{ url: '/api' }],
  paths: {
    '/': {
      get: {
        summary: 'Get API information',
        tags: ['Info'],
        responses: {
          '200': {
            description: 'API information',
          },
        },
      },
    },
    '/hello/{name}': {
      get: {
        summary: 'Say hello',
        tags: ['Greeting'],
        parameters: [
          {
            name: 'name',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Greeting message',
          },
        },
      },
    },
    '/calculate': {
      get: {
        summary: 'Perform calculations',
        tags: ['Math'],
        parameters: [
          {
            name: 'operation',
            in: 'query',
            required: true,
            schema: { type: 'string', enum: ['add', 'subtract', 'multiply', 'divide'] },
          },
          {
            name: 'num1',
            in: 'query',
            required: true,
            schema: { type: 'number' },
          },
          {
            name: 'num2',
            in: 'query',
            required: true,
            schema: { type: 'number' },
          },
        ],
        responses: {
          '200': {
            description: 'Calculation result',
          },
          '400': {
            description: 'Invalid operation or parameters',
          },
        },
      },
    },
  },
};

app.get('/openapi.json', (c) => c.json(openApiSpec));
app.get('/docs', swaggerUI({ url: '/api/openapi.json' }));

export default app;
