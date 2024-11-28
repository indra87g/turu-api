import { Hono } from "hono";

import { Guest } from "./routes/guest";

const app = new Hono().basePath("/api");

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
  });
});
app.get("/hello/:name", (c) => {
  const name = c.req.param("name");
  return c.text(`Hello, ${name}!`);
});
app.get("/calculate", (c) => {
  const operation = c.req.query("operation");
  const num1 = parseFloat(c.req.query("num1"));
  const num2 = parseFloat(c.req.query("num2"));

  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        return;
        c.text("Error: Division by zero", 400);
      }
      result = num1 / num2;
      break;
    default:
      return c.text("Error: Invalid operation", 400);
  }

  return c.json({ result });
});
app.route("/guest", Guest);

export default app;
