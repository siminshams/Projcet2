var models = require("../models");
var passport = require("passport");


module.exports = function(app,passport) {
//   // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

//   // Create a new example
//   app.post("/api/examples", function(req, res) {
//     db.Example.create(req.body).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });

// };

app.get('/', function(req, res) { 
  res.send('Welcome to Passport with Sequelize');
});

app.get("/signup",function(req, res){
  res.render("signup")
});

app.get("/signin",function(req, res){
  res.render("signin")
});

app.post("/signup", passport.authenticate("local-signup", {
  successRedirect: "/dashboard",
  failureRedirect: "/signup"
}
));

app.get("/dashboard", isLoggedIn, function(req, res){
  res.render("dashboard");
});

app.get("/logout", function(req, res){
  req.session.destroy(function(err){
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) { 
  if (req.isAuthenticated())     
      return next();         
  res.redirect("/signin"); 
}
app.post("/signin", passport.authenticate("local-signin", {
  successRedirect: "/dashboard",
  failureRedirect: "/signin"
}
));

};




