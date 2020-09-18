const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.get ('/', (req, resp) => { 
  resp.sendFile(__dirname + '/index.html'); 
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });

    socket.broadcast.emit('hi');

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

http.listen (3000, () => { 
    console.log('ouvindo : 3000'); 
})