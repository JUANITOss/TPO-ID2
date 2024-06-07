// IMPORTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require("express-session");

// URLS
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const invoiceRoutes = require('./routes/invoice');

const app = express();

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

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "PWD",
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false,}, // CAMBIARLO A TRUE SI USAMOS HTTPS
 })
 );

 // Rutas
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
