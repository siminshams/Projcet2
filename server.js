require("dotenv").config();
var express = require("express");
var app = express();
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require("express-session");
var models = require("./models");

var PORT = process.env.PORT || 3000;
var env = require("dotenv").load();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// For Passport
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/passportApiRoutes.js")(app, passport);
require("./routes/TMDbApiRoutes.js")(app, passport);
require("./config/passport.js")(passport, models.user);
require("./routes/htmlRoutes.js")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;