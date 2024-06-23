const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Autorización requerida' });
  }

  const token = authHeader.split(' ')[1]; // Asume que el token está en el formato 'Bearer token'

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.user = decoded; // Adjunta la información del usuario al request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado', error });
  }
};

module.exports = { verifyUser };