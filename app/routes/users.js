module.exports = function(app) {
    app.get('/users', function(res, res){
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: '123456',
            database: 'GiveMeMovie'
        });

        connection.query('select * from users', function(err, result) { 
            res.send(result);
        });

        connection.end();
    });
}
