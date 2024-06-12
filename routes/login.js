const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const storedUser = await req.redisClient.HGET('users', username);
    const user = JSON.parse(storedUser);
    if (password === user.password) {
      // Acceder a la sesion desde las otras rutas
      req.session.userId = username; 
      
      // Verificar existencia
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

      // Subir los datos
      const nuevoCarrito = await newCart.save();

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(400).json({ error: 'Invalid username or password' });
    } 
  } catch(err) {
      return res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;
