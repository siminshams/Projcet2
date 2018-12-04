var models = require("../models");
var passport = require("passport");


module.exports = function(app) {


 // GET route for getting all of the lists
 app.get("/api/lists", function(req, res) {
  // findAll returns all entries for a table when used with no options
     models.List.findAll({}).then(function(modelsList) {
    // We have access to the lists as an argument inside of the callback function
    res.json(modelsList);
  });
});

// POST route for saving a new list
app.post("/api/lists", function(req, res) {
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property (req.body)
models.List.create({
    text: req.body.text,
    complete: req.body.complete
  }).then(function(modelsList) {
    // We have access to the new list as an argument inside of the callback function
    res.json(modelsList);
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

// DELETE route for deleting lists. We can get the id of the list to be deleted from
// req.params.id
app.delete("/api/lists/:id", function(req, res) {
  // We just have to specify which list we want to destroy with "where"
models.List.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(modelsList) {
    res.json(modelsList);
  });

});

// PUT route for updating lists. We can get the updated list data from req.body
app.put("/api/lists", function(req, res) {

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

};




