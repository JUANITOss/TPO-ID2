const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  req.redisClient.HGET('users', username, async (err, storedPassword) => {
    
    // Errores generales
    if (err) {
      return res.status(500).json({ error: 'Error logging in' });
    }
    
    // Errores de escritura (no se encuentra ese dato en la DB)
    if (!storedPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Comparar contraseñas
    if (password === storedPassword) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(400).json({ error: 'Invalid username or password' });
    }
  });
});

module.exports = router;
