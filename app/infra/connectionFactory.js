var mongoose = require('mongoose');

function connect() {
    var db = mongoose.connection;

    db.on('error', console.error);

    db.once('open', function() {
        console.log('Connected: MongoDB')
    });

    mongoose.connect('mongodb://teamDev:123456@ds117128.mlab.com:17128/givememovie_api');
}
        
module.exports = function() {
    return connect;
}