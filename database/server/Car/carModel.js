let db = require('../db');

let carSchema = new db.mongoose.Schema({  
    manufacturer: String,
    model: String,
    other: Object,
    plate: String,
    owner: { type: db.mongoose.Schema.Types.ObjectId, ref: 'Owner' },
});


db.mongoose.model('Car', carSchema);

module.exports.carSchema = db.mongoose.model('Car');
