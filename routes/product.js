const express = require('express');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const router = express.Router();

// Añadir producto
router.post('/addProduct', async (req, res) => {
  const { nombreProducto, descripcion, precio, operador } = req.body;

  try {
    // Verificar si ya existe un producto con el mismo nombre
    const existingProduct = await Product.findOne({ nombreProducto });

    if (existingProduct) {
      return res.status(400).json({ error: 'Ya existe un producto con este nombre' });
    }

    // Si no existe, creamos un nuevo producto y lo guardamos
    const nuevoProducto = new Product({ nombreProducto, descripcion, precio, operador });
    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al intentar agregar el producto' });
  }
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

// Eliminar producto
router.delete('/deleteProduct/:_id', async (req, res) => {

  try {
    const result = await Product.deleteOne({ _id: req.params._id });

    if (!result) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }

    res.send({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).send({ message: 'Hubo un error al intentar eliminar el producto', error: error.message });
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
          const productoExistente = carrito.productos.find(producto => producto.nombreProducto === nombreProducto);

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