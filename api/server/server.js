const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../routers/auth/auth-router');
const userRouter = require('../routers/users/users-router');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => res.status(200).json({
    message: "It's alive!"
}))

server.use('/auth', authRouter);
server.use('/users', userRouter);

module.exports = server;