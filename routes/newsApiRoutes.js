var request = require("request");
require("dotenv").config();
var env = require("dotenv").load();
var keys = require("../config/keys");

var NewsUrl = function () {
    var api_key = keys.NEWS.api_key;
    var baseUrl = "https://newsapi.org/v2/everything";
    var baseParameters = "q='movie'AND -rent&from=2018&to=2018&sortBy=relevancy&language=en&" + api_key;
    return baseUrl + baseParameters;
};

module.exports = function (app) {
    app.get("/api/news", function (req, res) {
        var url = NewsUrl();
        request(url, function (err, result, body) {

            if (err) { return console.log(err); }
            var response = JSON.parse(body);
            res.json(response);
            console.log(res);
        })
    })
};
