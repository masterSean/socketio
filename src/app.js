var socket = io();
var el = document.getElementById("form");
var input_el = document.getElementById("m");
var base_url = window.location.href;
var $ = require("jquery");

/*
$.get(base_url + "fetch_all", function(data) {
    var $url = $("#messages");
    $.each(data, function(key, val) {
        var $li = $("<li></li>").text(val.message);
        $url.append($li);
    });
});
*/

el.addEventListener("submit", function(event) {
    event.preventDefault();
    var val = input_el.value;
    //$.post(base_url + 'save_chat', { name: 'anonymous', message: val });
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

