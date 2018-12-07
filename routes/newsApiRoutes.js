// var request = require("request");
// require("dotenv").config();
// var env = require("dotenv").load();
// var keys = require("../config/keys");


//     var api_key = keys.NEWS.api_key;
//     var newsurl = "https://newsapi.org/v2/everything?q=movie&from=2018&to=2018&sortBy=relevancy&language=en&apiKey=" + api_key;


//     module.exports = function (app) {
//         app.get("/", function (req, res) {
//             request(newsurl, {json:true},function (error, response, body) {
//             //console.log(body);
//             if (error) {
//                  return console.log(error);
//             }
//                 //res.json(body);
//                 res.render("index", {
//                     newsResults: newsResults,
//                     authenticated: req.isAuthenticated()
//                 })
//             });
//         });
//     };

