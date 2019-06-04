const express = require('express');
const helmet = require('helmet');

const zoosRouter = require('../zoos/zoos-router.js');
const bearRouter = require('../bears/bears-router.js')

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/zoos', zoosRouter);
server.use('/bears', bearRouter);

module.exports = server;
