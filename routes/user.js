const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  const usuario = new User(req.body);
  await usuario.save();
  res.send(usuario);
});

router.get('/', async (req, res) => {
  const usuarios = await User.find();
  res.send(usuarios);
});

module.exports = router;
