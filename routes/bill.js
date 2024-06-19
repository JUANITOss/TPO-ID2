const Bill = require('../models/Bill');
const Order = require('../models/Order');
const express = require('express');
const router = express.Router();

// Ruta para crear una nueva factura (POST /createBill)
router.post('/createBill', async (req, res) => {
  try {
    const { orderId, method } = req.body;

    // Buscar la orden seleccionada
    const ordenSeleccionada = await Order.find({ _id: orderId }); 
    console.log('ESTA ES LA ORDEN');
    console.log(ordenSeleccionada);

    if (!ordenSeleccionada) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Inicialización del total
    let total = 0;

    // Calcular el total del pedido y construir la estructura de productos
    const productos = ordenSeleccionada.productos.map(producto => {
      const precioFinal = producto.total - producto.descuento + producto.impuesto;

      // Sumar el precio final al total
      total += precioFinal;

      return {
        productoId: producto._id,
        nombreProducto: producto.nombreProducto,
        precioFinal: precioFinal,
        cantidad: producto.cantidad,
      };
    });

    // Crear la nueva factura
    const NewBill = new Bill({
      orderId: orderId,
      userId: ordenSeleccionada.userId,
      responsable: `${ordenSeleccionada.nombreResponsable} ${ordenSeleccionada.apellidoResponsable}`,
      dni: ordenSeleccionada.dniResponsable,
      productos: productos,
      total: total,
      fechaFactura: new Date().toISOString(), // Fecha de creación en formato ISO
      pagos: [{
        pagoId: `${ordenSeleccionada._id}_${Date.now()}`,
        fechaPago: new Date().toISOString(), // Fecha de pago en formato ISO
        monto: total,
        metodoPago: method
      }],
    });
    
    // Guardar la factura en la base de datos
    const billGuardada = await NewBill.save();

    // Actualizar el estado de la orden
    await Order.updateOne({ _id: ordenSeleccionada._id }, { $set: { estado: 'pagado' } });

    // Enviar la respuesta de éxito al cliente
    res.status(201).json(billGuardada);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware para obtener una factura por ID y verificar que pertenece al usuario en sesión activa
async function getBill(req, res, next) {
  let bill;
  try {
    const userId = req.session.userId; // Obtener el userId de la sesión activa
    bill = await Bill.findOne({ _id: req.params.id, userId: userId });
    if (!bill) {
      return res.status(404).send({ message: 'Cannot find bill for this user with the provided ID' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
  res.bill = bill;
  next();
}

// Ruta para obtener una factura por ID (GET /getBillsId)
router.get('/getBillsId', getBill, (req, res) => {
  res.send(res.bill);
});

// Ruta para actualizar una factura (PUT /updateBillId)
router.put('/updateBillId/:billId', getBill, async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.billId);

    if (!bill) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }

    if (req.body.orderId !== undefined) {
      bill.orderId = req.body.orderId;
    }
    if (req.body.userId !== undefined) {
      bill.userId = req.body.userId;
    }
    if (req.body.productos !== undefined) {
      bill.productos = req.body.productos;
    }
    if (req.body.total !== undefined) {
      bill.total = req.body.total;
    }
    if (req.body.fechaFactura !== undefined) {
      bill.fechaFactura = req.body.fechaFactura;
    }
    if (req.body.pagos !== undefined) {
      bill.pagos = req.body.pagos;
    }

    const updatedBill = await bill.save();
    res.json(updatedBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para obtener todas las facturas (GET /bills)
router.get('/getBills', async (req, res) => {
  try {
      const bills = await Bill.find();
      res.send(bills);
  } catch (err) {
      res.status(500).send({ message: err.message });
  }
});

// Ruta para eliminar una factura (DELETE /deleteBillId/:billId)
router.delete('/deleteBillId/:orderId', async (req, res) => {
  try {
    const delId = req.params.orderId; // Obtener el billId de los parámetros de la URL

    // Buscar la factura y borrarla
    await Bill.deleteOne({ orderId: delId });

    // Responder con un mensaje de éxito
    res.send({ message: 'Deleted Bill' });
  } catch (err) {
    // Manejar errores y responder con un código de estado 500 si ocurre un problema
    res.status(500).send({ message: err.message });
  }
});


module.exports = router;
