import { Hono } from "hono";

import { Routes } from "./routes";

const app = new Hono().basePath("/api");


app.get("/", (c) => {
  return c.json(
    {
      name: "TURU REST API",
      description: 'Free REST API for lazy people.',
      version: '0.1.0',
      license: 'MIT',
      git: 'https://github.com/indra87g/turu-api',
      commit: 'none'
    }
  )
});
app.route("/posts", Routes);

export default app;
