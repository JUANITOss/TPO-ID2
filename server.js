const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const invoiceRoutes = require('./routes/invoice');

const app = express();

// Conectar a Redis
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  console.error('Error conectando a Redis:', err);
});
redisClient.on('connect', () => {
  console.log('Conectado a Redis');
});

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tienda');
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1); // Salir del proceso con error
  }
};
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Cambiar a true si usas HTTPS
}));

// Rutas
app.use('/usuarios', userRoutes);
app.use('/carritos', cartRoutes);
app.use('/pedidos', orderRoutes);
app.use('/facturas', invoiceRoutes);
app.use('/productos', productRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend conectado correctamente' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
