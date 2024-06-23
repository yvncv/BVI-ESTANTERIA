const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const libroSchema = new Schema({
    carrera: { type: String, required: true },
    ciclo: { type: String, required: true },
    curso: { type: String, required: true },
    autor: { type: String, required: true },
    titulo: { type: String, required: true },
    lugar: { type: String, required: true },
    tipo: { type: String, required: true },
    categoria: { type: String, required: true },
    enlace: { type: String, required: true },
    portada: { type: String, required: true },
    contador: { type: Number, default: 0 }, // Inicializamos el contador en 0
    usuarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }], // Relación con usuarios
}, {
    versionKey: false
});

module.exports = model('Libro', libroSchema);