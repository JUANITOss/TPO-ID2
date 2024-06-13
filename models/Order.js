const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: String,
  nombreResponsable: String,
  apellidoResponsable: String,
  recargo: 21, // IVA
  productos: [
    {
      nombreProducto: String,
      total: Number, // cantidad * precioUnitario
      descuento: Number, // Setteado a mano para los propositos de la entrega
      impuesto: Number, // Setteado a mano para los propositos de la entrega, agregar el recargo
    }
  ],
  fechaPedido: String,
  estado: String
});

module.exports = mongoose.model('Order', OrderSchema);
