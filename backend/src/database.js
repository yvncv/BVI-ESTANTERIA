//cadena de conexion del sv a la bd
const mongoose = require('mongoose')

//cadena de conexion
const URI = process.env.MONGODB_URI
            ? process.env.MONGODB_URI
            //(if) si no se encuentra esta variable{
            : 'mongodb+srv://202111351:202111351@dblibros.n5bjr.mongodb.net/?retryWrites=true&w=majority&appName=dblibros'
            //usa esta}
            //# para esto necesitamos ejecutar mongodb compass y mongod en 
            //C:\Program Files\MongoDB\Server\7.0\bin 
            
mongoose.connect(URI) 
//conectamos mongo a URI 

const connection = mongoose.connection; 
//variable que simbolice conexion a la bd

connection.once('open', ()=>{

    console.log('la bd ha sido conectada: ', URI);
}) 
//una vez que se establece la concexion, se nos hace saber a traves del msj