const express = require("express");
const app = express();

// Middleware de CORS - permite peticiones desde el frontend
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   // Manejar preflight requests
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// app.use(express.json());
// api/index.js
const serverless = require("serverless-http");
const app = require("../app");

module.exports = serverless(app);

const Productos = [
  // Productos de Cafetería
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
    descripcion: "Croissant de mantequilla recién horneado",
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
    id: 6,
    nombre: "Muffin de Arándanos",
    precio: 3.2,
    descuento: 5,
    disponible: true,
    categoria: "cafeteria",
    descripcion: "Muffin casero con arándanos frescos",
    imagen_url: "/images/muffin.jpg",
  },

  // Productos de Librería
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
  {
    id: 8,
    nombre: "Cuaderno A4",
    precio: 8.5,
    descuento: 0,
    disponible: true,
    categoria: "libreria",
    descripcion: "Cuaderno de 100 hojas rayadas",
    imagen_url: "/images/cuaderno.jpg",
  },
  {
    id: 9,
    nombre: "Bolígrafo Azul",
    precio: 1.2,
    descuento: 0,
    disponible: true,
    categoria: "libreria",
    descripcion: "Paquete de 3 bolígrafos azules",
    imagen_url: "/images/boligrafo.jpg",
  },
  {
    id: 10,
    nombre: "Mochila Estudiante",
    precio: 45.0,
    descuento: 25,
    disponible: true,
    categoria: "libreria",
    descripcion: "Mochila resistente para estudiantes",
    imagen_url: "/images/mochila.jpg",
  },
  {
    id: 11,
    nombre: "Calculadora Científica",
    precio: 22.0,
    descuento: 0,
    disponible: false,
    categoria: "libreria",
    descripcion: "Calculadora científica con funciones avanzadas",
    imagen_url: "/images/calculadora.jpg",
  },
  {
    id: 12,
    nombre: "Set de Marcadores",
    precio: 12.5,
    descuento: 10,
    disponible: true,
    categoria: "libreria",
    descripcion: "Set de 8 marcadores de colores",
    imagen_url: "/images/marcadores.jpg",
  },
];

app.get("/", (req, res) => {
  res.send("API de Productos - Cafetería y Librería");
});

app.get("/productos", (req, res) => {
  const { categoria } = req.query;

  // Si no se especifica categoría, devolver todos los productos
  if (!categoria) {
    return res.send(Productos);
  }

  // Filtrar por categoría
  const productos = Productos.filter((p) => p.categoria === categoria);
  res.send(productos);
});

app.get("/api/productos/disponibles", (req, res) => {
  const { disponible } = req.query;

  // Si no se especifica el query, devolver todos los productos disponibles por defecto
  if (disponible === undefined) {
    const productos = Productos.filter((p) => p.disponible);
    return res.send(productos);
  }

  // Convertir el query string a boolean
  const esDisponible = disponible === "true";
  const productos = Productos.filter((p) => p.disponible === esDisponible);
  res.send(productos);
});

app.get("/api/productos/:id", (req, res) => {
  const producto = Productos.find((p) => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).send("Producto no encontrado");
  else res.send(producto);
});

app.post("/api/productos", (req, res) => {
  const producto = {
    id: Productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio,
    descuento: req.body.descuento,
    disponible: req.body.disponible === "true",
    categoria: req.body.categoria,
    descripcion: req.body.descripcion,
    imagen_url: req.body.imagen_url,
  };
  Productos.push(producto);
  res.send(producto);
});

app.delete("/api/productos/:id", (req, res) => {
  const producto = Productos.find((p) => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).send("Producto no encontrado");

  const index = Productos.indexOf(producto);
  Productos.splice(index, 1);
  res.send(producto);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
