// Test de la ruta de productos disponibles

const API_BASE_URL = 'http://localhost:3000';

async function testDisponibles() {
  console.log('🧪 Probando ruta /api/productos/disponibles\n');

  try {
    const response = await fetch(`${API_BASE_URL}/api/productos/disponibles`);
    const data = await response.json();

    console.log('✅ Respuesta exitosa');
    console.log(`Total de productos disponibles: ${data.length}`);
    console.log('\nProductos disponibles:');
    data.forEach(producto => {
      console.log(`  - ${producto.nombre} (${producto.categoria}) - $${producto.precio}`);
    });
    console.log('\nRespuesta completa:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDisponibles();
