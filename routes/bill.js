const Bill = require('../models/Bill');
const express = require('express');
const router = express.Router();

// Ruta para crear una nueva factura (POST /createBill)
router.post('/createBill', async (req, res) => {
    const bill = new Bill({
        orderId: req.body.orderId,
        userId: req.body.userId,
        productos: req.body.productos,
        total: req.body.total,
        fechaFactura: req.body.fechaFactura,
        pagos: req.body.pagos
    });
  
    try {
        const newBill = await bill.save();
        res.status(201).send(newBill);
    } catch (err) {
        res.status(400).send({ message: err.message });
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
router.put('/updateBillId', getBill, async (req, res) => {
  if (req.body.orderId != null) {
    res.bill.orderId = req.body.orderId;
  }
  if (req.body.userId != null) {
    res.bill.userId = req.body.userId;
  }
  if (req.body.productos != null) {
    res.bill.productos = req.body.productos;
  }
  if (req.body.total != null) {
    res.bill.total = req.body.total;
  }
  if (req.body.fechaFactura != null) {
    res.bill.fechaFactura = req.body.fechaFactura;
  }
  if (req.body.pagos != null) {
    res.bill.pagos = req.body.pagos;
  }

  try {
    const updatedBill = await res.bill.save();
    res.send(updatedBill);
  } catch (err) {
    res.status(400).send({ message: err.message });
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
router.delete('/deleteBillId/:billId', async (req, res) => {
    try {
      const billId = req.params.billId; // Obtener el billId de los parámetros de la URL
      const bill = await Bill.findById(billId);
      if (!bill) {
        return res.status(404).json({ message: 'Cannot find bill with the provided ID' });
      }
  
      await bill.remove();
      res.send({ message: 'Deleted Bill' });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
  
module.exports = router;
