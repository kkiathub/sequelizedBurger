const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");
const Burger = db.burger;

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
  Burger.findAll({}).then((data) => {
    // results are available to us inside the .then
    var hbsObject = {
      burgers: data
    };
    // console.log(hbsObject);

    res.render("index", hbsObject);

  });
});

router.post("/api/burgers", (req, res) => {
  console.log(req.body);
  Burger.create(req.body).then((result) => {
    // `results` here would be the newly created chirp
    // res.json(results);
    res.json({ id: result.insertId });

  });
});

router.put("/api/burgers/:id", (req, res) => {

  Burger.update(
    { devoured: req.body.devoured },
    {
      where: {
        id: req.params.id
      }
    })
    .then((result) => {
      res.json(result);
    });

});

// Export routes for server.js to use.
module.exports = router;
