const express = require('express');

const authRouter = require('../routers/auth/auth-router');
const userRouter = require('../routers/users/users-router');

const server = express();

server.get('/', (req, res) => res.status(200).json({
    message: "It's alive!"
}))

server.use('/auth', authRouter);
server.use('/users', userRouter);

module.exports = server;