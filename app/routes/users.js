module.exports = function(app) {
    app.get('/users', function(req, res, next){
        var connection = app.infra.connectionFactory();
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.list(function(err, result) {
            if(err) {
                return next(err);
            }
            res.format({
                json: function() {
                    res.json(result);
                }
            })
        });

        connection.end();
    });

    app.get('/users/:userId', function(req, res, next) { 
        var userId = req.params.userId;

        var connection = app.infra.connectionFactory();
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.getById(userId, function(err, result) {
            if(err){
                return next(err);
            }
            res.format({
                json: function() {
                    res.json(result);
                }
            })
        });

        connection.end();
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
            res.format({
                json: function() {
                    res.json(result);
                }
            })
        });

        connection.end();
    });

    app.post('/users/update', function(req, res, next) { 
        var user = req.body;

        var connection = app.infra.connectionFactory();
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.update(user, function(err, result) {
            if(err){
                return next(err);
            }
            res.format({
                json: function() {
                    res.json(result);
                }
            })
        });

        connection.end();
    });

    app.get('/users/delete/:userId', function(req, res, next) { 
        var userId = req.params.userId;

        var connection = app.infra.connectionFactory();
        var usersDAO = new app.infra.usersDAO(connection);

        usersDAO.delete(userId, function(err, result) {
            if(err){
                return next(err);
            }
            res.format({
                json: function() {
                    res.json(result);
                }
            })
        });

        connection.end();
    });
}
