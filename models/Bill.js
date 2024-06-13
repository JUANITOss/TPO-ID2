const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  orderId: String,
  userId: String,
  productos: [
    {
      productoId: String,
      nombreProducto: String,
      precioFinal: Number,
    }
  ],
  total: Number,
  fechaFactura: String,
  pagos: [
    {
      pagoId: String,
      fechaPago: String,
      monto: Number,
      metodoPago: String
    }
  ]
});

module.exports = mongoose.model('Bill', BillSchema);