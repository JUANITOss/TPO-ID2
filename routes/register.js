const express = require('express');
const bcrypt = require('bcryptjs'); // Importar bcryptjs para hashing de contraseñas
const router = express.Router();

router.post('/', async (req, res) => {
  // Obtener los datos desde el POST
  const { username, password, dni, direccion } = req.body;

  // Verificar que este completo
  if (!username || !password || !dni || !direccion) {
    return res.status(400).json({ error: 'data is missing' });
  }

  // Verificar si el username ya existe en Redis
  try {
    const userExists = await req.redisClient.HGET('users', username);
    if (userExists) {
      return res.status(409).json({ error: 'Username already exists' });
    }
  } catch(err) {
    console.error('Error checking username in Redis:', err);
    return res.status(500).json({ error: 'Error checking username availability' });
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(String(password), 10); // Salt rounds: 10

  // Crear objeto a subir como HMap
  const userData = {
    'username': String(username),
    'password': hashedPassword, // Almacenar el hash en lugar de la contraseña en texto plano
    'dni': String(dni),
    'direccion': String(direccion)
  };

  // Almacenar los datos como un hash en Redis
  try {
    await req.redisClient.HSET('users', username, JSON.stringify(userData));
    return res.status(201).json({ message: 'User registered successfully' });  
  } catch(err) {
    console.error('Error registering user in Redis:', err);
    return res.status(500).json({ error: 'Error registering user' });
  }
});

module.exports = router;
