const express = require("express");
const db = require("./models");

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require("express-handlebars");
var hbsHelpers = exphbs.create({
    helpers: require("./helpers/handlebars.js").helpers,
    defaultLayout: 'main',
});

app.engine("handlebars", hbsHelpers.engine);

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

db.sequelize
  .sync({ force: false })
  .then(function () {
    app.listen(PORT, () => {
      console.log("App listening at http://localhost:" + PORT);
    });
  });

