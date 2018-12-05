var models = require("../models");
var passport = require("../config/passport");

module.exports = function(app, passport) { 

  function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated())     
      return next();         
    res.redirect("/signin"); 
  }

  app.get("/signin", function(req, res) {
    res.render("signin");
  });

  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/signin"
  }));

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup"
  }));

  app.get("/signout", function(req, res) {
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  app.get("/user", isLoggedIn, function(req, res){
    res.render("index");
  });

};