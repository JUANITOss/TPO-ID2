const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nombreProducto: String,
  descripcion: String,
  cantidad: Number,
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
