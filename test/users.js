var express = require('../config/express')();
var request = require('supertest')(express);

describe('#UsersRoutes', function() {
    it('#List', function(done){
        request.get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
}) 
