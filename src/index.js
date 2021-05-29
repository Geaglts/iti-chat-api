const { app, httpServer } = require('./server');
require('./lib/mongo');

const PORT = app.get('port');

httpServer.listen(app.get('port'), () => {
  console.log(`Server listening on port ${PORT}`);
});
