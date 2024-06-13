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

    let user = JSON.parse(storedUser);

    // Comparar la contraseña hasheada almacenada con la contraseña proporcionada
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Actualizar la fecha de ingreso en el objeto del usuario
      const currentDate = new Date().toISOString();
      user.loginTime = currentDate;

      // Guardar el usuario actualizado en Redis
      await req.redisClient.HSET('users', username, JSON.stringify(user));

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

router.post('/logout', async (req, res) => {
  try {
    const username = req.session.userId;

    if (!username) {
      return res.status(400).json({ error: 'User is not logged in' });
    }

    // Obtener el usuario desde Redis
    const storedUser = await req.redisClient.HGET('users', username);

    if (!storedUser) {
      return res.status(400).json({ error: 'User not found' });
    }

    let user = JSON.parse(storedUser);

    // Agregar la fecha de cierre de sesión al usuario
    const logoutTime = new Date().toISOString();
    user.logoutTime = logoutTime;

    // Actualizar el usuario en Redis con la fecha de cierre de sesión
    await req.redisClient.HSET('users', username, JSON.stringify(user));

    // Limpiar la sesión en Express
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Failed to logout' });
      }
      return res.status(200).json({ message: 'Logout successful' });
    });
  } catch (err) {
    console.error('Error logging out:', err);
    return res.status(500).json({ error: 'Error logging out' });
  }
});

module.exports = router;
