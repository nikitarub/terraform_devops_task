var express = require('express');
var app = express();


var ownerController = require('./Owner/ownerController');
var carController = require('./Car/carController');
app.get('/', (request, response) => {
    response.status(200).send(
        {
            'welcome' : "Hello world",
        });
});

app.use('/owners', ownerController.router);
app.use('/cars', carController.router);

module.exports.app = app;
