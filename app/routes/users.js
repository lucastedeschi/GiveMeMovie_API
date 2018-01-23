module.exports = function(app) {
    app.get('/users', function(req, res){
        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.list(function(err, result) {
            res.format({
                html: function() {
                    res.render('users/list', {list: result});
                },
                json: function() {
                    res.json(result);
                }
            })
        });
        connection.end();
    });

    app.get('/users/form', function(req, res) {
        res.render("users/form", {validationErrors: {}, user: {}});
    });

    app.post('/users', function(req, res) { 
        var user = req.body;

        req.assert('Email', 'Email is required').notEmpty();
        req.assert('Password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            res.format({
                html: function() {
                    res.status(400).render('users/form', {validationErrors: errors, user: user});
                },
                json: function() {
                    res.status(400).json(errors);
                }
            })
            return;
        }

        user.createdon = new Date();
        var connection = app.infra.connectionFactory;
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.insert(user, function(err, result) {
            console.log('POST Users - Error: ' + err);
            res.redirect('/users');
        });
 
        connection.end();
    });
}
