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
        res.send(updatedOrder);
      } else {
        res.status(404).send({ message: 'Pedido no encontrado' });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });
  
  // Ruta para eliminar un pedido existente
  router.delete('/:orderId', async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (order) {
        await order.remove();
        res.send({ message: 'Pedido eliminado' });
      } else {
        res.status(404).send({ message: 'Pedido no encontrado' });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // CONVERTIR CARRITO A PEDIDO
  router.post('/cartToOrder', async (req, res) => {
    try {
      const userId = req.session.userId; // Obtener el ID de usuario desde la sesión (si lo usas)
      
      // Buscar el carrito asociado al usuario
      const cart = await Cart.findOne({ userId });
  
      // Verificar si el carrito existe y tiene productos
      if (!cart || cart.products.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío o no existe' });
      }
  
      // Crear un array de productos para la orden de compra
      const orderProducts = cart.products.map(product => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      }));
  
      // Crear un nuevo objeto de orden de compra
      const newOrder = new Order({
        userId: userId, // Asignar el usuario al pedido (si es necesario)
        products: orderProducts,
        orderDate: new Date(),
        status: 'pending', // Estado inicial del pedido
      });
  
      // Guardar la orden de compra en la base de datos
      const savedOrder = await newOrder.save();
  
      // Limpiar el carrito después de convertirlo en orden de compra
      cart.products = [];
      await cart.save();
  
      // Enviar una respuesta exitosa al cliente
      res.status(201).json({ message: 'Carrito convertido en orden de compra con éxito', order: savedOrder });
    } catch (error) {
      // Manejar errores y enviar una respuesta de error al cliente
      console.error('Error al convertir el carrito en orden de compra:', error);
      res.status(500).json({ message: 'Error interno del servidor al convertir el carrito en orden de compra', error });
    }
  });
  
  
module.exports = router;