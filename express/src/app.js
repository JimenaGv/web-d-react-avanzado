// 1. Importar express Common JS
/* const express = require('express')
require('dotenv').config()  */// ejecuta

// Otra forma de hacer la importación ...
// 1. Importar express y dotenv con ESModules
import express from 'express'
import dotenv from 'dotenv'

import fs from 'fs' // Importar file system (de node), permite acceder a métodos para gestionar archivos ej. leerlos, modificarlos, eliminarlos, etc.

dotenv.config()

// 2. Crear la aplicación de express
const app = express()
const PORT = process.env.PORT

// Función que lee la información de la base de datos db.json
const readData = () => {
  try {
    const data = fs.readFileSync('./src/db.json')
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}

/* console.log(readData()) */

// Función que escribe dentro de db.json
const writeData = (data) => {
  try {
    fs.writeFileSync('./src/db.json', JSON.stringify(data)) // La función no retorna nada, sino que se ejecuta directamente
  } catch (error) {
    console.error(error)
  }
  // se puede incluir, pero no es necesario:
  // return JSON.stingify(data)
}

// 3. Utilizar la app
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/peliculas', (req, res) => {
  const data = readData()
  res.json(data)
})

// Obtener datos
app.get('/peliculas/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const result = readData().accion.find(pelicula => pelicula.id === id)
  res.json(result)
})

// Añadir datos
app.use(express.json())
app.post('/peliculas', (req, res) => {
  const data = readData()
  const body = req.body
  const newMovie = {
    id: data.accion.length + 1,
    ...body
  }
  data.accion.push(newMovie)
  writeData(data)
  res.json(newMovie)
})

// Modificar datos
app.put('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const body = req.body
  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion[peliculaIndex] = {
    ...data.accion[peliculaIndex],
    ...body
  }
  writeData(data)
  res.json({ message: 'Pelicula actualizada correctamente' })
})

// Eliminar datos
app.delete('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion.splice(peliculaIndex, 1)
  writeData(data)
  res.json({ message: 'Pelicula eliminada correctamente' })
})

app.listen(PORT, () => {
  console.log('Servidor corriendo en puerto', PORT)
})

// Extensiones:
// Thunder Client -> Añade un ícono donde puede ser utilizado ⚡
// REST Client -> Archivo http
