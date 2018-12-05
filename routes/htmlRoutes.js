var db = require("../models");

module.exports = function(app) {

  app.get("/signin", function(req, res) {
    res.render("signin");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("*", function(req, res) {
    res.render("404");
  });

};