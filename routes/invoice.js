const express = require('express');
const Invoice = require('../models/Invoice');

const router = express.Router();

router.post('/', async (req, res) => {
  const factura = new Invoice(req.body);
  await factura.save();
  res.send(factura);
});

router.get('/:userId', async (req, res) => {
  const facturas = await Invoice.find({ userId: req.params.userId });
  res.send(facturas);
});

module.exports = router;
