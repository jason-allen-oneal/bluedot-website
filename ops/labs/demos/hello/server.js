import express from 'express';

const app = express();

const port = Number(process.env.PORT || 3000);
// Must match the path the proxy mounts this demo at (e.g. /hello)
const basePath = (process.env.BASE_PATH || '/hello').replace(/\/$/, '');

// A tiny demo that is explicitly base-path aware.
app.get(`${basePath}/`, (req, res) => {
  const forwardedPrefix = req.get('x-forwarded-prefix');

  res.type('html').send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Labs / Hello</title>
  <style>
    :root{color-scheme:dark}
    body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;background:#0b0e14;color:#e6e6e6}
    .wrap{max-width:820px;margin:0 auto;padding:32px 18px}
    a{color:#c9d4ff}
    code{color:#c9d4ff}
    .muted{color:#9aa5b6}
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Labs: Hello</h1>
    <p class="muted">If you can see this at <code>${basePath}/</code>, the proxy wiring works.</p>

    <ul>
      <li>Configured <code>BASE_PATH</code>: <code>${basePath}</code></li>
      <li>Header <code>X-Forwarded-Prefix</code>: <code>${forwardedPrefix || '(none)'}</code></li>
    </ul>

    <p><a href="/">Back to Labs index</a></p>
  </div>
</body>
</html>`);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`hello demo listening on :${port} (basePath=${basePath})`);
});
