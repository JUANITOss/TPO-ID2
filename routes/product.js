const express = require('express');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const router = express.Router();

// Añadir producto
router.post('/addProduct', async (req, res) => {
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
router.put('/updateProduct/:_id', async (req, res) => {
  const producto = await Product.findOne({ _id: req.params._id });

  if (producto) {
    const { nombreProducto, descripcion, precio, operador } = req.body;
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
router.post('/productToCart', async (req, res) => {
  try {
      const user = req.session.userId;
      const { _id, nombreProducto, cantidad, precio } = req.body;

      const carrito = await Cart.findOne({ userId: user });

      if (carrito) {
          // Verificar si el producto ya existe en el carrito
          const productoExistente = carrito.productos.find(producto => producto._id === _id);

          if (productoExistente) {
              // Si el producto ya existe, incrementar la cantidad
              productoExistente.cantidad += cantidad;
          } else {
              // Si el producto no existe, agregarlo al array de productos
              carrito.productos.push({ nombreProducto, cantidad, precio });
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
