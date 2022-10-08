/**
 * Node core
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
/**
 * Node Framework
 */
const express = require('express');
const app = express();

const appConfig = require('./config/app');
const { PORT } = appConfig;

// app.post('/', (req, res) => {
//     res.send('Hi Fanthbol');
// });

// app.listen(PORT, () => {
//     console.log(`Application listening on port ${PORT}`);
// });



http.createServer(function (req, res) {
    console.log(req);
   res.writeHead(200, {'Content-Type': 'application/json'});
   res.end('Hi, Welcome Node Server...!');
})
.listen(PORT);
