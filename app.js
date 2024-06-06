const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Conexiones
const app = express();
const redisClient = redis.createClient();
mongoose.connect('mongodb://localhost/tienda');

// Habilitar CORS
app.use(cors());

// Test 
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend conectado correctamente' });
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const invoiceRoutes = require('./routes/invoice');
const productRoutes = require('./routes/product');

app.use('/usuarios', userRoutes);
app.use('/carritos', cartRoutes);
app.use('/pedidos', orderRoutes);
app.use('/facturas', invoiceRoutes);
app.use('/productos', productRoutes);

module.exports = app;
