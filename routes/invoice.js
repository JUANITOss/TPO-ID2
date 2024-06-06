const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Invoice = require('../models/Invoice');

// Obtener todas las facturas
router.get('/', async (req, res) => {
  try {
    const facturas = await Invoice.find();
    res.status(200).json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una factura para un pedido
router.post('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { formaPago, operador } = req.body;

  try {
    const pedido = await Order.findById(orderId);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    const nuevaFactura = new Invoice({
      orderId: pedido.orderId,
      userId: pedido.userId,
      items: pedido.items,
      total: pedido.items.reduce((total, item) => total + item.cantidad * item.precio, 0),
      formaPago,
      operador,
      fecha: new Date(),
    });

    await nuevaFactura.save();
    pedido.estado = 'facturado';
    await pedido.save();

    res.status(201).json(nuevaFactura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar un pago
router.post('/pagar/:invoiceId', async (req, res) => {
  const { invoiceId } = req.params;
  const { monto, medioPago, operador } = req.body;

  try {
    const factura = await Invoice.findById(invoiceId);
    if (!factura) {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }

    factura.pagos.push({ monto, medioPago, operador, fecha: new Date() });
    factura.estado = 'pagado';
    await factura.save();

    res.status(200).json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
