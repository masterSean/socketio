var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

console.log(io);
io.on("connection", function(socket) {
    console.log("a user is connected");
    socket.on("disconnect", function(){
        console.log("user disconnected");
    });

    socket.on("chat message", function(msg){
        io.emit("chat message", msg);
    });
});

http.listen(3000, function(){
    console.log("Listening on port *:3000");
});