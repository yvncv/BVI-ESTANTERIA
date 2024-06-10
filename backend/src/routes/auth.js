const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Ruta de registro
router.post('/register', async (req, res) => {
    const { name, password } = req.body; // Asegúrate de que los campos aquí coincidan con lo que esperas

    try {
        let user = await User.findOne({ name });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ name, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: { id: user.id }
        };

        jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 }, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { name, password } = req.body; // Asegúrate de que los campos aquí coincidan con lo que esperas

    try {
        // Verificar si el usuario existe
        let user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Validar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generar JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 }, 
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;