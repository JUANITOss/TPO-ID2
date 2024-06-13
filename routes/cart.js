const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();
const Order = require('../models/Order');

// FALTA
// MODIFICAR CARRITO
// VACIAR CARRITO
// CONVERTIR CARRITO A PEDIDO

// MODIFICAR CARRITO
router.put('/modifiyCart', async (req, res) => {
  try {
    const user = req.session.userId;
    const { productos } = req.body;

    console.log('Usuario:', user);  // Verifica el usuario
    console.log('Productos recibidos:', productos);  // Verifica los productos recibidos

    const carrito = await Cart.findOne({ userId: user });

    if (carrito) {
      productos.forEach(({ _id, cantidad }) => {
        const productoEnCarrito = carrito.productos.find(producto => producto._id.toString() === _id);
        if (productoEnCarrito) {
          productoEnCarrito.cantidad = cantidad;
        }
      });

      await carrito.save();
      console.log('Carrito modificado:', carrito);  // Verifica el carrito modificado

      res.send({ message: 'Carrito modificado con éxito', carrito });
    } else {
      res.status(404).send({ message: 'El carrito no existe' });
    }
  } catch (error) {
    console.error('Error al modificar el carrito:', error);
    res.status(500).send({ message: 'Algo salió mal al modificar el carrito', error });
  }
});  

  
// VACIAR CARRITO
router.delete('/vaciarCart', async (req, res) => {
    try {
      const cartId = req.params.cartId;

      const result = await Cart.updateOne({ cartId }, { $set: { productos: [] } });

      if (result.nModified === 0) {
        return res.status(404).send({ message: 'Carrito no encontrado o ya está vacío' });
      }

      res.send({ message: 'Carrito vaciado con éxito' });
    } catch (error) {
      res.status(500).send({ message: 'Error al vaciar el carrito', error });
    }
  });

// OBTENER CARRITO DE LA SESION
router.get('/getCart', async (req, res) => {
    try {
        const user = req.session.userId; 
        const cart = await Cart.findOne({ userId: user });
        if (!cart) {
            return res.status(404).send({ message: 'No se encontró el carrito para este usuario' });
        }
        res.send(cart);
      } catch (error) {
        res.status(500).send({ message: 'Error al obtener el carrito del usuario', error });
    }
});

//CONVERTIR CARRITO A PEDIDO
router.post('/api/cartToOrder', async (req, res) => {
  try {
    const cart = await Cart.findOne({ estado: 'active' }); // Obtener el carrito activo
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productos = cart.productos.map(producto => ({
      nombreProducto: producto.nombreProducto,
      total: producto.cantidad * producto.precioUnitario,
      descuento: 0, // Setteado a mano
      impuesto: producto.cantidad * producto.precioUnitario * 0.21 // Setteado a mano, 21% de IVA
    }));

    const order = new Order({
      userId: cart.userId,
      nombreResponsable: req.body.nombreResponsable, // Input del usuario
      apellidoResponsable: req.body.apellidoResponsable, // Input del usuario
      recargo: 21, // IVA
      productos: productos,
      fechaPedido: new Date().toISOString(),
      estado: 'en proceso'
    });

    await order.save();
    await Cart.deleteOne({ _id: cart._id }); // Elimina el carrito si ya no es necesario

    res.json({ order });
  } catch (error) {
    console.error('Error al convertir el carrito en orden:', error);
    res.status(500).json({ error: 'Error al convertir el carrito en orden' });
  }
});

module.exports = router; 