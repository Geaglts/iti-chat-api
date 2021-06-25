const boom = require('@hapi/boom');

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  if (req.user.token === token) {
    return next();
  }
  next(boom.unauthorized());
}

module.exports = tokenValidation;
