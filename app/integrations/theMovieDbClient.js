var http = require("https");
var underscore = require("underscore");

function theMovieDbClient() {
}

theMovieDbClient.prototype.getMoviesByGenres = function(genres, callback) {
    getGenres(function(err, result) { 
        var genresIds = getGenresIds(result.genres, genres);
        getMovies(genresIds, function(err, result) {
            return callback(null, result);
        });
    });
}

function getGenresIds(allGenres, genres) {
    var genresIds = [];
    for(i in genres){
        var completeGenre = underscore.where(allGenres, {name: genres[i].name});
        genresIds.push(underscore.pluck(completeGenre, 'id'));
    }
    return genresIds;
}

function getGenres(callback) {
    var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/genre/movie/list?language=en-US&api_key=bfcfc7229cafa99bb674a125fbad0bf0",
        "headers": {}
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          return callback(null, JSON.parse(body));  
        });
      });
      
      req.write("{}");
      req.end();
}

function getMovies(genres, callback) {
    var options = {
        "method": "GET",
        "hostname": "api.themoviedb.org",
        "port": null,
        "path": "/3/discover/movie?with_genres=" + genres + "&page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=pt-BR&api_key=bfcfc7229cafa99bb674a125fbad0bf0",
        "headers": {}
      };
      
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function () {
          var body = Buffer.concat(chunks);
          return callback(null, JSON.parse(body));
        });
      });
      
      req.write("{}");
      req.end();
}

module.exports = function() {
    return theMovieDbClient;
}