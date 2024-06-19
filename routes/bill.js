const Bill = require('../models/Bill');
const Order = require('../models/Order');
const express = require('express');
// const ObjectId = require('mongodb').ObjectId; 
const router = express.Router();

// Ruta para crear una nueva factura (POST /createBill)
router.post('/createBill', async (req, res) => {
  const { orderId, method } = req.body;

  // const o_id = new ObjectId(orderId);

  const OrdenSeleccionada = Order.findOne({ _id: orderId}); 

  // Calcular el total del pedido y construir la estructura de productos
  const productos = OrdenSeleccionada.productos.map(producto => {
    const total = producto.cantidad * producto.precio;
    const impuesto = total * 0.21; // Calculando el impuesto (IVA)

    return {
      productoId: producto._id,
      nombreProducto: producto.nombreProducto,
      total: total,
      cantidad: producto.cantidad,
      descuento: 0,
      impuesto: impuesto,
    };
  });

  // Crear la nueva orden
  const nuevaBill = new Bill({
    userId: ordenGuardada.userId,
    responsable: `${ordenGuardada.nombreResponsable} ${ordenGuardada.apellidoResponsable}`,
    dniResponsable: ordenGuardada.dniResponsable,
    productos: productos,
    fechaPedido: new Date().toISOString(), // Fecha actual del pedido
    estado: 'en proceso' // Estado por defecto
  });

  // Guardar la orden en la base de datos
  const ordenGuardada = await nuevaOrden.save();

  // Ejemplo de respuesta
  res.json({ success: true, message: `Factura creada para orderId: ${orderId} con método de pago: ${method}` });
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
    await Bill.findOneAndDelete({ orderId: delId });

    // Responder con un mensaje de éxito
    res.send({ message: 'Deleted Bill' });
  } catch (err) {
    // Manejar errores y responder con un código de estado 500 si ocurre un problema
    res.status(500).send({ message: err.message });
  }
});


module.exports = router;
