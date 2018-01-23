var http = require('http');

describe('#UsersRoutes', function() {
    it('#List', function(done){
        var configurations = {
            hostname: 'localhost',
            port: 3000,
            path: '/users',
            headers: {
                'Accept': 'application/json'
            }
        }
        
        http.get(configurations, function(res){
            assert.Equal(res.statusCode, 200);
            assert.Equal(res.headers['content-type'], 'application/json; charset=UTF-8');
            done();
        })
    })
}) 
