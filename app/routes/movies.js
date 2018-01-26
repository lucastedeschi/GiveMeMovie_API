var _ = require("underscore");
var Q = require('q');
var async = require('async');

module.exports = function(app){
    app.post('/movies/suggestions', function(req, res, next) {
        var request = req.body;
        console.log(request);
        
        var theMovieDbClient = new app.integrations.theMovieDbClient();

        // Fluxo para gerar lista de filmes
        theMovieDbClient.getGenres()
        .then(function(getGenresRes) {
            return filterGenresByRequest(getGenresRes, request);
        }).then(function(filteredGenresIds) {
            var preferences = {
                //vote_average_lte: "",
                //vote_average_gte: "",
                //vote_count_lte: "",
                //primary_release_year: "",
                page: 1,
                include_video: false,
                include_adult: false,
                sort_by: "popularity.desc",
                with_genres: filteredGenresIds
            };
            return theMovieDbClient.getMovies(preferences);
        }).then(function(movies) {
            res.json(movies);
        });

        // Funções auxiliares
        function filterGenresByRequest(allGenres, request) {
            var deferred = Q.defer();
            var filteredGenres = [];

            async.eachSeries(request.genres, function(genre, callback) {
                var genreId = _.find(allGenres.genres, function(element) { 
                    return element.name === genre}).id;
                filteredGenres.push(genreId);
                callback(null);
            });

            deferred.resolve(filteredGenres);
            return deferred.promise;
        }

    });
}