// IMPORTS
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

//Initialization de app
const app = express();

// URLS
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const billRoutes = require('./routes/bill');


// Sesiones
app.use(session({
  secret: "pwdx",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false},
}));

function autenticar(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}


// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tienda');
    console.log('Conectado a MongoDB');

  } catch (error) {
    console.error('Error conectando a MongoDB: ', error);
    process.exit(1);
  }
};
connectDB();

// Conectar a Redis
const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Conectado a Redis');
});

client.connect().catch(console.error);

// Middleware para manejar las solicitudes OPTIONS
const handleOptions = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

// Middleware interaccion
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204 // Retorna 204 No Content en las respuestas a los métodos que solicitan el successStatus  
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Middleware de los clientes
app.use((req, res, next) => {
  req.redisClient = client;
  next();
});

app.use((req, res, next) => {
  req.db = mongoose.connection;
  next();
});

// Middleware para verificar si el usuario está autenticado
function verificarAutenticacion(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send('No autenticado');
  }
}

// Ruta protegida: perfil del usuario
app.get('/perfil', verificarAutenticacion, (req, res) => {
  res.status(200).send(`ID del usuario: ${req.session.userId}`);
});

 // Rutas
app.use('/register', handleOptions, registerRoutes);
app.use('/login', loginRoutes);
app.use('/product', handleOptions, productRoutes);
app.use('/cart', handleOptions, cartRoutes);
app.use('/order', handleOptions, orderRoutes);
app.use('/bill', handleOptions, billRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend conectado correctamente' });
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
