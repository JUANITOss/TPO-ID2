const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  dni: { type: String, required: true },
  lastLogin: { type: Date, default: null },
  sessionStart: { type: Date, default: null },
  sessionMinutes: { type: Number, default: 0 } // Nuevo campo para el tiempo de sesión en minutos
});

module.exports = mongoose.model('User', userSchema);
