const Bill = require('../models/Bill'); // Asegúrate de tener la ruta correcta al modelo Bill
const express = require('express');
const router = express.Router();

// Ruta para obtener todas las facturas (GET /bills)
router.get('/getBills', async (req, res) => {
  try {
      const bills = await Bill.find();
      res.json(bills);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener una factura por ID (GET /bills/:id)
router.get('/getBillsId/:id', getBill, (req, res) => {
  res.json(res.bill);
});

// Ruta para crear una nueva factura (POST /bills)
router.post('/', async (req, res) => {
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
      res.status(201).json(newBill);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Ruta para actualizar una factura (PUT /bills/:id)
router.put('/updateBillId/:id', getBill, async (req, res) => {
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
      res.json(updatedBill);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// Ruta para eliminar una factura (DELETE /bills/:id)
router.delete('/deleteBillId/:id', getBill, async (req, res) => {
  try {
      await res.bill.remove();
      res.json({ message: 'Deleted Bill' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Middleware para obtener una factura por ID
async function getBill(req, res, next) {
  let bill;
  try {
      bill = await Bill.findById(req.params.id);
      if (bill == null) {
          return res.status(404).json({ message: 'Cannot find Bill' });
      }
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }

  res.bill = bill;
  next();
}

module.exports = router;
