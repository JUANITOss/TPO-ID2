const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
  const pedido = new Order(req.body);
  await pedido.save();
  res.send(pedido);
});

router.get('/:userId', async (req, res) => {
  const pedidos = await Order.find({ userId: req.params.userId });
  res.send(pedidos);
});

module.exports = router;
