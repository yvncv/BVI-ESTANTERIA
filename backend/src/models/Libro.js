const {Schema, model} = require('mongoose')

const libroSchema = new Schema({
    carrera: { type: String, required: true },
    ciclo: { type: Number, required: true },
    curso: { type: String, required: true },
    autor: { type: String, required: true },
    titulo: { type: String, required: true },
    lugar: { type: String, required: true },
    tipo: { type: String, required: true },
    categoria: { type: String, required: true },
    enlace: { type: String, required: true },
}, {
    versionKey: false
});

module.exports = model('Libro', libroSchema)