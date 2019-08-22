const express = require('express');
const app = express();
const rootPath = "./";
const config = require(rootPath + "config.js");

app.use("/", require(rootPath + "controllers"));

app.listen(config.port, function () {
    console.log('app listening on localhost:' + config.port);
});
