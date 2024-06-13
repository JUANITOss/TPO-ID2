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
  
module.exports = router;