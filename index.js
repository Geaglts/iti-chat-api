const { app, httpServer } = require('./server');
require('./lib/mongo');

const PORT = app.get('port');

httpServer.listen(app.get('port'), () => {
  console.log(`Listening on port ${PORT}`);
});
