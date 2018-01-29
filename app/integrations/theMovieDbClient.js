var http = require("https");
var _ = require("underscore");
var Q = require('q');
var api_key = "bfcfc7229cafa99bb674a125fbad0bf0";

function theMovieDbClient() {
}

theMovieDbClient.prototype.getGenres = function() {
    var deferred = Q.defer();
    var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/genre/movie/list?language=en-US&api_key=" + api_key,
        "headers": {}
    };
      
    var req = http.request(options, function (res) {
    var chunks = [];
    
    res.on("data", function (chunk) {
        chunks.push(chunk);
    });
    
    res.on("end", function () {
        var body = Buffer.concat(chunks);
        deferred.resolve(JSON.parse(body));
    });
    });
      
    req.write("{}");
    req.end();
    return deferred.promise;
}

theMovieDbClient.prototype.getMovies = function(preferences) {
    var deferred = Q.defer();
    var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/discover/movie?" + 
        "with_genres=" + preferences.with_genres +
        //"&vote_average.lte=" + preferences.vote_average_lte +
        //"&vote_average.gte=" + preferences.vote_average_gte +
        //"&vote_count.lte=" + preferences.vote_count_lte +
        //"&vote_count.gte=" + preferences.vote_count_gte +
        //"&primary_release_year=" + preferences.primary_release_year +
        "&page=" + preferences.page +
        "&include_video=" + preferences.include_video +
        "&include_adult=" + preferences.include_adult +
        "&sort_by=" + preferences.sort_by +
        "&language=pt-BR&api_key=" + api_key,
        "headers": {}
    };
          
    var req = http.request(options, function (res) {
        var chunks = [];
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        
        res.on("end", function () {
            var body = Buffer.concat(chunks);
            deferred.resolve(JSON.parse(body));
        });
    });
    
    req.write("{}");
    req.end();
    return deferred.promise;
}

module.exports = function() {
    return theMovieDbClient;
}