const { Router } = require('express');
const passport = require('passport');

// Strategies
require('../utils/auth/strategies/jwt');

// middlewares
const validationHandler = require('../utils/middleware/validationHandler');
const tokenValidation = require('../utils/middleware/tokenValidation');

// schemas
const { contactIdSchema } = require('../utils/schema/contact');

function contactsApi(app) {
  const router = Router();
  app.use('/api/contacts', router);

  router.put(
    '/auto-reset/:id',
    passport.authenticate('jwt', { session: false }),
    tokenValidation,
    validationHandler({ id: contactIdSchema }, 'params'),
    async (req, res) => {
      const { id } = req.params;
      try {
        const contacts = req.user.contacts;
        const contact = contacts.findIndex((c) => String(c._id) === id);
        contacts[contact].reset = !contacts[contact].reset;
        req.user.contacts = contacts;
        await req.user.save();
        res.json({ message: `Auto reset: ${contacts[contact].reset}` });
      } catch (error) {
        console.log(error);
        res.json({ message: 'Error! D:' });
      }
    }
  );
}

module.exports = contactsApi;
