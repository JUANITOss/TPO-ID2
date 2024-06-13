const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: String, // rec sessions
  nombreResponsable: String, // lo da el usuario (input)
  apellidoResponsable: String, // lo da el usuario (input)
  dniResponsable: String,
  recargo: Number, // IVA -- SET TO 21
  productos: [
    {
      nombreProducto: String,
      total: Number, // cantidad * precioUnitario
      descuento: Number, // Setteado a mano para los propositos de la entrega
      impuesto: Number, // Setteado a mano para los propositos de la entrega, agregar el recargo
    }
  ],
  fechaPedido: String, // date
  estado: String // en proceso (default)
});

module.exports = mongoose.model('Order', OrderSchema);
