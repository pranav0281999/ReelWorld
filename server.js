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
    const username = client.handshake.query.username, chatroom = client.handshake.query.chatroom;

    console.log("Client connected: " + username + " for room: " + chatroom);

    if (!clients[chatroom]) {
        clients[chatroom] = {};
    }

    if (!screenShares[chatroom]) {
        screenShares[chatroom] = {};
    }

    clients[chatroom][client.id] = {
        position: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        username: username,
        chatroom: chatroom
    };

    client.emit("initial_state", {
        clientId: client.id,
        clients: clients[chatroom]
    });

    Object.keys(clients[chatroom]).forEach(key => {
        io.to(key).emit("client_new", {clientId: client.id, username: username});
    });

    client.on("client_transformation", data => {
        clients[chatroom][client.id].position = data.position;
        clients[chatroom][client.id].rotation = data.rotation;

        Object.keys(clients[chatroom]).forEach(key => {
            io.to(key).emit("client_transformation", {
                clientId: client.id,
                position: clients[chatroom][client.id].position,
                rotation: clients[chatroom][client.id].rotation,
            });
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

        if (Object.keys(screenShares[chatroom]).length >= 4) {
            io.to(client.id).emit("confirmation_screen_share", {
                canShareScreen: false
            });
        } else {
            screenShares[chatroom][client.id] = true;

            io.to(client.id).emit("confirmation_screen_share", {
                canShareScreen: true
            });
        }
    });

    client.on("client_exit_ss", (reason) => {
        console.log("client_exit_ss: " + client.id + " for reason: " + reason);
        delete screenShares[chatroom][client.id];

        Object.keys(clients[chatroom]).forEach(key => {
            io.to(key).emit("client_exit_ss", {
                clientId: client.id
            });
        });
    });

    client.on("confirm_screen_share_decline", data => {
        console.log("confirm_screen_share_decline");

        delete screenShares[chatroom][client.id];
    });

    client.on("remove_screen_share", data => {
        console.log("remove_screen_share");

        if (Object.keys(screenShares[chatroom]).find(clientId => clientId === client.id) !== undefined) {
            Object.keys(clients[chatroom]).forEach(key => {
                io.to(key).emit("remove_screen_share", {
                    clientId: client.id
                });
            });
        }

        delete screenShares[chatroom][client.id];
    });

    client.on("public_message", data => {
        console.log("public_message");

        Object.keys(clients[chatroom]).forEach(key => {
            io.to(key).emit("public_message", {
                clientId: client.id,
                message: data.message,
                username: username
            });
        });
    });

    client.on("disconnect", (reason) => {
        console.log("Client disconnected: " + client.id + " for reason: " + reason);
        delete clients[chatroom][client.id];

        if (Object.keys(screenShares[chatroom]).find(clientId => clientId === client.id) !== undefined) {
            Object.keys(clients[chatroom]).forEach(key => {
                io.to(key).emit("remove_screen_share", {
                    clientId: client.id
                });
            });
        }

        delete screenShares[chatroom][client.id];

        Object.keys(clients[chatroom]).forEach(key => {
            io.to(key).emit("client_exit", {clientId: client.id});
        });
    });
});
