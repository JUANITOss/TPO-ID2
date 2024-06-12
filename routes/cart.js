// const express = require('express');
// const Cart = require('../models/Cart');
// const router = express.Router();

// FALTA
// MODIFICAR CARRITO
// VACIAR CARRITO
// CONVERTIR CARRITO A PEDIDO 

// // MODIFICAR CARRITO
// router.put('/modificar/', async (req, res) => {
//     try {
//       const cartId = req.params.cartId;
//       const { productos } = req.body;

//       const carrito = await Cart.findOne({ cartId });

//       if (carrito) {

//         carrito.productos = productos;
//         res.send({ message: 'Carrito modificado con éxito', carrito });

//       } else {
//         res.status(404).send({ message: 'el carrito no existe' }); // re lolera esta frase re anime xd :v
//       }
//     } catch (error) {
//       res.status(500).send({ message: 'algo salio mal al modificar carrito', error });
//     }
// });

// // VACIAR CARRITO
// router.delete('/vaciar/', async (req, res) => {
//     try {
//       const cartId = req.params.cartId;

//       const result = await Cart.updateOne({ cartId }, { $set: { productos: [] } });

//       if (result.nModified === 0) {
//         return res.status(404).send({ message: 'Carrito no encontrado o ya está vacío' });
//       }

//       res.send({ message: 'Carrito vaciado con éxito' });
//     } catch (error) {
//       res.status(500).send({ message: 'Error al vaciar el carrito', error });
//     }
//   });

// // OBTENER CARRITO DE LA SESION
// router.get('/', async (req, res) => {
//     try {
//         const userId = req.session.userId; 
//         const cart = await Cart.findOne({ userId });
//         if (!cart) {
//             return res.status(404).send({ message: 'No se encontró el carrito para este usuario' });
//         }
//         res.send(cart);
//       } catch (error) {
//         res.status(500).send({ message: 'Error al obtener el carrito del usuario', error });
//     }
// });