var mongoose = require('mongoose');
var User = require('../infra/schemas/user')();

module.exports = function(app) {
    app.get('/users', function(req, res){
        app.infra.connectionFactory();         

        User.find({}, function(err, users) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(users);
            }
        });
    });

    app.get('/users/:email', function(req, res) { 
        var reqEmail = req.params.email;
        app.infra.connectionFactory();         

        User.find({email: reqEmail}, function(err, users) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(users);
            }
        });
    });

    app.post('/users', function(req, res) { 
        app.infra.connectionFactory();  

        var newUser = new User({
            name: req.body.name,
            birth: req.body.birth,
            sex: req.body.sex,
            email: req.body.email,
            password: req.body.password,
            pictureUrl: req.body.pictureUrl
        });

        newUser.save(function(err) {
            if (err) {
                res.status(400).send(err);
            } else {          
                res.status(201).send();
            }
        });
    });

    app.post('/users/update', function(req, res) { 
        app.infra.connectionFactory();  
           
        User.findOneAndUpdate({ email: req.body.email }, { 
            name: req.body.name,
            birth: req.body.birth,
            sex: req.body.sex,
            pictureUrl: req.body.pictureUrl,
            updatedOn: Date.now()
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        });
    });

    app.post('/users/updatePassword', function(req, res) { 
        app.infra.connectionFactory();  
           
        User.findOneAndUpdate({ email: req.body.email }, { 
            password: req.body.password,
            updatedOn: Date.now
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        });
    });

    app.post('/users/movies/pushWatched', function(req, res) {
        app.infra.connectionFactory();

        User.update({'email': req.body.email }, {
           $push: {'movies.watched': req.body.movie }
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        })
    });

    app.post('/users/movies/setWatched', function(req, res) {
        app.infra.connectionFactory();

        User.update({'email': req.body.email, 'movies.watched': {'id': req.body.movie.id } }, {
           $set: {'movies.watched': {'rate': req.body.movie.rate } }
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        })
    });

    app.post('/users/movies/pullWatched', function(req, res) {
        app.infra.connectionFactory();

        User.update({'email': req.body.email}, {
           $pull: {'movies.watched': {'id': req.body.movie.id} }
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        })
    });

    app.post('/users/movies/pushWatchLater', function(req, res) {
        app.infra.connectionFactory();

        User.update({'email': req.body.email }, {
           $push: {'movies.watchLater': req.body.movie }
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        })
    });

    app.post('/users/movies/pullWatchLater', function(req, res) {
        app.infra.connectionFactory();

        User.update({'email': req.body.email}, {
           $pull: {'movies.watchLater': {'id': req.body.movie.id} }
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        })
    });

    app.post('/users/movies/pushBlacklist', function(req, res) {
        app.infra.connectionFactory();

        User.update({email: req.body.email }, {
           $push: {"movies.blacklist": req.body.movie }
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        })
    });

    app.post('/users/movies/pullBlacklist', function(req, res) {
        app.infra.connectionFactory();

        User.update({'email': req.body.email}, {
           $pull: {'movies.blacklist': {'id': req.body.movie.id} }
        }, function(err, user) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        })
    });

    app.post('/users/delete', function(req, res) { 
        app.infra.connectionFactory();  
           
        User.findOneAndRemove({ email: req.body.email, password: req.body.password }, function(err) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(user);
            }
        });
    });
}
