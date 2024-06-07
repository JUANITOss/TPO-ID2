const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Asegúrate de tener un modelo de usuario

// Ruta de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).send({ message: 'Credenciales incorrectas' });
  }

  req.session.userId = user._id;
  res.send({ userId: user._id });
});

// Ruta de logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: 'Error al cerrar sesión' });
    }
    res.send({ message: 'Sesión cerrada correctamente' });
  });
});

// Ruta para verificar sesión
router.get('/session', (req, res) => {
  if (req.session.userId) {
    res.send({ userId: req.session.userId });
  } else {
    res.status(401).send({ message: 'No autenticado' });
  }
});

module.exports = router;
