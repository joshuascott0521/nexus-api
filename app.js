// app.js
const express = require("express");
const app = express();

// --- tu middleware CORS tal cual ---
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());

// --- tu array Productos y TODAS las rutas tal cual de index.js ---
// GET /productos, GET /api/productos/disponibles, GET /api/productos/:id,
// POST /api/productos, DELETE /api/productos/:id, etc.  :contentReference[oaicite:1]{index=1}

module.exports = app;
