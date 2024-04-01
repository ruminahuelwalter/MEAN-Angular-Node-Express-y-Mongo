// Creamos servidor
const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')

const app = express()

// Conectamos a la base de datos
conectarDB()
app.use(cors())

// Definimos una ruta principal
/* app.get('/', (req, res) => {
  res.send('Hola mundo')
}) */

// Configuramos un middleware
app.use(express.json())

app.use('/api/productos', require('./routes/producto'))

app.listen(4000, () => {
  console.log('El servidor esta corriendo http://localhost:4000')
})
