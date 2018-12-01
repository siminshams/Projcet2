var models = require("../models");
var passport = require("passport");


module.exports = function(app,passport) {


 // GET route for getting all of the todos
 app.get("/api/list", function(req, res) {
  // findAll returns all entries for a table when used with no options
     models.List.findAll({}).then(function(modelsList) {
    // We have access to the todos as an argument inside of the callback function
    res.json(modelsList);
  });
});

// POST route for saving a new todo
app.post("/api/list", function(req, res) {
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property (req.body)
models.List.create({
    text: req.body.text,
    complete: req.body.complete
  }).then(function(modelsList) {
    // We have access to the new todo as an argument inside of the callback function
    res.json(modelsList);
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

// DELETE route for deleting todos. We can get the id of the todo to be deleted from
// req.params.id
app.delete("/api/list/:id", function(req, res) {
  // We just have to specify which todo we want to destroy with "where"
models.List.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(modelsList) {
    res.json(modelsList);
  });

});

// PUT route for updating todos. We can get the updated todo data from req.body
app.put("/api/list", function(req, res) {

  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
models.List.update({
    text: req.body.text,
    complete: req.body.complete
  }, {
    where: {
      id: req.body.id
    }
  }).then(function(modelsList) {
    res.json(modelsList);
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});


// app.post("/api/signup",function(req, res){
//   console.log(req.body);
// });

app.get("/api/signin",function(req, res){
  res.render("signin")
});

app.post("/api/signup", passport.authenticate("local-signup", {
  successRedirect: "/",
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




