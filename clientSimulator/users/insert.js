var http = require('http');

var configurations = {
    hostname: 'localhost',
    port: 3000,
    path: '/users',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
}

var client = http.request(configurations, function(res){
    console.log('Status: ' + res.statusCode);
    res.on('data', function(body){
        console.log('Body: ' + body);
    })
})

var user = {
    email: 'clientSimulator@test.com',
    password: '123456'
}

client.end(JSON.stringify(user));