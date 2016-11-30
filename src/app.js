var socket = io();
var el = document.getElementById("form");
var input_el = document.getElementById("m");
var base_url = window.location.href;

el.addEventListener("submit", function(event) {
    event.preventDefault();
    var val = input_el.value;
    socket.emit("chat message", val);
    input_el.value = "";
    return false;
});

socket.on("chat message", function(msg) {
    var ul = document.getElementById("messages");
    var li = document.createElement("LI");
    var text = document.createTextNode(msg);
    li.appendChild(text);
    ul.appendChild(li);
});

