// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

//Initialization de app
const app = express();

// URLS
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const invoiceRoutes = require('./routes/invoice');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tienda');
    console.log('Conectado a MongoDB');

  } catch (error) {
    console.error('Error conectando a MongoDB: ', error);
    process.exit(1);
  }
};
connectDB();

// Conectar a Redis
const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Conectado a Redis');
});

client.connect().catch(console.error);

// Middleware interaccion
// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3000',
  //methods: ['GET', 'POST'],
  //allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(express.json());

// Middleware de los clientes
app.use((req, res, next) => {
  req.redisClient = client;
  next();
});
app.use((req, res, next) => {
  req.db = mongoose.connection;
  next();
});

 // Rutas
app.use('/carritos', cartRoutes);
app.use('/pedidos', orderRoutes);
app.use('/facturas', invoiceRoutes);
app.use('/productos', productRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend conectado correctamente' });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
