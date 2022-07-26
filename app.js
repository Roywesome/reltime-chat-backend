const express = require('express');
const cors = require('cors');

const app = express();

//Update Routes
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//Routes
app.use("/api/auth", userRoutes);
app.use('/api/messages', messageRoutes)

module.exports = app;

