var request = require("request");
require("dotenv").config();
var env = require("dotenv").load();
var keys = require("../config/keys");

module.exports = function(app) {

  app.get("/api/trending", function(req, res) {
    var api_key = keys.TMDb.api_key;
    var url = "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=" + api_key;

    request(url, function(error, result, body) {
      if (error) { return console.log(error); }
      var response = JSON.parse(body);
      res.send(response.results);
    });
  });

}