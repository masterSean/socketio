var express = require("express");
var app = express();
var path = require("path");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var cool = require("cool-ascii-faces");
var mongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');

mongoClient.connect("mongodb://root:chatapp@ds115918.mlab.com:15918/chat-app-db", function(err, database) {
//mongoClient.connect("mongodb://localhost:27017/chat-app", function(err, database) {
    if (err) return console.error(err);
    const db = database;

    app.use("/js", express.static(path.join(__dirname, "js")));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.set("port", 5000);

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
    
    http.listen(app.get("port"), function(){
        console.log("Node app is running on port", app.get("port"));
    });

    app.get("/fetch_all", function(req, res) {
        const test = db.collection('messages').find().toArray( function(err, results) {
            res.json(results);
        });
    });

    app.post("/save_chat", function(req, res, next) {
        db.collection('messages').save(req.body, function(err, result) { 
            if (err) console.error(err);
        });
        res.end();
    });
});
