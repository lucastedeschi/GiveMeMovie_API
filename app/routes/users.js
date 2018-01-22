module.exports = function(app) {
    app.get('/users', function(res, res){
        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.list(function(err, result) {
            res.render('users/list', {list: result});
        });
 
        connection.end();
    });
}
