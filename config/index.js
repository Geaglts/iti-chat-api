require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbHost: process.env.DB_HOST || 'localhost',
  dbName: process.env.DB_NAME || 'iti-chat-db',
  publicJwtSecret: process.env.PUBLIC_JWT_SECRET || 'secret',
};

module.exports = { config };
