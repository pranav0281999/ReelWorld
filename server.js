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

    client.emit("initial_state", {
        clientId: client.id,
        clients: clients
    });

    io.sockets.emit("client_new", {clientId: client.id});

    console.log("Client connected: " + client.id);

    client.on("client_transformation", data => {
        clients[client.id] = data;

        io.sockets.emit("client_transformation", {
            clientId: client.id,
            position: clients[client.id].position,
            rotation: clients[client.id].rotation,
        });
    });

    client.on("offer-to-client", data => {
        console.log('Offer from ' + client.id + " to " + data.clientId);

        io.to(data.clientId).emit("offer-from-client", {
            clientId: client.id,
            offer: data.offer
        });
    });

    client.on("answer-to-client", data => {
        console.log('Answer from ' + client.id + " to " + data.clientId);

        io.to(data.clientId).emit("answer-from-client", {
            clientId: client.id,
            answer: data.answer
        });
    });

    client.on("disconnect", (reason) => {
        console.log("Client disconnected: " + client.id + " for reason: " + reason);
        delete clients[client.id];

        io.sockets.emit("client_exit", {clientId: client.id});
    });
});
