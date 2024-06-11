const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ruta de registro
router.post('/register', async (req, res) => {
    // Validación de la entrada del usuario
    const { nombre, carrera, ciclo, codigo, email, password, role } = req.body;
    if (!nombre || !codigo || !email || !password) {
        return res.status(400).json({ msg: 'Por favor, proporciona todos los campos requeridos.' });
    }

    try {
        let user = await User.findOne({ codigo });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        user = new User({ nombre, carrera, ciclo, codigo, email, password, role });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generar JWT token
        const payload = {
            user: {
                id: user.id,
                nombre: user.nombre,
                codigo: user.codigo,
                email: user.email,
                carrera: user.carrera,
                ciclo: user.ciclo
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

// Ruta de login
router.post('/login', async (req, res) => {
    const { codigo, password } = req.body;

    try {
        // Verificar si el usuario existe
        let user = await User.findOne({ codigo });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario conectado desde otra sesión' });
        }

        // Validar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Generar JWT token
        const payload = {
            user: {
                id: user.id,
                nombre: user.nombre,
                codigo: user.codigo,
                email: user.email,
                carrera: user.carrera,
                ciclo: user.ciclo
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
            console.log('Usuario logueado:', decoded.user);
            // Devuelve la información del usuario codificada en el token como respuesta
            res.json({ user: decoded.user });
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