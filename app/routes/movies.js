module.exports = function(app){
    app.post('/movies/suggestions', function(req, res, next) {
        //receber do rubs: diretores, generos, atores
        var genres = req.body.genres;
        var actors = req.body.actors;
        var directors = req.body.directors;

        var theMovieDbClient = new app.integrations.theMovieDbClient();

        theMovieDbClient.getMoviesByGenres(genres, function(err, result) { 
            res.json(result);
        });
        //buscar filmes q tenham os generos e gerar lista
        //buscar na lista os q tenham os atores, ou pelo menos um deles
        //buscar na lista os q sejam daquele diretor

        //sempre ordenando por popularidade
        
        //buscar Data de lançamento
        
        //buscar Base local 
    });
}