const express = require('express');
const app = express();

const http = require('http').createServer(app);

const port = 8080;

app.use(express.static('public'));

http.listen(port, () => {
    console.log('listening on *:' + port);
});
