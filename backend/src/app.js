//configuración del servidor
const express = require('express')
const cors = require('cors') //permite hacer peticiones dsd un sv distinto al del backend
const app = express();

//configuracion: hacemos que app guarde una variable (port), el puerto del sv
app.set('port', process.env.PORT || 4000)

//middlewares (logica que el codigo ejecuta antes de peticiones de las rutas)
app.use(cors())
app.use(express.json())

//rutas (url)
app.get('/', (req, res)=>{
    res.send('Bienvenido a mi API rest fullstack');
})

//ruta para nuestra api de libros
app.use('/api/libros', require('./routes/libro'))

module.exports = app;