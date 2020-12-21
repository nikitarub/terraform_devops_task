let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
let carModel = require('./carModel');


router.post('/', (request, response) => {
    console.log("Request for Car insert:\n", request.body);

    carModel.carSchema.create({
            manufacturer: request.body.manufacturer,
            model: request.body.model,
            other: request.body.other,
            plate: request.body.plate,
            car: request.body.car 
        }, 
        (err, car) => {
            if (err) return response.status(500).send("There was a problem adding the information to the database.");
            response.status(200).send(car);
        });
});


router.get('/', (request, response) => {
    carModel.carSchema.find({}).populate('car').lean().exec((err, owners) => {
        if (err) return response.status(500).send("There was a problem finding the owners.");
        response.status(200).send(owners);
    });
});


router.get('/:manufacturer', (request, response) => {
    carModel.carSchema.find( 
        {
            'manufacturer': request.params.manufacturer
        },
        ).populate('car').lean().exec((err, car) => {
        if (err) return response.status(500).send("There was a problem finding the car.");
        if (!car) return response.status(404).send("No car found.");
        response.status(200).send(car);
    });
});


router.get('/:manufacturer/:model', (request, response) => {
    carModel.carSchema.findOne( 
        {
            'manufacturer': request.params.manufacturer,
            'model': request.params.model
        },
        ).populate('car').lean().exec((err, car) => {
        if (err) return response.status(500).send("There was a problem finding the car.");
        if (!car) return response.status(404).send("No car found.");
        response.status(200).send(car);
    });
});


router.get('/:manufacturer/:model/:plate', (request, response) => {
    carModel.carSchema.findOne( 
        {
            'manufacturer': request.params.manufacturer,
            'model': request.params.model,
            'plate': request.params.plate
        },
        ).lean().exec((err, car) => {
        if (err) return response.status(500).send("There was a problem finding the car.");
        if (!car) return response.status(404).send("No car found.");
        response.status(200).send(car);
    });
});


module.exports.router = router;