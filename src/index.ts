import { Hono } from "hono";
import { html } from "hono/html";
import { prettyJSON } from 'hono/pretty-json'

import { Calculate } from "./routes/calculate";
import { Guest } from "./routes/guest";

const app = new Hono().basePath("/api");
app.use(prettyJSON())
app.notFound((c) => c.json({ success: false, message: 'Endpoint not found!' }, 404))

app.get("/", (c) => {
  return c.json({
    success: true,
    name: "TURU REST API",
    description:
      "Free REST API for lazy people (fyi: turu is mean sleep in indonesia, Javanese language)",
    author: "indra87g (Programmer Pemalas)",
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
app.route("/guest", Guest);

export default app;
