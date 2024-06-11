const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    ciclo: { type: String, required: true },
    codigo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'alumno'], // Define los roles posibles
        default: 'alumno' // Asigna el rol por defecto a 'user'
    }
}, {
    versionKey: false
});

module.exports = model('Usuario', usuarioSchema)