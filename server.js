var express = require("express");
var app = express();
var path = require('path');
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cool = require('cool-ascii-faces');
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://root:chatapp@ds115918.mlab.com:15918/chat-app-db', function(err, database) {
    if (err) return console.error(err)
    db = database;

    app.use('/js', express.static(path.join(__dirname, 'js')));

    app.set('port', (process.env.PORT || 5000));

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

    app.get('/test', function(req, res) {
        db.collection('test').save({ name : 'sean', text: 'testing'}, function(err, result) {
            if (err) return console.error(erro);

            console.log('saved to database');
        });
    });
});
