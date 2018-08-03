"use strict"
let server_helpers = require("./node_server");

const fs = require("fs");
const bp = require("body-parser");
const express = require("express");

const app = express();
const parser = bp.urlencoded({ extended: false });


server_helpers.connectToSql();


app.use(express.static(__dirname + '/public'));

app.listen(3000, "192.168.2.4");

app.get('/', function(request, response){
    response.sendFile(__dirname + "/server.html");
});

app.post('/', parser, function(request, response){

    let cmd = request.body.command;
    let cmd_code = server_helpers.processCmd(cmd);

    console.log("app: " + cmd_code);

    response.writeHead(200, {"Content-type": "text/plain"});
    response.end(cmd_code);

});

app.get('/status', function(request, response){

    response.writeHead(200, {"Content-type": "application/json"});
    server_helpers.getStatus(response);

});


app.get('/uptime', function(request, response){

    response.writeHead(200, {"Content-type": "application/json"});
    server_helpers.getUptime(response);

});
