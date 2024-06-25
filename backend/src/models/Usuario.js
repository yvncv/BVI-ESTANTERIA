const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    ciclo: { type: String, required: true },
    codigo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'alumno'],
        default: 'alumno'
    },
    libros: { 
        mas_tarde: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Libro' }],
        favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Libro' }]
    }, // Relación con libros
}, {
    versionKey: false
});

module.exports = model('Usuario', usuarioSchema);