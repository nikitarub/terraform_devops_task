
# File structure

1. index.js
2. /server/app.js
3. /server/db.js
4. /server/Owner/ownerModel.js
5. /server/Owner/ownerController.js
6. /server/Cars/carModel.js
7. /server/Cars/carController.js


## Installation

### Tools
1. [nodejs](https://nodejs.org/en/)
2. [mongodb](https://www.mongodb.com)


### Package
1. `git clone`
2. `cd databse`
3. `npm i`


## Start

1. Start mongo (mongod)
2. From "/db_mongo_bmstu": `npm start`

### What's inside

MongoDB stores BSON file. BSON (Binary JSON) - binary JSON, no free spaces and new lines and so on.

Here we have cars and their vehicles owners info.

Owners Schema:
```javascript
let ownerSchema = new db.mongoose.Schema({  
    name: {
        first: {type: String, unique: true, required: true},
        last: {type: String, unique: true, required: true},
    },
    other: Object,
    cars: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'Cars' }] // like Foreign-key in mongoose
});
```

Cars Schema:
```javascript
let carSchema = new db.mongoose.Schema({  
    manufacturer: String,
    model: String,
    other: Object,
    plate: String,
    owner: { type: db.mongoose.Schema.Types.ObjectId, ref: 'Owner' },
});
```


## API


`/owners/`:

1. POST '/' – send owners info
2. GET '/' – get owner info
3. GET '/{last}' – get owner info with last name {last}
4. GET '/{last}/{first}' – get owner info with last name {last} and first name {first}


`/cars/`:

1. POST '/' – send cars
2. GET '/' – get cars info
3. GET '/{manufacturer}' – get cars info which manufacturer is  {manufacturer}
4. GET '/{manufacturer}/{model}' – get cars info which manufacturer is  {manufacturer} and model {model}
5. GET '/{manufacturer}/{model}/{plate}' – get cars info which manufacturer is  {manufacturer} and model {model} with number plate {plate}


## Examples

Owner creation
```json
POST: 127.0.0.1/owners/
body(application/json):
{
	"name" : { 
		"first" : "Nikita",
		"last" : "Rubinov"
	},
    "other" : {
        "age" : 21
    }
}
```

All owners
```json
GET: 127.0.0.1/owners/
```

All owners by lastname
```json
GET: 127.0.0.1/owners/Rubinov
```

All owners by last name and first name
```json
GET: 127.0.0.1/owners/Rubinov/Nikita
```


Car creation
```json
POST: 127.0.0.1/cars/
body(application/json):
{
	"manufacturer": "Mercedes-Benz",
    "model": "300SL Gullwing",
    "other": {
    	"hp" : 215,
    	"year": 1962
    },
    "plate": "b123cd777", 
	"owner": "5c3b843cc93cfdb86f44addb"
}
```

All cars
```json
GET: 127.0.0.1/cars/
```

All cars Mercedes-Benz
```json
GET: 127.0.0.1/cars/Mercedes-Benz
```

All cars Mercedes-Benz and model 300SL Gullwing 
```json
GET: 127.0.0.1/cars/Mercedes-Benz/300SL Gullwing
```

All cars Mercedes-Benz, model 300SL Gullwing, number plate b123cd777
```json
GET: 127.0.0.1/cars/Mercedes-Benz/300SL Gullwing/b123cd777
```
