const express = require('express') // Importar módulo de Express

const app = express() // Crear aplicación de Express

const PORT = 3000 // Definir puerto que va a escuchar el servidor

// Crear servidor
app.get('/', (req, res) => {
  res.send('Hola mundo')
}) // get(ruta -endpoint es la raíz-, callback(solicitud, respuesta))

// Escuchar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
