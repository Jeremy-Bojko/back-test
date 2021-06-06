const http = require('http');
const app = require('./app'); 

// Port config manager
const normalizePort = val => {
  const port  = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePort(process.env.PORT || 3000)
app.set('port', port);

const erroHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + adresse : 'port: ' + port;

  switch (error.code) {
    case 'EACCESS':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in user.');
    default:
      throw error;
  } 
}

const server = http.createServer(app);

server.on('error', erroHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + adresse : 'port: ' + port;
  console.log('Listening on ' + bind);
})

server.listen(process.env.PORT || 3000);