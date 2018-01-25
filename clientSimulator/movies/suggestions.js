var http = require('http');

var configurations = {
    hostname: 'localhost',
    port: 3000,
    path: '/movies/suggestions',
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

var request = {
    genres: [{
        name: 'Action'
    }, {
        name: 'Comedy'
    }, {
        name: 'Horror'
    }],
    actors: [{
        name: 'Andree Maranda'
    } , {
        name: 'Mitch Cohen'
    }],
    directors: [{
        name: 'Michael Herz'
    }]
}

console.log(request);

client.end(JSON.stringify(request));