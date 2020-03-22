var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var port = process.env.port || 80;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.redirect('index.html');
});


io.on('connection', (socket) => {
    socket.on('stream', (image) => {
        socket.broadcast.emit('stream', image);
    });
});

http.listen(port, () => {
    console.log("Server running at port " + port);
});