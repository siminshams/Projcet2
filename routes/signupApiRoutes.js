var models = require("../models");
var passport = require("../config/passport");


module.exports = function(app,passport) { 
app.get("/api/signin",function(req, res){
  res.render("/api/signin")
});

app.post("/api/signup", passport.authenticate("local-signup", {
  successRedirect: "/dashboard",
  failureRedirect: "/api/signup"
}
));

app.get("/api/dashboard", isLoggedIn, function(req, res){
  res.render("dashboard");
});

app.get("/.logout", function(req, res){
  req.session.destroy(function(err){
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) { 
  if (req.isAuthenticated())     
      return next();         
  res.redirect("/api/signin"); 
}
app.post("/signin", passport.authenticate("local-signin", {
  successRedirect: "/",
  failureRedirect: "/api/signin"
}
));

};




