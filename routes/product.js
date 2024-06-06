const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/', async (req, res) => {
  const producto = new Product(req.body);
  await producto.save();
  res.send(producto);
});

router.get('/', async (req, res) => {
  const productos = await Product.find();
  res.send(productos);
});

module.exports = router;
