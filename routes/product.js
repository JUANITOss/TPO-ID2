const express = require('express');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const router = express.Router();

// Crear producto
router.post('/', async (req, res) => {
  const producto = new Product(req.body);
  await producto.save();
  res.send(producto);
});

// Obtener productos
router.get('/', async (req, res) => {
  const productos = await Product.find();
  res.send(productos);
});

// Actualizar producto
router.put('/:productId', async (req, res) => {
  const producto = await Product.findOne({ productId: req.params.productId });

  if (producto) {
    const { nombreProducto, descripcion, fotos, videos, precio, operador } = req.body;
    const precioAnterior = producto.precio;

    producto.nombreProducto = nombreProducto;
    producto.descripcion = descripcion;
    producto.precio = precio;
    producto.historialPrecios.push({ fechaCambio: new Date(), precioAnterior, precioNuevo: precio, operador });

    await producto.save();
    res.send(producto);
  } else {
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

module.exports = router;
