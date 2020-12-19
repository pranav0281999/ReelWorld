const express = require('express');
const app = express();

const http = require('http').createServer(app);

const socketServer = require("socket.io").Server;

let io = new socketServer(http);

const port = 8080;

app.use(express.static('public'));

http.listen(port, () => {
    console.log('listening on *:' + port);
});

io.on("connection", client => {
    console.log("Client connected: " + client.id);

    client.emit("server_ack", {msg: "Acknowledgement from server"});

    client.on("client_ack", data => {
        console.log(data.msg + " " + client.id);
    });

    client.on("client_transformation", data => {
        console.log(data);
    })

    client.on("disconnect", (reason) => {
        console.log("Client disconnected: " + client.id + " for reason: " + reason);
    });
});
