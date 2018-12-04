var request = require("request");
require("dotenv").config();
var env = require("dotenv").load();
var keys = require("../config/keys");

module.exports = function(app) {
  var api_key = keys.TMDb.api_key;
  var baseUrl = "https://api.themoviedb.org/3/";
  var baseParameters = "?language=en-US&include_video=false&include_adult=false&api_key=" + api_key;

  app.get("/", function(req, res) {
    var url = baseUrl + "discover/movie" + baseParameters;
    url += "&page=1&sort_by=popularity.desc";
    request(url, function(error, result, body) {
      if (error) { return console.log(error); }
      var response = JSON.parse(body);
      var popularMovies = response.results;
      var posters = [];
      popularMovies.forEach(function(item, index) {
        var posterUrl = "https://image.tmdb.org/t/p/w92" + item.poster_path;
        posters.push(posterUrl);
      });
      res.render("index", {
        posters: posters
      });
    });
  });

  app.post("/api/search", function(req, res) {
    var url = baseUrl + "search/movie" + baseParameters;
    url += "&query=" + encodeURI(req.body.query);
    request(url, function(error, result, body) {
      if (error) { return console.log(error); }
      var response = JSON.parse(body);
      var searchResults = response.results;
      res.json(searchResults);
    });
  });

}