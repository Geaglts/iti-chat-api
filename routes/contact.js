const { Router } = require('express');
const passport = require('passport');
const User = require('../models/user');

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
    (req, res) => {
      try {
        res.json({ message: 'Thanks' });
      } catch (error) {
        console.log(error);
        res.json({ message: 'Error! D:' });
      }
    }
  );
}

module.exports = contactApi;
