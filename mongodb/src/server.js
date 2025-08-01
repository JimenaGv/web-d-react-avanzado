import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes/users.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use('/api', router)

app.get('/', (req, res) => {
  res.send("Hola Atlas")
})

// connect() pide una URL o llave que conecte con la BD
mongoose
.connect(process.env.MONGODB_KEY)
.then(() => console.log("Conectado a Mongo DB Atlas"))
.catch( error => console.error(error))

app.listen(PORT, () => {
  console.log("Aplicación corriendo en puerto",PORT)
})
