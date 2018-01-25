var http = require('http');

var configurations = {
    hostname: 'localhost',
    port: 3000,
    path: '/users/delete/1',
    headers: {
        'Accept': 'application/json'
    }
}

http.get(configurations, function(res){
    console.log('Status: ' + res.statusCode);
    res.on('data', function(body){
        console.log('Body: ' + body);
    })
})
