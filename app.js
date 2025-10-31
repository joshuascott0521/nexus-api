// app.js
const express = require("express");
const app = express();

// --- CORS (simple; en prod cambia * por whitelist si quieres) ---
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());

// ----------------------------
// DATOS (en memoria)
// ----------------------------
const Productos = [
  {
    id: 1,
    nombre: "Café Americano",
    precio: 2.5,
    descuento: 0,
    disponible: true,
    categoria: "cafeteria",
    descripcion: "Café negro americano de especialidad",
    imagen_url: "/images/cafe-americano.jpg",
  },
  {
    id: 2,
    nombre: "Capuchino",
    precio: 3.5,
    descuento: 10,
    disponible: true,
    categoria: "cafeteria",
    descripcion: "Capuchino con leche vaporizada",
    imagen_url: "/images/capuchino.jpg",
  },
  {
    id: 3,
    nombre: "Té Verde",
    precio: 2.0,
    descuento: 0,
    disponible: true,
    categoria: "cafeteria",
    descripcion: "Té verde orgánico",
    imagen_url: "/images/te-verde.jpg",
  },
  {
    id: 4,
    nombre: "Croissant",
    precio: 2.8,
    descuento: 15,
    disponible: true,
    categoria: "cafeteria",
    descripcion: "Croissant de mantequilla",
    imagen_url: "/images/croissant.jpg",
  },
  {
    id: 5,
    nombre: "Sándwich de Jamón",
    precio: 4.5,
    descuento: 0,
    disponible: false,
    categoria: "cafeteria",
    descripcion: "Sándwich de jamón y queso",
    imagen_url: "/images/sandwich.jpg",
  },
  {
    id: 7,
    nombre: "Libro de Programación",
    precio: 35.0,
    descuento: 20,
    disponible: true,
    categoria: "libreria",
    descripcion: "Libro introductorio a la programación",
    imagen_url: "/images/libro-programacion.jpg",
  },
];

// ----------------------------
// RUTAS
// ----------------------------
app.get("/", (req, res) => res.send("API de Productos - Cafetería y Librería"));

// lista completa (prefijo /api)
app.get("/api/productos", (req, res) => {
  res.send(Productos);
});

// lista sin prefijo (opcional para compatibilidad)
app.get("/productos", (req, res) => {
  const { categoria } = req.query;
  if (!categoria) return res.send(Productos);
  res.send(Productos.filter((p) => p.categoria === categoria));
});

// disponibles (con ?disponible=true|false)
app.get("/api/productos/disponibles", (req, res) => {
  const { disponible } = req.query;
  if (disponible === undefined)
    return res.send(Productos.filter((p) => p.disponible));
  const esDisponible = disponible === "true";
  res.send(Productos.filter((p) => p.disponible === esDisponible));
});

// detalle
app.get("/api/productos/:id", (req, res) => {
  const producto = Productos.find((p) => p.id === parseInt(req.params.id, 10));
  if (!producto) return res.status(404).send("Producto no encontrado");
  res.send(producto);
});

// crear
app.post("/api/productos", (req, res) => {
  const producto = {
    id: Productos.length + 1,
    ...req.body,
    disponible: req.body.disponible === "true" || req.body.disponible === true,
  };
  Productos.push(producto);
  res.send(producto);
});

// eliminar
app.delete("/api/productos/:id", (req, res) => {
  const index = Productos.findIndex(
    (p) => p.id === parseInt(req.params.id, 10)
  );
  if (index === -1) return res.status(404).send("Producto no encontrado");
  const eliminado = Productos.splice(index, 1)[0];
  res.send(eliminado);
});

// healthcheck (opcional)
app.get("/api/ping", (req, res) => res.json({ ok: true }));

module.exports = app;
