var models = require("../models");
// var passport = require("passport");


module.exports = function(app) {



 app.get("/api/lists", function(req, res) {

     models.List.findAll({}).then(function(modelsList) {

    res.json(modelsList);
  });
});


app.post("/api/lists", function(req, res) {

models.List.create({
    text: req.body.text,
    complete: req.body.complete
  }).then(function(modelsList) {
   
    res.json(modelsList);
  })
    .catch(function(err) {

      res.json(err);
    });
});

app.delete("/api/lists/:id", function(req, res) {
  
models.List.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(modelsList) {
    res.json(modelsList);
  });

});

app.put("/api/lists", function(req, res) {


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

      res.json(err);
    });
});

};




