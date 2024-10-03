import { Hono } from "hono";

import { Guest } from "./routes/guest";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({
    name: "TURU REST API",
    description: "Free REST API for lazy people (fyi: turu is mean sleep in indonesia)",
    author: "indra87g (Programmer Pemalas)",
    version: "0.1.0 BETA",
    license: "MIT",
    git: "https://github.com/indra87g/turu-api",
    commit: "ff5bdce9b463692e05a08d3243589c9a8774b53e",
  });
});
app.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.text(`Hello, ${name}!`);
});
app.route("/guest", Guest);

export default app;
