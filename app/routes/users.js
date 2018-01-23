module.exports = function(app) {
    
    var listUsers = function(req, res, next){
        var connection = app.infra.connectionFactory();
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.list(function(err, result) {
            if(err) {
                return next(err);
            }
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
    };

    app.get('/users', listUsers);

    app.get('/users/form', function(req, res) {
        res.render("users/form", {validationErrors: {}, user: {}});
    });

    app.post('/users', function(req, res, next) { 
        var user = req.body;
        
        //req.assert('Email', 'Email is required').notEmpty();
        //req.assert('Password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            res.format({
                html: function() {
                    res.status(400).render('users/form', {validationErrors: errors, user: user});
                },
                json: function() {
                    res.status(400).json(errors);
                }
            });

            return;
        }

        user.createdon = new Date();

        var connection = app.infra.connectionFactory();
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.insert(user, function(err, result) {
            if(err){
                return next(err);
            }
            res.redirect('/users');
        });

        connection.end();
    });
}
