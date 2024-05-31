const {Schema, model} = require('mongoose')

const libroSchema = new Schema({
    _id: String,
    carrera: String,
    ciclo: String,
    curso: String,
    autor: String,
    titulo: String,
    lugar: String,
    tipo: String,
    categoria: String,
    enlace: String,
},
{
    timestamps: true 
})

module.exports = model('Libro', libroSchema)