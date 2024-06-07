const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta de registro
router.post('/register', async (req, res) => {
  const { username, password, nombre, direccion, dni } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send({ message: 'El usuario ya existe' });
  }

  const user = new User({ username, password, nombre, direccion, dni });
  await user.save();
  res.send({ message: 'Usuario registrado correctamente' });
});

// Ruta de login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    return res.status(401).send({ message: 'Credenciales incorrectas' });
  }

  user.lastLogin = new Date();
  user.sessionStart = new Date();
  await user.save();

  req.session.userId = user._id;
  res.send({ userId: user._id });
});

// Ruta de logout
router.post('/logout', async (req, res) => {
  const user = await User.findById(req.session.userId);
  if (user) {
    user.sessionStart = null;
    await user.save();
  }

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
