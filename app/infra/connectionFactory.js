var mysql = require('mysql');

function createDbConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: '123456',
        database: 'GiveMeMovie'
    });
}
        
module.exports = function() {
    return createDbConnection();
}