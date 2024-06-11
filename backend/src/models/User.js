const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    ciclo: { type: String, required: true },
    codigo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    versionKey: false
});

module.exports = model('User', userSchema)