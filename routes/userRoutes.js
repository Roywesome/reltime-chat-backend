const express = require('express');
const api = express.Router();
const {register, login, avatar, getUsers} = require('../controllers/userController')

api.post('/register', register);
api.post('/login', login);
api.post('/avatar/:id', avatar);
api.get('/allusers/:id', getUsers);


module.exports = api;