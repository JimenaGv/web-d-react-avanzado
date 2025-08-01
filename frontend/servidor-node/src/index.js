// SERVIDOR CON NODE.JS
const http = require('http') // cargar módulo de http para poder usar sus métodos/funciones

// Creación del servidor
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }) // Encabezado de la respuesta
  res.end('Hola mundo desde Node.js') // Respuesta
})

// Escuchar el servidor
const PORT = 3000 // Puerto
server.listen(PORT, () => {
  console.log('Servidor ejecutándose en el port http://localhost:3000')
})
