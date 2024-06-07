const User = require('../models/User');

const sessionTracker = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      const now = new Date();
      if (user.sessionStart) {
        const elapsedMinutes = Math.floor((now - user.sessionStart) / 60000); // Tiempo transcurrido en minutos
        console.log(`Tiempo de sesión activa: ${elapsedMinutes} minutos`);

        // Aquí puedes actualizar el tiempo de sesión activa acumulado del usuario
        user.sessionMinutes = (user.sessionMinutes || 0) + elapsedMinutes;
      }
      user.sessionStart = now;
      await user.save();
    }
  }
  next();
};

module.exports = sessionTracker;
