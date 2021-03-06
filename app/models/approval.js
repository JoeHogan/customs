// app/models/tap.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Approval', {
    type: Number,
    application: Schema.Types.ObjectId,
    date: Date
});