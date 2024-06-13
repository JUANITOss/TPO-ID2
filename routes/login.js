const express = require('express');
const bcrypt = require('bcryptjs');
const Cart = require('../models/Cart');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const storedUser = await req.redisClient.HGET('users', username);
    if (!storedUser) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const user = JSON.parse(storedUser);

    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Acceder a la sesión desde otras rutas
      req.session.userId = username;

      // Verificar existencia de carrito activo
      const existingCart = await Cart.findOne({ userId: username, estado: 'activo' });

      if (existingCart) {
        return res.status(200).json({ message: 'Login successful', carrito: existingCart });
      }

      // Si el usuario no tiene un carrito activo, crear uno nuevo
      const newCart = new Cart({
        userId: username,
        productos: [],
        estado: 'activo'
      });

      const nuevoCarrito = await newCart.save();

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(400).json({ error: 'Invalid username or password' });
    }
  } catch(err) {
    console.error('Error logging in:', err);
    return res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
