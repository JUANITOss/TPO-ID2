const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: String,
  nombreProducto: String,
  descripcion: String,
  precio: Number,
  historialPrecios: [
    {
      fechaCambio: String,
      precioAnterior: Number,
      precioNuevo: Number,
      operador: String
    }
  ]
});

module.exports = mongoose.model('Product', ProductSchema);
