module.exports = function(app) {
    app.get('/users', function(res, res){
        var connection = app.infra.connectionFactory;

        connection.query('select * from users', function(err, result) {
            res.render('users/list', {list: result});
        });
 
        connection.end();
    });
}
