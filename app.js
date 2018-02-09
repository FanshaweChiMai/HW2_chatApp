const express = require('express'); // include this
const app = express();
const io = require('socket.io')();//activate chat plugin
//express -> route

//serve up static files
app.use(express.static('public'));

// set up routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

const server = app.listen(3000, () => {
  console.log('app running on port 3000!');
});

io.attach(server);

io.on('connection', socket =>{ //function(socket){...}
  console.log('a user has connected!');
  io.emit('connecting', {for: 'everyone', msg: `${socket.id} is here!`});
});

//handle messages sent from the client
socket.on('chat message', msg =>{
  io.emit('chat message', {for: 'everyone', message : msg});
});
  socket.on('disconnect', () =>{
    console.log('a user has disconnected!');
    io.emit('disconnect message', `${socket.id} has left!`);
  });
