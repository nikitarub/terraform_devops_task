let db = require('../db');
 
let ownerSchema = new db.mongoose.Schema({  
    name: {
        first: {type: String, unique: true, required: true},
        last: {type: String, unique: true, required: true},
    },
    other: Object,
    cars: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'Cars' }]
});

db.mongoose.model('Owner', ownerSchema);

module.exports.ownerSchema = db.mongoose.model('Owner');


