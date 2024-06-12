const express = require('express');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const router = express.Router();

// Crear producto
router.post('/createProduct', async (req, res) => {
  const producto = new Product(req.body);
  await producto.save();
  res.send(producto);
});

// Obtener productos
router.get('/getProduct', async (req, res) => {
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

// Agregar producto a carrito
router.post('/addProduct', async (req, res) => {
  try {
      const user = req.session.userId;
      const { productoId, nombreProducto, cantidad, precioUnitario } = req.body;

      const carrito = await Cart.findOne({ userId: user });

      if (carrito) {
          // Verificar si el producto ya existe en el carrito
          const productoExistente = carrito.productos.find(producto => producto.productoId === productoId);

          if (productoExistente) {
              // Si el producto ya existe, incrementar la cantidad
              productoExistente.cantidad += cantidad;
          } else {
              // Si el producto no existe, agregarlo al array de productos
              carrito.productos.push({ productoId, nombreProducto, cantidad, precioUnitario });
          }

          // Guardar los cambios en el carrito
          await carrito.save();

          res.send({ message: 'Productos agregados al carrito con éxito', carrito });
      } else {
          res.status(404).send({ message: 'Carrito no existente' });
      }
  } catch (error) {
      res.status(500).send({ message: 'Algo salio mal al agregar productos al carrito', error });
  }
});

module.exports = router;
