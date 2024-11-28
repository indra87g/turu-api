import { Hono } from "hono";
import { html } from "hono/html";
import { prettyJSON } from 'hono/pretty-json'
import { config } from "dotenv";

import { Calculate } from "./routes/calculate";
import { Guest } from "./routes/guest";

config()

const app = new Hono().basePath("/api");
const test = process.env.DATABASE_NAME
app.use(prettyJSON())
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

app.get("/", (c) => {
  return c.json({
    name: "TURU REST API",
    description:
      "Free REST API for lazy people (fyi: turu is mean sleep in indonesia)",
    author: "indra87g (Programmer Pemalas)",
    version: "0.1.1",
    license: "MIT",
    github: "https://github.com/indra87g/turu-api",
    status: "https://stats.uptimerobot.com/6tNlOje1Uv",
    database: test,
    success: true,
  });
});
app.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.text(`Hello, ${name}!`);
});
app.route("/calculate", Calculate);
app.route("/guest", Guest);

export default app;
