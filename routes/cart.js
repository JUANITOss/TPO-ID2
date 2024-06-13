const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();
const Order = require('../models/Order');

<<<<<<< HEAD
=======
// FALTA
// MODIFICAR CARRITO
// VACIAR CARRITO
// CONVERTIR CARRITO A PEDIDO

>>>>>>> c0a82dd9b85e45e53b236ab09f0edc0057d19f71
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

      const nuevoPedido = new Order({
          userId: user,
          productos: carrito.productos,
          fecha: new Date(),
          estado: 'pendiente'
      });

      await nuevoPedido.save();

      // Vaciar el carrito después de convertirlo a pedido
      carrito.productos = [];
      await carrito.save();

      res.send({ message: 'Carrito convertido a pedido con éxito', pedido: nuevoPedido });
  } catch (error) {
      res.status(500).send({ message: 'Error al convertir el carrito a pedido', error });
  }
});


module.exports = router; 