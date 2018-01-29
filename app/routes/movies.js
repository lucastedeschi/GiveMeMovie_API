var _ = require("underscore");
var Q = require('q');
var async = require('async');
var mongoose = require('mongoose');
var User = require('../infra/schemas/user')();

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
            return filterMoviesByUserLists(movies, req.body.userEmail);
        }).then(function(moviesFiltered) {
            res.json(moviesFiltered);
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

        function filterMoviesByUserLists(movies, userEmail, request) {
            var deferred = Q.defer();
            app.infra.connectionFactory();
            
            User.find({email: userEmail}, function(err, user) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    var watched = user[0].movies.watched;
                    var watchLater = user[0].movies.watchLater;
                    var blacklist = user[0].movies.blacklist;

                    var moviesToRemove = [];

                    async.eachSeries(movies.results, function(movie, callback) {
                        existsMovieIdInList(movie.id, watched)
                        .then(function(existsWatched) {
                            if(existsWatched) {
                                moviesToRemove.push(movie.id);
                                console.log(movie.id);
                                callback();
                            }
                            return existsMovieIdInList(movie.id, watchLater)
                        }).then(function(existsWatchLater) {
                            if(existsWatchLater) {
                                moviesToRemove.push(movie.id);
                                console.log(movie.id);
                                callback();
                            }
                            return existsMovieIdInList(movie.id, blacklist)
                        }).then(function(existsBlacklist) {
                            if(existsBlacklist) {
                                moviesToRemove.push(movie.id);
                                console.log(movie.id);
                                callback();
                            }
                        });
                        callback();
                    });
                }
            });

            deferred.resolve(movies);
            return deferred.promise;
        };

        function existsMovieIdInList(movieId, list) {
            var deferred = Q.defer();

            async.eachSeries(list, function(movie, callback) {
                if(movie.id == movieId) {
                    deferred.resolve(true);
                    return deferred.promise;
                }
                callback(null);
            });

            deferred.resolve(false);
            return deferred.promise;
        }
    });
}