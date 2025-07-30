import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'
import { fileURLToPath } from 'url'

// Rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = join(__filename, '..') // Directorio padre o raíz
const file = join(__dirname, 'db.json') // Archivo que contiene la info
const adapter = new JSONFile(file)
const defaultData = { messages: [] }

const db = new Low(adapter, defaultData)

await db.read()
await db.write()

// console.log('Ruta:', __filename) // Resultado óptimo para la conexión; mejora la lectura de la ruta
// console.log('Ruta:', import.meta.url)

export default db
