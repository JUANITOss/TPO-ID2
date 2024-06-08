const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  req.redisClient.hGet('users', username, async (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging in' });
    }

    if (!hashedPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(400).json({ error: 'Invalid username or password' });
    }
  });
});

module.exports = router;
