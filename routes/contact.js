const { Router } = require('express');
const User = require('../models/user');

// utils
const validationHandler = require('../utils/middleware/validationHandler');

// schemas
const { contactIdSchema } = require('../utils/schema/contact');

function contactApi(app) {
  const router = Router();
  app.use('/api/contacts', router);

  router.put(
    '/auto-reset/:id',
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
