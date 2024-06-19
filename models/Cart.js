const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: String,
  productos: [
    {
      productoId: String,
      nombreProducto: String,
      cantidad: Number,
      precioFinal: Number,
    }
  ],
  estado: String
});

module.exports = mongoose.model('Cart', CartSchema);
