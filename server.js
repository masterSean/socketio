var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 500));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    console.log("a user is connected");
    socket.on("disconnect", function(){
        console.log("user disconnected");
    });

    socket.on("chat message", function(msg){
        io.emit("chat message", msg);
    });
});

http.listen(app.get('port'), function(){
    console.log("Node app is running on port", app.get('port'));
});
