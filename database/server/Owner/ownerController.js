let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let ownerModel = require('./ownerModel');

router.post('/', (request, response) => {
    console.log("Request for Owner insert:\n", request.body);
    
    ownerModel.ownerSchema.create({
            name: request.body.name,
            other: request.body.other,
            cars: request.body.cars
        }, 
        (err, owner) => { 
            if (err) return response.status(500).send("There was a problem adding the information to the database."); 
            response.status(200).send(owner); 
        });
});


router.get('/', (request, response) => {
    ownerModel.ownerSchema.find(
        {}, 
        (err, owners) => {
        if (err) return response.status(500).send("There was a problem finding the owners.");
        response.status(200).send(owners);
    });
});



router.get('/:last', (request, response) => {
    ownerModel.ownerSchema.find(
        {'name.last': request.params.last}, 
        'name other' 
    ).lean().exec((err, owner) => { 
        if (err) return response.status(500).send("There was a problem finding the owner.");
        if (!owner) return response.status(404).send("No owner found.");
        response.status(200).send(owner);
    });
});


router.get('/:last/:first', (request, response) => {
    ownerModel.ownerSchema.find( 
        {
            'name.last': request.params.last,
            'name.first': request.params.first
        }
        ).lean().exec((err, owner) => {
        if (err) return response.status(500).send("There was a problem finding the owner.");
        if (!owner) return response.status(404).send("No owner found.");
        response.status(200).send(owner);
    });
});

module.exports.router = router;
