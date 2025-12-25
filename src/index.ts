import { Hono } from "hono";
import { prettyJSON } from 'hono/pretty-json'
import { swaggerUI } from '@hono/swagger-ui'

import { Calculate } from "./routes/calculate";
import { htmlTemplate } from "./miscs/html";
import { openApiSpec } from "./miscs/openapi";

const apiApp = new Hono();
apiApp.use(prettyJSON());
apiApp.notFound((c) => c.json({ success: false, message: 'Endpoint not found!' }, 404));

apiApp.get("/", (c) => {
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
apiApp.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.text(`Hello, ${name}!`);
});
apiApp.route("/calculate", Calculate);

const app = new Hono();

app.get('/', (c) => {
  return c.html(htmlTemplate);
});

app.get('/openapi.json', (c) => c.json(openApiSpec));
app.get('/docs', swaggerUI({ url: '/openapi.json' }));

app.route('/api', apiApp);

export default app;
