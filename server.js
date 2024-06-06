const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const invoiceRoutes = require('./routes/invoice');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend conectado correctamente' });
});

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tienda');
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1); // Salir del proceso con error
  }
};

connectDB();

app.use('/usuarios', userRoutes);
app.use('/carritos', cartRoutes);
app.use('/pedidos', orderRoutes);
app.use('/productos', productRoutes);
app.use('/facturas', invoiceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
