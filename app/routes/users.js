var conn = require('../infra/dbConnection')();

module.exports = function(app) {
    app.get('/users', function(res, res){
        
        conn.query('select * from users', function(err, result) {
            res.render('users/list', {list: result});
        });
 
        conn.end();
    });
}
