const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('short'));

server.get('/', (req, res) => {
    res.send('server sanity check');
});

module.exports = server;