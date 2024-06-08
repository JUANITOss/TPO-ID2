const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  req.redisClient.hSet('users', username, hashedPassword, (err, reply) => {
    if (err) {
      return res.status(500).json({ error: 'Error registering user' });
    }

    res.status(201).json({ message: 'User registered successfully' });
  });
});

module.exports = router;