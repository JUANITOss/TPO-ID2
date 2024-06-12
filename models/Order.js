const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: String,
  productos: [
    {
      productoId: String,
      nombreProducto: String,
      cantidad: Number,
      precioUnitario: Number,
      descuento: Number,
      impuesto: Number
    }
  ],
  fechaPedido: String,
  estado: String
});

module.exports = mongoose.model('Order', OrderSchema);
