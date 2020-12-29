const express = require('express');
const app = express();

const http = require('http').createServer(app);

const socketServer = require("socket.io").Server;

let io = new socketServer(http);

const port = 8080;

let clients = {};

let screenShares = {};

app.use(express.static('public'));

http.listen(port, () => {
    console.log('listening on *:' + port);
});

io.on("connection", client => {
    console.log("Client connected: " + client.id + " " + client.handshake.query.username);

    clients[client.id] = {
        position: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        username: client.handshake.query.username
    };

    client.emit("initial_state", {
        clientId: client.id,
        clients: clients
    });

    io.sockets.emit("client_new", {clientId: client.id, username: client.handshake.query.username});

    client.on("client_transformation", data => {
        clients[client.id].position = data.position;
        clients[client.id].rotation = data.rotation;

        io.sockets.emit("client_transformation", {
            clientId: client.id,
            position: clients[client.id].position,
            rotation: clients[client.id].rotation,
        });
    });

    client.on("offer-to-client", data => {
        console.log('offer-to-client ' + client.id + " to " + data.clientId);

        io.to(data.clientId).emit("offer-from-client", {
            clientId: client.id,
            offer: data.offer
        });
    });

    client.on("answer-to-client", data => {
        console.log('answer-to-client ' + client.id + " to " + data.clientId);

        io.to(data.clientId).emit("answer-from-client", {
            clientId: client.id,
            answer: data.answer
        });
    });

    client.on("icecandidate-to-client", data => {
        console.log('icecandidate-to-client ' + client.id + " to " + data.clientId);

        io.to(data.clientId).emit("icecandidate-from-client", {
            clientId: client.id,
            icecandidate: data.icecandidate
        });
    });

    client.on("offer-to-client-ss", data => {
        console.log('offer-to-client-ss ' + client.id + " to " + data.clientId);

        io.to(data.clientId).emit("offer-from-client-ss", {
            clientId: client.id,
            offer: data.offer
        });
    });

    client.on("answer-to-client-ss", data => {
        console.log('answer-to-client-ss ' + client.id + " to " + data.clientId);

        io.to(data.clientId).emit("answer-from-client-ss", {
            clientId: client.id,
            answer: data.answer
        });
    });

    client.on("icecandidate-to-client-ss", data => {
        console.log('icecandidate-to-client-ss ' + client.id + " to " + data.clientId);

        io.to(data.clientId).emit("icecandidate-from-client-ss", {
            clientId: client.id,
            icecandidate: data.icecandidate
        });
    });

    client.on("confirm_screen_share", data => {
        console.log("confirm_screen_share");

        if (Object.keys(screenShares).length >= 4) {
            io.to(client.id).emit("confirmation_screen_share", {
                canShareScreen: false
            });
        } else {
            screenShares[client.id] = true;

            io.to(client.id).emit("confirmation_screen_share", {
                canShareScreen: true
            });
        }
    });

    client.on("client_exit_ss", (reason) => {
        console.log("client_exit_ss: " + client.id + " for reason: " + reason);
        delete screenShares[client.id];

        io.sockets.emit("client_exit_ss", {
            clientId: client.id
        });
    });

    client.on("confirm_screen_share_decline", data => {
        console.log("confirm_screen_share_decline");

        delete screenShares[client.id];
    });

    client.on("remove_screen_share", data => {
        console.log("remove_screen_share");

        if (Object.keys(screenShares).find(clientId => clientId === client.id) !== undefined) {
            io.sockets.emit("remove_screen_share", {
                clientId: client.id
            });
        }

        delete screenShares[client.id];
    });

    client.on("public_message", data => {
        console.log("public_message");

        io.sockets.emit("public_message", {
            clientId: client.id,
            message: data.message,
            username: client.handshake.query.username
        });
    });

    client.on("disconnect", (reason) => {
        console.log("Client disconnected: " + client.id + " for reason: " + reason);
        delete clients[client.id];

        if (Object.keys(screenShares).find(clientId => clientId === client.id) !== undefined) {
            io.sockets.emit("remove_screen_share", {
                clientId: client.id
            });
        }

        delete screenShares[client.id];

        io.sockets.emit("client_exit", {clientId: client.id});
    });
});
