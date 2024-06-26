const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Ruta para obtener todos los pedidos
router.get('/getOrders', async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      return res.status(404).send({ message: 'No se encontraron órdenes' });
    }
    res.send(orders);
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).send({ message: 'Error al obtener las órdenes', error });
  }
});

// Ruta para crear un nuevo pedido
router.post('/', async (req, res) => {
  const order = new Order({
    userId: req.body.userId,
    productos: req.body.productos,
    fechaPedido: req.body.fechaPedido,
    estado: req.body.estado
  });

  try {
    const newOrder = await order.save();
    res.status(201).send(newOrder);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
  
// Ruta para eliminar un pedido por ID
router.delete('/deleteOrder/:_id', async (req, res) => {
  try {
    const order = await Order.deleteOne({ _id: req.params._id });
    if (!order) {
      return res.status(404).send({ message: 'Orden no encontrada' });
    }
    res.send({ message: 'Orden eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    res.status(500).send({ message: 'Error al eliminar la orden', error });
}});

module.exports = router;