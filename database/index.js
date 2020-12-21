var serverApp = require('./server/app');
var portServer = 80; 

serverApp.app.listen(portServer, () => {
  console.log('Express server listening on port ' + portServer);
});
