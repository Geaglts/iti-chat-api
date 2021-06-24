const { Router } = require('express');
const User = require('../models/user');

function contactAPI(app) {
  const router = Router();
  app.use('/api/contacts', router);

  router.put('/auto-reset/:id', (req, res) => {
    try {
      res.json({ message: 'Thanks' });
    } catch (error) {
      console.log(error);
      res.json({ message: 'Error! D:' });
    }
  });
}

module.exports = contactAPI;
