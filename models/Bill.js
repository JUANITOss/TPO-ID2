const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  orderId: String, //ID que se genera de la forma userId+date
  userId: String, // obtenido por express session
  responsable: String,
  dni: String,
  productos: [ // Listado obtenido de order
    {
      productoId: String,
      nombreProducto: String,
      precioFinal: Number,  // Se hace (desde order), la sumatoria de total - descuento + impuesto + recargo (21% de iva)
      cantidad: Number,
    }
  ],
  total: Number, // Sumatoria de todos los preciosFInales de todos los productos
  fechaFactura: String, //Date de creacion
  pagos: [ // Se manejan los pagos que hace el usuario (crear url en routes/bill para ir a pagos)
    {
      pagoId: String, // orderId+date
      fechaPago: String, //date de aceptar pago
      monto: Number, // Pago que debe realizar el usuario (total)
      metodoPago: String // Es el method
    }
  ]
});

module.exports = mongoose.model('Bill', BillSchema);