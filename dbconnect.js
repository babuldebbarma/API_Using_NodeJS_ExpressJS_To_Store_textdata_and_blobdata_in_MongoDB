var mongoose = require('mongoose');

module.export = mongoose.connect('mongodb://localhost:27017/babul', function(err) {
    if (err) throw err;
    console.log("Database connection established");
});