const express = require('express');
const app = express();

const http = require('http').createServer(app);

const port = 8000;

app.use(express.static('public'));

http.listen(port, () => {
    console.log('listening on *:8000');
});
