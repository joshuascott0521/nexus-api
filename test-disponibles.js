// test-disponibles.js
const API_BASE_URL =
  process.env.API_BASE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

async function testDisponibles() {
  const q = process.argv[2]; // 'true' | 'false' | undefined
  const url = `${API_BASE_URL}/api/productos/disponibles${
    q ? `?disponible=${q}` : ""
  }`;

  console.log("🧪 Probando:", url, "\n");

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);

    const data = await response.json();
    console.log("✅ Respuesta exitosa");
    console.log(`Total: ${data.length}\n`);
    data.forEach((p) =>
      console.log(` - ${p.nombre} (${p.categoria}) $${p.precio}`)
    );
    console.log("\nRespuesta completa:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

testDisponibles();
