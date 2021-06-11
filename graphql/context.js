const User = require('../models/user');
const { PubSub } = require('apollo-server-express');
const { config } = require('../config');
const jwt = require('jsonwebtoken');
const pubsub = new PubSub();

const context = async (req, res) => {
  try {
    const authorization = req.req.headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const validToken = jwt.verify(token, config.publicJwtSecret);
    const user = await User.findById(validToken.userId);
    return {
      req,
      res,
      pubsub,
      user,
    };
  } catch {
    return {
      req,
      res,
      pubsub,
    };
  }
};

module.exports = context;
