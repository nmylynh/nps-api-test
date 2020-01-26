const express = require('express');
const server = express();
const configureMiddleware = require('./config-middleware');
const auth = require('./api/auth/auth-router');
const users = require('./api/users/users-router');
const nps = require('./api/nps/nps-router');

configureMiddleware(server);

server.get('/', (req, res) => {
    res.send(`<h2>nps api up</h2>`)
  });  


server.use('/auth', auth);
server.use('/users', users);
server.use('/nps', nps);

module.exports = server;