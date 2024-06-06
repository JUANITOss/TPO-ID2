const express = require('express');
const Order = require('../models/Order');
const Invoice = require('../models/Invoice');
const router = express.Router();

// Crear pedido
router.post('/', async (req, res) => {
  const pedido = new Order(req.body);
  await pedido.save();
  res.send(pedido);
});

// Obtener pedidos por usuario
router.get('/:userId', async (req, res) => {
  const pedidos = await Order.find({ userId: req.params.userId });
  res.send(pedidos);
});

// Facturar pedido
router.post('/:orderId/factura', async (req, res) => {
  const pedido = await Order.findOne({ orderId: req.params.orderId });

  if (pedido) {
    pedido.estado = 'facturado';
    await pedido.save();

    const total = pedido.productos.reduce((acc, producto) => {
      return acc + (producto.precioUnitario * producto.cantidad) - producto.descuento + producto.impuesto;
    }, 0);

    const factura = new Invoice({
      invoiceId: `invoice-${Date.now()}`,
      orderId: pedido.orderId,
      userId: pedido.userId,
      productos: pedido.productos,
      total
    });

    await factura.save();
    res.send(factura);
  } else {
    res.status(404).send({ message: 'Pedido no encontrado' });
  }
});

module.exports = router;

