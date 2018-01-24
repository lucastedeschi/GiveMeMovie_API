var http = require('http');

var configurations = {
    hostname: 'localhost',
    port: 3000,
    path: '/users/update',
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
    id: 9,
    email: 'updated@test.com',
    password: '12345689'
}

client.end(JSON.stringify(user));