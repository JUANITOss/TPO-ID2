// FALTA

// pedido que se convierte a factura
// pedido tiene:
    // contenido en productos
    // datos de cliente (nombre, apellido, direccion, condicion de IVA) -> SE ESPECIFICAN AL GENERAR EL PEDIDO DESDE EL FRONT
    // importe de articulos, descuentos e impuestos segun condicion de IVA

// funcion finalizarPedido => Convertir pedido a factura (bill)

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Ruta para obtener todos los pedidos
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Ruta para obtener un pedido por su ID
  router.get('/:orderId', async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: 'Pedido no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
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
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Ruta para actualizar un pedido existente
  router.put('/:orderId', async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (order) {
        order.userId = req.body.userId;
        order.productos = req.body.productos;
        order.fechaPedido = req.body.fechaPedido;
        order.estado = req.body.estado;
  
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Pedido no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // Ruta para eliminar un pedido existente
  router.delete('/:orderId', async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (order) {
        await order.remove();
        res.json({ message: 'Pedido eliminado' });
      } else {
        res.status(404).json({ message: 'Pedido no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });











module.exports = router;