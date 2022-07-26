const mongoose = require('mongoose');
const dotenv = require('dotenv') 
dotenv.config();
const socket = require('socket.io');

const app = require('./app');

const port = process.env.PORT;
const uri = process.env.MONGO_URI;



mongoose.Promise = global.Promise;
mongoose
  .connect(uri, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
  .then(() => {
    console.log("MongoDB connection Successful");
    console.log(process.env.MONGO_URI);
    
  })
  .catch((err) => console.log(err));


  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });


  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
  
    }
  })
  
  global.onlineUsers = new Map();
  
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      console.log(userId)
      onlineUsers.set(userId, socket.id);
      
    });
  
    socket.on("send-msg", (data) => {

      console.log({data});

      const sendUserSocket = onlineUsers.get(data.to);

      console.log("comentario", sendUserSocket);

      if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieve", data.message)
      }
    })
  })