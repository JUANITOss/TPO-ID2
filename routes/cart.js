const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Crear carrito
router.post('/', async (req, res) => {
  const carrito = new Cart(req.body);
  await carrito.save();
  res.send(carrito);
});

// Obtener carritos por usuario
router.get('/:userId', async (req, res) => {
  const carritos = await Cart.find({ userId: req.params.userId, estado: 'activo' });
  res.send(carritos);
});

// Agregar producto al carrito
router.post('/:cartId/productos', async (req, res) => {
  const { productoId, nombreProducto, cantidad, precioUnitario } = req.body;
  const carrito = await Cart.findOne({ cartId: req.params.cartId });

  if (carrito) {
    const productoExistente = carrito.productos.find(p => p.productoId === productoId);
    
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      carrito.productos.push({ productoId, nombreProducto, cantidad, precioUnitario });
    }
    
    carrito.historial.push({ accion: 'agregar', fecha: new Date() });
    await carrito.save();
    res.send(carrito);
  } else {
    res.status(404).send({ message: 'Carrito no encontrado' });
  }
});

// Eliminar producto del carrito
router.delete('/:cartId/productos/:productoId', async (req, res) => {
  const carrito = await Cart.findOne({ cartId: req.params.cartId });

  if (carrito) {
    carrito.productos = carrito.productos.filter(p => p.productoId !== req.params.productoId);
    carrito.historial.push({ accion: 'eliminar', fecha: new Date() });
    await carrito.save();
    res.send(carrito);
  } else {
    res.status(404).send({ message: 'Carrito no encontrado' });
  }
});

// Actualizar cantidad de producto en el carrito
router.put('/:cartId/productos/:productoId', async (req, res) => {
  const { cantidad } = req.body;
  const carrito = await Cart.findOne({ cartId: req.params.cartId });

  if (carrito) {
    const producto = carrito.productos.find(p => p.productoId === req.params.productoId);

    if (producto) {
      producto.cantidad = cantidad;
      carrito.historial.push({ accion: 'actualizar', fecha: new Date() });
      await carrito.save();
      res.send(carrito);
    } else {
      res.status(404).send({ message: 'Producto no encontrado en el carrito' });
    }
  } else {
    res.status(404).send({ message: 'Carrito no encontrado' });
  }
});

// Convertir carrito en pedido
router.post('/:cartId/pedido', async (req, res) => {
  const carrito = await Cart.findOne({ cartId: req.params.cartId });

  if (carrito) {
    carrito.estado = 'convertido';
    carrito.historial.push({ accion: 'convertir', fecha: new Date() });
    await carrito.save();

    const pedido = new Order({
      orderId: `order-${Date.now()}`,
      userId: carrito.userId,
      productos: carrito.productos,
      estado: 'pendiente'
    });

    await pedido.save();
    res.send(pedido);
  } else {
    res.status(404).send({ message: 'Carrito no encontrado' });
  }
});

module.exports = router;

