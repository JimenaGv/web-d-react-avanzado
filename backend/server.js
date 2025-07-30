// ETAPA 2
import express from 'express'
import cors from 'cors'
import { generateFromOllama } from './ollamaService.js'

const app = express()
const PORT = 3001

// Middleware para CORS y JSON
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.post('/api/chat', async (req, res) => {
  // Otra forma: const res = req.body.prompt
  const { prompt } = req.body

  try {
    const response = await generateFromOllama(prompt)
    res.json({ response }) // Desestructurar respuesta
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al procesar la solicitud' }) // Internal Server Error // https://http.cat/
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`)
})
