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
      const { id: userId } = req.user;
      const { contactId } = req.params;
      try {
        Message.updateMany(
          {
            $and: [
              {
                $or: [
                  { to: userId, from: contactId },
                  { to: contactId, from: userId },
                ],
              },
              { readByReceiver: false },
            ],
          },
          { readByReceiver: true }
        );
        res.json({ message: 'Mesajes actualizados', status: true });
      } catch (error) {
        debug(error);
      }
    }
  );

  router.put(
    '/unread-messages/:contactId',
    passport.authenticate('jwt', { session: false }),
    tokenValidation,
    validationHandler({ contactId: contactIdSchema }, 'params'),
    async (req, res) => {
      const { id: userId } = req.user;
      const { contactId } = req.params;
      try {
        const unreadMessages = Message.countDocuments({
          to: userId,
          from: contactId,
        });
        res.json({ unreadMessages, message: 'Mensajes no leidos' });
      } catch (error) {
        debug(error);
      }
    }
  );
}

module.exports = chatsApi;
