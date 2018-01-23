var express = require('../config/express')();
var request = require('supertest')(express);

describe('#UsersRoutes', function() {
    it('#Listagem de usuários', function(done){
        request.get('/users')
        .set('Accept', 'application/json')
        .expect(200, done);
    })

    it('#Cadastro de usuário com dados inválidos', function(done){
        request.post('/users')
        .send({email:'', password:''})
        .expect(400, done);
    })

    it('#Cadastro de usuário com dados válidos', function(done){
        request.post('/users')
        .send({
            email: 'clientSimulator@test.com',
            password: '123456'
        })
        .expect(302, done);
    })
}) 
