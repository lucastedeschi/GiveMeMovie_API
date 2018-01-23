var mysql = require('mysql');

function createDbConnection() {
    
    if(!process.env.NODE_ENV){
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: '123456',
            database: 'GiveMeMovie_Test'
        });
    }

    if(process.env.NODE_ENV == 'test'){
        console.log('Starting Test Database');
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: '123456',
            database: 'GiveMeMovie_Test'
        });
    }
}
        
module.exports = function() {
    return createDbConnection;
}