const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: String,
  nombre: String,
  contrasenia: String,
  direccion: String,
  documentoIdentidad: String,
  categoria: String,
  tiempoConectado: [{ fecha: String, minutos: Number }]
});

module.exports = mongoose.model('User', UserSchema);
