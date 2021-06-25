const debug = require('debug')('app:routes/chats');
const { Router } = require('express');
const passport = require('passport');
const Message = require('../models/message');

// Strategies
require('../utils/auth/strategies/jwt');

// Middlewares
const tokenValidation = require('../utils/middleware/tokenValidation');
const validationHandler = require('../utils/middleware/validationHandler');

// Schemas
const { contactIdSchema } = require('../utils/schema/contact');

function chatsApi(app) {
  const router = Router();
  app.use('/api/chats', router);

  router.delete(
    '/drop-chats',
    passport.authenticate('jwt', { session: false }),
    tokenValidation,
    async (req, res) => {
      try {
        await Message.deleteMany({
          $or: [{ from: req.user.id }, { to: req.user.id }],
        });
        res.json({ message: 'Mensajes eliminados' });
      } catch (error) {
        debug(error);
      }
    }
  );

  router.put(
    '/change-status/:contactId',
    passport.authenticate('jwt', { session: false }),
    tokenValidation,
    validationHandler({ contactId: contactIdSchema }, 'params'),
    async (req, res) => {
      try {
        res.json({ message: 'Mesajes actualizados', status: true });
      } catch (error) {
        debug(error);
      }
    }
  );
}

module.exports = chatsApi;
