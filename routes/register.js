const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  // Obtener los datos desde el POST
  const { username, password, dni, direccion } = req.body;

  // Verificar que este completo
  if (!username || !password || !dni || !direccion) {
    return res.status(400).json({ error: 'data is missing' });
  }

  // Convertir a string (Si no se hace, dni causa problemas)
  const userData = {
    username: String(username),
    password: String(password),
    dni: String(dni),
    direccion: String(direccion)
  };

  // Almacenar los datos como un hash en Redis
  req.redisClient.hmset('users', username, userData, (err, reply) => {
    if (err) {
      return res.status(500).json({ error: 'Error registering user' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
});


module.exports = router;