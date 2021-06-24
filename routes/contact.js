const { Router } = require('express');
const passport = require('passport');

// Strategies
require('../utils/auth/strategies/jwt');

// utils
const validationHandler = require('../utils/middleware/validationHandler');

// schemas
const { contactIdSchema } = require('../utils/schema/contact');

function contactApi(app) {
  const router = Router();
  app.use('/api/contacts', router);

  router.put(
    '/auto-reset/:id',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ id: contactIdSchema }, 'params'),
    async (req, res) => {
      const { id } = req.params;
      try {
        const contacts = req.user.contacts;
        const contact = contacts.findIndex((c) => String(c._id) === id);
        contacts[contact].reset = true;
        req.user.contacts = contacts;
        await req.user.save();
        res.json({ message: 'Thanks' });
      } catch (error) {
        console.log(error);
        res.json({ message: 'Error! D:' });
      }
    }
  );
}

module.exports = contactApi;
