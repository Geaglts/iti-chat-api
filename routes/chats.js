const debug = require('debug')('app:routes/chats');
const { Router } = require('express');
const passport = require('passport');
const User = require('../models/user');

// Strategies
require('../utils/auth/strategies/jwt');

// Middlewares
const tokenValidation = require('../utils/middleware/tokenValidation');

function chatsApi(app) {
  const router = Router();
  app.use('/api/chats', router);

  router.delete(
    '/drop-chats',
    passport.authenticate('jwt', { session: false }),
    tokenValidation,
    (req, res) => {
      try {
        debug('Todo esta funcionando bien');
        res.json({ message: 'Mensajes eliminados' });
      } catch (error) {
        debug(error);
      }
    }
  );
}

module.exports = chatsApi;
