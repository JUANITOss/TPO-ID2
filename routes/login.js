const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

function generateRandomCartId() {
  const cartId = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  return cartId.toString(); 
}

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  req.redisClient.HGET('users', username, async (err, storedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging in' });
    }

    if (!storedPassword || password !== storedPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Verificar si el usuario ya tiene un carrito activo
    try {
      const existingCart = await Cart.findOne({ userId: username, estado: 'activo' });

      if (existingCart) {
        return res.status(200).json({ message: 'Login successful', carrito: existingCart });
      }

      const randomCartId = generateRandomCartId();

      // Si el usuario no tiene un carrito activo, crear uno nuevo
      const newCart = new Cart({
        cartId: randomCartId,
        userId: username,
        productos: [],
        estado: 'activo'
      });

      const nuevoCarrito = await newCart.save();
      res.status(200).json({ message: 'Login successful', carrito: nuevoCarrito });
    } catch (error) {
      res.status(500).json({ error: 'Error creating or retrieving cart' });
    }
  });
});

module.exports = router;
