const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Registrar usuario
router.post('/', async (req, res) => {
  const usuario = new User(req.body);
  await usuario.save();
  res.send(usuario);
});

// Obtener usuarios
router.get('/', async (res) => {
  const usuarios = await User.find();
  res.send(usuarios);
});

// Actualizar tiempo de conexión
router.post('/:userId/tiempo', async (req, res) => {
  const { minutos } = req.body;
  const usuario = await User.findOne({ userId: req.params.userId });

  if (usuario) {
    const fecha = new Date().toISOString().split('T')[0];
    let registro = usuario.tiempoConectado.find(t => t.fecha === fecha);

    if (registro) {
      registro.minutos += minutos;
    } else {
      usuario.tiempoConectado.push({ fecha, minutos });
    }

    const totalMinutos = usuario.tiempoConectado.reduce((acc, t) => acc + t.minutos, 0);

    if (totalMinutos > 240) {
      usuario.categoria = 'TOP';
    } else if (totalMinutos > 120) {
      usuario.categoria = 'MEDIUM';
    } else {
      usuario.categoria = 'LOW';
    }

    await usuario.save();
    res.send(usuario);
  } else {
    res.status(404).send({ message: 'Usuario no encontrado' });
  }
});

module.exports = router;
