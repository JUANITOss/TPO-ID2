// FALTA

// factura tiene:
    // username que la creo
    // nombre y apellido del responsable del pedido
    // Medio de pago (Mercado Pago, Tarjeta)
    // Operador humano interviniente (puede o no haber)
    // fecha
    // hora
    // monto TOTAL (sumatoria de valores de productos presentes en order, sus descuentos e impuestos ya aplicados desde order)

// funcion CREAR FACTURA => Obtiene datos de order y da los datos nuevos necesarios 
//(medioPago, oerador, fecha y hora)

// funcion VER FACTURAS => Se deben visualizar todas las facturas existentes en la DB 
//O verse las del usuario que las solicitó

const express = require('express');
const Bill = require('../models/Bill');
const router = express.Router();


// Crear factura
router.post('/', async (req, res) => {
  try {

    const { orderId, userId, productos, total, pagos } = req.body;

    const factura = new Bill({
      BillId: new mongoose.Types.ObjectId().toString(),
      orderId: orderId,
      userId: userId,
      productos: productos,
      total: total,
      fechaFactura: new Date().toISOString(), // Fecha actual
      pagos: pagos || []
    });

    // Guardar la factura en la base de datos
    await factura.save();

    res.send(factura);
  } 
    catch (error) {
    res.status(500).send({ error: 'error del server' });
  }
});

// Ver facturas
router.get('/', async (req, res) => {
    const factura = await Bill.find();
    res.send(factura);
});





