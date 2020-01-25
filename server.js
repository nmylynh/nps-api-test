const express = require('express');
const server = express();
const configureMiddleware = require('./api/middleware/config-middleware');
const auth = require('./api/routers/auth-router');
const users = require('./api/routers/users-router');
const nps = require('./api/routers/nps-router');

configureMiddleware(server);

server.get('/', (req, res) => {
    res.send(`<h2>nps api up</h2>`)
  });  


server.use('/auth', auth);
server.use('/users', users);
server.use('/nps', nps);

module.exports = server;