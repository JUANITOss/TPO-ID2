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
      const user = req.session.userId;
      const carrito = await Cart.findOne({ userId: user });
  
      if (!carrito) {
        return res.status(404).send({ message: 'Carrito no encontrado' });
      }
  
      if (carrito.productos.length === 0) {
        return res.status(400).send({ message: 'El carrito está vacío' });
      }
  
      // Calcula los totales y ajusta los campos necesarios
      const productosPedido = carrito.productos.map(producto => ({
        nombreProducto: producto.nombreProducto,
        total: producto.cantidad * producto.precioUnitario,
        descuento: 0, // Puedes ajustar esto según tu lógica de descuentos
        impuesto: producto.cantidad * producto.precioUnitario * 0.21, // Ejemplo de impuesto (IVA)
      }));
      
      // Crea un nuevo pedido usando el esquema OrderSchema
      const nuevoPedido = new Order({
        userId: user,
        nombreResponsable: req.body.nombreResponsable,
        apellidoResponsable: req.body.apellidoResponsable,
        recargo: 21, // Seteado a 21 como IVA por defecto
        productos: productosPedido,
        fechaPedido: new Date().toISOString(),
        estado: 'pendiente', // Estado inicial del pedido
      });
  
      // Guarda el nuevo pedido en la base de datos
      const pedidoGuardado = await nuevoPedido.save();
  
      // Vaciar el carrito después de convertirlo a pedido
      carrito.productos = [];
      await carrito.save();
  
      res.status(201).send({ message: 'Carrito convertido a pedido con éxito', pedido: pedidoGuardado });
    } catch (error) {
      console.error('Error al convertir el carrito a pedido:', error);
      res.status(500).send({ message: 'Error al convertir el carrito a pedido', error });
    }
  });



module.exports = router;