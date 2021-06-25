const { createServer } = require('http');
const express = require('express');
const server = require('./graphql');

const app = express();

const contactsApi = require('./routes/contacts');
const chatsApi = require('./routes/chats');

// config
const { config } = require('./config');

app.set('port', config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to iti-chat-api', status: 'active' });
});

server.applyMiddleware({
  app,
  cors: {
    origin: true,
    credentials: true,
    methods: ['POST'],
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
  },
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

// routes
contactsApi(app);
chatsApi(app);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found', status: res.statusCode });
});

module.exports = { app, httpServer };
