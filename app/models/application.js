// app/models/application.js
// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Application', {
    ein: Number,
    applicationDate: Date,
    country: String,
    importItems: [{
    	hsCode: String,
    	qty: Number,
    	qtyUnits: Number,
    	value: Number
    }]
});