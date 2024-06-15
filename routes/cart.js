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
          if (cantidad === 0) {
            // Eliminar el producto del carrito si la cantidad es 0
            carrito.productos = carrito.productos.filter(producto => producto._id.toString() !== _id);
          } else {
            // Actualizar la cantidad del producto en el carrito
            productoEnCarrito.cantidad = cantidad;
          }
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
    const userId = req.session.userId; 
    if (!userId) {
      return res.status(400).send({ message: 'No se proporcionó el ID de usuario' });
    }

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).send({ message: 'No se encontró el carrito para este usuario' });
    }
    
    console.log('Cart found:', cart);

    res.send(cart);

  } catch (error) {
    console.error('Error al obtener el carrito del usuario:', error);
    res.status(500).send({ message: 'Error al obtener el carrito del usuario', error });
  }
});

router.post('/cartToOrder', async (req, res) => {
  const { cart, current } = req.body;

  console.log('Datos recibidos en /cart/cartToOrder:', { cart, current });

  try {
    // Calcular el total del pedido y construir la estructura de productos
    const productos = cart.productos.map(producto => {
      const total = producto.cantidad * producto.precio;
      const impuesto = total * 0.21; // Calculando el impuesto (IVA)

      return {
        nombreProducto: producto.nombreProducto,
        total: total,
        descuento: 0,
        impuesto: impuesto
      };
    });

    // Crear la nueva orden
    const nuevaOrden = new Order({
      userId: cart.userId,
      nombreResponsable: current.nombreResponsable,
      apellidoResponsable: current.apellidoResponsable,
      dniResponsable: current.dniResponsable,
      recargo: 21, // Suponiendo que siempre es 21% de recargo por IVA
      productos: productos,
      fechaPedido: new Date().toISOString(), // Fecha actual del pedido
      estado: 'en proceso' // Estado por defecto
    });

    // Guardar la orden en la base de datos
    const ordenGuardada = await nuevaOrden.save();

    res.status(201).json({ order: ordenGuardada });
  } catch (error) {
    console.error('Error al convertir el carrito en orden:', error);
    res.status(500).json({ error: 'Error al convertir el carrito en orden' });
  }
});
module.exports = router; 