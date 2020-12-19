const express = require('express');
const app = express();

const http = require('http').createServer(app);

const socketServer = require("socket.io").Server;

let io = new socketServer(http);

const port = 8080;

let clients = {};

app.use(express.static('public'));

http.listen(port, () => {
    console.log('listening on *:' + port);
});

io.on("connection", client => {
    clients[client.id] = {
        position: [0, 0, 0],
        rotation: [0, 0, 0, 1]
    };

    io.sockets.emit("client_new", {clientId: client.id});

    client.emit("initial_state", {
        id: client.id,
        clients: clients
    });

    console.log("Client connected: " + client.id);

    client.on("client_transformation", data => {
        clients[client.id] = data;

        io.sockets.emit("client_transformation", {
            clients: clients
        });
    })

    client.on("disconnect", (reason) => {
        console.log("Client disconnected: " + client.id + " for reason: " + reason);
        delete clients[client.id];

        io.sockets.emit("client_exit", {clientId: client.id});
    });
});
