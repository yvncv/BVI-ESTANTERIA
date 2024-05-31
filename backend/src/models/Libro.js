const {Schema, model} = require('mongoose')

const libroSchema = new Schema({
    autor: String,
    titulo: String,
    editorial: String,
    categoria: String,
    enlace: String,
},
{
    timestamps: true 
})

module.exports = model('Libro', libroSchema)