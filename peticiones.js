// peticiones.js
// Pruebas de la API de Librería Nexus con Express

const API_BASE_URL = 'http://localhost:3000';

console.log('🚀 Iniciando pruebas de la API de Librería Nexus\n');
console.log('=' .repeat(60));

// Función auxiliar para agregar delay entre peticiones
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Petición 1: Obtener todos los productos
async function obtenerTodosLosProductos() {
  console.log('\n📦 PETICIÓN 1: Obtener todos los productos');
  console.log('URL:', `${API_BASE_URL}/productos`);
  console.log('-'.repeat(60));
  
  try {
    const response = await fetch(`${API_BASE_URL}/productos`);
    const data = await response.json();
    
    
    console.log('✅ Respuesta exitosa');
    console.log(`Total de productos: ${data.length}`);
    console.log('Primeros 3 productos:');
    data.slice(0, 3).forEach(producto => {
      console.log(`  - ${producto.nombre} (${producto.categoria}) - $${producto.precio}`);
    });
    console.log('\nRespuesta completa:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Petición 2: Obtener un producto específico por ID
async function obtenerProductoPorId(id) {
  console.log(`\n🔍 PETICIÓN 2: Obtener producto con ID ${id}`);
  console.log('URL:', `${API_BASE_URL}/api/productos/${id}`);
  console.log('-'.repeat(60));
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/productos/${id}`);
    
    if (!response.ok) {
      console.log('❌ Producto no encontrado (404)');
      return;
    }
    
    const data = await response.json();
    
    console.log('✅ Respuesta exitosa');
    console.log(`Producto: ${data.nombre}`);
    console.log(`Categoría: ${data.categoria}`);
    console.log(`Precio: $${data.precio}`);
    console.log(`Descuento: ${data.descuento}%`);
    console.log(`Disponible: ${data.disponible ? 'Sí' : 'No'}`);
    console.log('\nRespuesta completa:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Petición 3: Crear un nuevo producto (POST)
async function crearProducto() {
  console.log('\n➕ PETICIÓN 3: Crear nuevo producto');
  console.log('URL:', `${API_BASE_URL}/api/productos`);
  console.log('-'.repeat(60));
  
  const nuevoProducto = {
    nombre: "Latte Vainilla",
    precio: 4.00,
    descuento: 5,
    disponible: "true",
    categoria: "cafeteria",
    descripcion: "Latte con sirope de vainilla",
    imagen_url: "/images/latte-vainilla.jpg"
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    });
    
    const data = await response.json();
    
    console.log('✅ Producto creado exitosamente');
    console.log(`ID asignado: ${data.id}`);
    console.log(`Nombre: ${data.nombre}`);
    console.log('\nRespuesta completa:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Petición 4: Eliminar un producto (DELETE)
async function eliminarProducto(id) {
  console.log(`\n🗑️  PETICIÓN 4: Eliminar producto con ID ${id}`);
  console.log('URL:', `${API_BASE_URL}/api/productos/${id}`);
  console.log('-'.repeat(60));
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/productos/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      console.log('❌ Producto no encontrado (404)');
      return;
    }
    
    const data = await response.json();
    
    console.log('✅ Producto eliminado exitosamente');
    console.log(`Producto eliminado: ${data.nombre}`);
    console.log('\nRespuesta completa:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Petición 5: Obtener productos de cafetería (usando query parameter)
async function obtenerProductosCafeteria() {
  console.log('\n☕ PETICIÓN 5: Obtener productos de cafetería');
  console.log('URL:', `${API_BASE_URL}/productos?categoria=cafeteria`);
  console.log('(Filtrando por categoría en el servidor)');
  console.log('-'.repeat(60));

  try {
    const response = await fetch(`${API_BASE_URL}/productos?categoria=cafeteria`);
    const data = await response.json();

    console.log('✅ Respuesta exitosa');
    console.log(`Total de productos de cafetería: ${data.length}`);
    console.log('Productos encontrados:');
    data.forEach(producto => {
      console.log(`  - ${producto.nombre} - $${producto.precio}${producto.descuento > 0 ? ` (${producto.descuento}% desc.)` : ''}`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Petición 6: Obtener productos de librería (usando query parameter)
async function obtenerProductosLibreria() {
  console.log('\n📚 PETICIÓN 6: Obtener productos de librería');
  console.log('URL:', `${API_BASE_URL}/productos?categoria=libreria`);
  console.log('(Filtrando por categoría en el servidor)');
  console.log('-'.repeat(60));

  try {
    const response = await fetch(`${API_BASE_URL}/productos?categoria=libreria`);
    const data = await response.json();

    console.log('✅ Respuesta exitosa');
    console.log(`Total de productos de librería: ${data.length}`);
    console.log('Productos encontrados:');
    data.forEach(producto => {
      console.log(`  - ${producto.nombre} - $${producto.precio} ${!producto.disponible ? '(No disponible)' : ''}`);
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Petición 7: Obtener productos disponibles (usando query parameter)
async function obtenerProductosDisponibles(disponible) {
  const queryParam = disponible !== undefined ? `?disponible=${disponible}` : '';
  console.log(`\n✨ PETICIÓN 7: Obtener productos ${disponible === 'false' ? 'NO disponibles' : 'disponibles'}`);
  console.log('URL:', `${API_BASE_URL}/api/productos/disponibles${queryParam}`);
  console.log('-'.repeat(60));

  try {
    const response = await fetch(`${API_BASE_URL}/api/productos/disponibles${queryParam}`);
    const data = await response.json();

    console.log('✅ Respuesta exitosa');
    console.log(`Total de productos: ${data.length}`);
    console.log('Productos encontrados:');
    data.forEach(producto => {
      console.log(`  - ${producto.nombre} (${producto.categoria}) - $${producto.precio}${producto.descuento > 0 ? ` (${producto.descuento}% desc.)` : ''}`);
    });
    console.log('\nRespuesta completa:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Petición 8: Obtener productos no disponibles (usando query parameter)
async function obtenerProductosNoDisponibles() {
  console.log('\n🚫 PETICIÓN 8: Obtener productos NO disponibles');
  console.log('URL:', `${API_BASE_URL}/api/productos/disponibles?disponible=false`);
  console.log('-'.repeat(60));

  try {
    const response = await fetch(`${API_BASE_URL}/api/productos/disponibles?disponible=false`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();

    console.log('✅ Respuesta exitosa');
    console.log(`📊 Total de productos NO disponibles: ${data.length}`);
    
    if (data.length === 0) {
      console.log('ℹ️  No hay productos no disponibles en este momento');
    } else {
      console.log('📋 Productos NO disponibles encontrados:');
      data.forEach((producto, index) => {
        console.log(`  ${index + 1}. ${producto.nombre} (${producto.categoria})`);
        console.log(`     Precio: $${producto.precio}`);
        console.log(`     Descuento: ${producto.descuento}%`);
        console.log(`     Disponible: ${producto.disponible ? 'Sí' : 'No'}`);
        if (producto.descripcion) {
          console.log(`     Descripción: ${producto.descripcion}`);
        }
        console.log('     ---');
      });
    }
    
    console.log('\n📄 Respuesta completa:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejecutar todas las peticiones en secuencia
async function ejecutarTodasLasPeticiones() {
  await obtenerTodosLosProductos();
  await delay(1000);

  await obtenerProductoPorId(1);
  await delay(1000);

  await obtenerProductoPorId(7);
  await delay(1000);

  await crearProducto();
  await delay(1000);

  await obtenerProductosCafeteria();
  await delay(1000);

  await obtenerProductosLibreria();
  await delay(1000);

  // Probar la nueva ruta de disponibles
  await obtenerProductosDisponibles('true');
  await delay(1000);

  await obtenerProductosDisponibles('false');
  await delay(1000);

  await eliminarProducto(13); // El producto que acabamos de crear
  await delay(1000);

  // Verificar que se eliminó
  console.log('\n🔄 VERIFICACIÓN: Listando productos después de eliminar');
  await obtenerTodosLosProductos();

  console.log('\n' + '='.repeat(60));
  console.log('✅ Todas las peticiones completadas');
  console.log('='.repeat(60));
}

// Ejecutar
ejecutarTodasLasPeticiones();