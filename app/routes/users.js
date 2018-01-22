module.exports = function(app) {
    app.get('/users', function(req, res){
        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.list(function(err, result) {
            res.render('users/list', {list: result});
        });
 
        connection.end();
    });

    app.get('/users/form', function(req, res) {
        res.render("users/form");
    });

    app.post('/users', function(req, res) { 
        var user = req.body;
        user.createdon = new Date();

        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.insert(user, function(err, result) {
            res.redirect('/users');
        });
 
        connection.end();
    });
}
