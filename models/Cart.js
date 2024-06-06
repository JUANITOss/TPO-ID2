const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  cartId: String,
  userId: String,
  productos: [
    {
      productoId: String,
      nombreProducto: String,
      cantidad: Number,
      precioUnitario: Number
    }
  ],
  estado: String
});

module.exports = mongoose.model('Cart', CartSchema);
