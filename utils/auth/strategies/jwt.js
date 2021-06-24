const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const User = require('../../../models/user');
const { config } = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.publicJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, done) {
      try {
        const user = await User.findById(tokenPayload.userId).select([
          '-password',
        ]);
        if (!user) {
          return done(boom.unauthorized(), false);
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
