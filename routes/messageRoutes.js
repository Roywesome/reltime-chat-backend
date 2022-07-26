const express = require('express');
const api = express.Router();
const {addMessage, getAllMessages} = require('../controllers/messageController')

api.post('/addmsg', addMessage);
api.post('/getmsg', getAllMessages);


module.exports = api;