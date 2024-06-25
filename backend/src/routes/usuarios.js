const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');

// Ruta de registro
router.post('/', async (req, res) => {
    // Validación de la entrada del usuario
    const { nombre, carrera, ciclo, codigo, email, password, role } = req.body;
    if (!nombre || !codigo || !email || !password) {
        return res.status(400).json({ msg: 'Por favor, proporciona todos los campos requeridos.' });
    }

    try {
        let usuario = await Usuario.findOne({ codigo });
        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        usuario = new Usuario({ nombre, carrera, ciclo, codigo, email, password, role });

        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        await usuario.save();

        // Generar JWT token
        const payload = {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                codigo: usuario.codigo,
                email: usuario.email,
                carrera: usuario.carrera,
                ciclo: usuario.ciclo,
                role: usuario.role
                // Agrega aquí todas las propiedades relevantes del usuario
            }
        };

        jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
});

// Añadir libro a favoritos
router.post('/:userId/favoritos', async (req, res) => {
    const { userId } = req.params;
    const { libroId } = req.body;
    
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            userId,
            { $addToSet: { 'libros.favoritos': libroId } }, // Utiliza $addToSet para evitar duplicados
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al añadir a favoritos:', error);
        res.status(500).json({ message: 'Error interno al añadir a favoritos' });
    }
});

// Añadir libro a leer más tarde
router.post('/:userId/masTarde', async (req, res) => {
    const { userId } = req.params;
    const { libroId } = req.body;

    try {
        const usuario = await Usuario.findByIdAndUpdate(
            userId,
            { $addToSet: { 'libros.mas_tarde': libroId } }, // Utiliza $addToSet para evitar duplicados
            { new: true }
        );

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al añadir a leer más tarde:', error);
        res.status(500).json({ message: 'Error interno al añadir a leer más tarde' });
    }
});

module.exports = router;

router.get('/:userId/', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const usuario = await Usuario.findById(userId);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener el usuario:', error); 
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { codigo, password } = req.body;

    try {
        // Verificar si el usuario existe
        let usuario = await Usuario.findOne({ codigo });
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        // Validar contraseña
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Generar JWT token
        const payload = {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                codigo: usuario.codigo,
                email: usuario.email,
                carrera: usuario.carrera,
                ciclo: usuario.ciclo,
                role: usuario.role,
                libros: usuario.libros,
            }
        };

        jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

//obtener usuario logueado
router.get('/login/:token', async (req, res) => {
    try {
        const { token } = req.params; // Accede al token desde los parámetros de la URL

        if (!token) {
            return res.status(400).json({ message: 'Se requiere el token' });
        }

        // Verificar y decodificar el token JWT
        jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }
            // El token es válido, imprime la información del usuario codificada en el token en la consola
            console.log('Usuario logueado:', decoded.usuario);
            // Devuelve la información del usuario codificada en el token como respuesta
            res.json({ usuario: decoded.usuario });
        });
    } catch (error) {
        console.error('Error al obtener el usuario:', error); 
        res.status(500).json({ message: 'Error al obtener el usuario', error: error.message });
    }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    // En un contexto JWT, simplemente devolvemos una respuesta de éxito.
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

module.exports = router;