"use strict";

var path = require('path');
var express = require('express');

const app = express();

app.use(express.static(__dirname + '/target'));
app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'target', 'index.html'));
});

app.listen(3222);
console.log("Server started on port 3222");