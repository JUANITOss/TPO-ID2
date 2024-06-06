const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceId: String,
  orderId: String,
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

module.exports = mongoose.model('Invoice', InvoiceSchema);
