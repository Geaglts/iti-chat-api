const mongoose = require('mongoose');

const { config } = require('../config');

const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

module.exports = mongoose
  .connect(MONGO_URI || `mongodb://${config.dbHost}:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to db');
  })
  .catch((e) => {
    console.log('Error connecting to db');
  });
