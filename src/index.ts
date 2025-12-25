import { Hono } from "hono";
import { prettyJSON } from 'hono/pretty-json'
import { swaggerUI } from '@hono/swagger-ui'

import { Calculate } from "./routes/calculate";

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

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TURU REST API</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 600px;
            padding: 40px;
            text-align: center;
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2.5em;
        }
        
        .subtitle {
            color: #666;
            font-size: 1.1em;
            margin-bottom: 30px;
            font-style: italic;
        }
        
        .description {
            color: #555;
            line-height: 1.6;
            margin-bottom: 30px;
            font-size: 1em;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
            text-align: left;
        }
        
        .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        
        .info-label {
            color: #999;
            font-size: 0.85em;
            text-transform: uppercase;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        .info-value {
            color: #333;
            font-size: 1.1em;
            font-weight: 500;
            word-break: break-all;
        }
        
        .links {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 30px;
        }
        
        a {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 0.95em;
        }
        
        .btn-docs {
            background: #667eea;
            color: white;
        }
        
        .btn-docs:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-github {
            background: #333;
            color: white;
        }
        
        .btn-github:hover {
            background: #000;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .btn-api {
            background: #764ba2;
            color: white;
        }
        
        .btn-api:hover {
            background: #653b8a;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(118, 75, 162, 0.4);
        }
        
        .status {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .status-badge {
            display: inline-block;
            background: #4caf50;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 600;
        }
        
        @media (max-width: 600px) {
            h1 {
                font-size: 1.8em;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .container {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌙 TURU REST API</h1>
        <p class="subtitle">Free REST API for lazy people</p>
        
        <p class="description">
            TURU means "sleep" in Indonesian (Javanese language). This is a free REST API for those who want to get things done without much effort.
        </p>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Version</div>
                <div class="info-value">0.1.2</div>
            </div>
            <div class="info-item">
                <div class="info-label">Author</div>
                <div class="info-value">indra87g</div>
            </div>
            <div class="info-item">
                <div class="info-label">License</div>
                <div class="info-value">MIT</div>
            </div>
            <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">Active</div>
            </div>
        </div>
        
        <div class="links">
            <a href="/docs" class="btn-docs">📚 API Documentation</a>
            <a href="/api" class="btn-api">⚙️ API Info</a>
            <a href="https://github.com/indra87g/turu-api" class="btn-github" target="_blank">🐙 GitHub</a>
        </div>
        
        <div class="status">
            <span class="status-badge">✓ Server Running</span>
        </div>
    </div>
</body>
</html>`;

const app = new Hono();

app.get('/', (c) => {
  return c.html(htmlTemplate);
});

app.get('/openapi.json', (c) => c.json(openApiSpec));
app.get('/docs', swaggerUI({ url: '/openapi.json' }));

app.route('/api', apiApp);

export default app;
