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
               
        console.log(req.body);

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
