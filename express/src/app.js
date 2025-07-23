require('dotenv').config()
/* console.log(process.env.PORT) // Objeto process; para acceder a información del proyecto
// PORT es undefined al inicio; se define en archivo .env
console.log(process.env.NOMBRE) */

const express = require('express') // Importar módulo de Express

const { infoPeliculas } = require('./peliculas') // Importar objeto con información de películas
/* console.log(infoPeliculas) */

const app = express() // Crear aplicación de Express

/* const PORT = 3000 */ // Definir puerto que va a escuchar el servidor
const PORT = process.env.PORT

// Crear servidor
app.get('/', (req, res) => {
  res.send('Hola mundo')
}) // get(ruta -endpoint es la raíz-, callback(solicitud, respuesta))
// res = lo que queremos mostrar

app.get('/api/peliculas', (req, res) => {
  res.send(infoPeliculas)
})

app.get('/api/peliculas/accion/titulo/:titulo/:year', (req, res) => {
  /* const titulo = req.params.titulo
  const year = req.params.year */
  const { titulo, year } = req.params // Es lo mismo que arriba, pero de forma condensada
  const resultados = infoPeliculas.accion.filter(pelicula => pelicula.titulo === titulo && pelicula.year === Number(year))

  /* res.send(infoPeliculas.accion) */

  if (resultados.length === 0) {
    return res.status(400).send(`No se encontraron resultados para ${titulo} en el año ${year}`)
  } // 400 = fallo

  res.send(resultados)
}) // Uso de parámetros
// Ruta: http://localhost:3000/api/peliculas/accion
// :titulo = parámetro; puede ser también :year; para no crear una ruta para cada uno
// Si se quiere usar titulo y year como parámetros por separado debe usarse un diferenciador en su ruta, como añadir la palabra titulo o year. Ej. app.get('/api/peliculas/accion/year/:year')
// En este caso se usaron ambos parámetros en la ruta
// Considerar el tipo de dato, ej. convertir a número el año (en el enlace está como string).

app.get('/api/peliculas/comedia/:pais', (req, res) => {
  const pais = req.params.pais
  const resultados = infoPeliculas.comedia.filter(pelicula => pelicula.pais === pais)

  if (req.query.ordenar === 'year') {
    return res.send(resultados.sort((a, b) => b.year - a.year))
  }

  res.send(resultados)
}) // Uso de queries
// RUTA: http://localhost:3000/api/peliculas/comedia/usa?ordenar=year

app.use(express.json()) // middleware
app.post('/api/peliculas', (req, res) => {
  const nuevaPelicula = req.body

  console.log(nuevaPelicula)

  res.status(201).send({
    mensaje: 'La película se recibió con éxito',
    datos: nuevaPelicula
  })
}) // Uso de POST

// Escuchar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

// Notas adicionales:
// Crear archivo .env y definir variables, ej. PORT = 3000
// Instalar: npm install -D dotenv
// Añadir en .gitignore: .env
