const express = require('express');
const Cart = require('../models/Cart');

const router = express.Router();

router.post('/', async (req, res) => {
  const carrito = new Cart(req.body);
  await carrito.save();
  res.send(carrito);
});

router.get('/:userId', async (req, res) => {
  const carritos = await Cart.find({ userId: req.params.userId });
  res.send(carritos);
});

module.exports = router;
