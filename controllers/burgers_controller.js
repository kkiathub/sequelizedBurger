const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");
const Burger = db.Burger;

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
  Burger.create(req.body).then((result) => {
    // `results` here would be the newly created chirp
    res.json(result);

  }).catch(function (err) {
    // handle error;
    res.json({ error: "Burger name can not be empty!" });
  });

});

function upateBurger(burgerData, burger_id, customer_id, res) {

  Burger.update(
    {
      devoured: burgerData.devoured,
      rating: burgerData.rating,
      CustomerId: customer_id
    },
    {
      where: {
        id: burger_id
      }
    })
    .then((result) => {
      res.json(result);
    });
}

router.put("/api/burgers/:id", (req, res) => {
  console.log(req.body);
  // check if customer is already existed .
  db.Customer.findOne({
    where: {
      name: req.body.customer_name
    }
  }).then((result) => {
    if (result) {
      // if this customer exists, just update burger record.
      console.log("customer found!");
      upateBurger(req.body, req.params.id, result.id, res);


    } else {
      // new customer , create first.
      db.Customer.create(
        { name: req.body.customer_name }
      ).then((createResult) => {
        console.log("customer created!");
        upateBurger(req.body, req.params.id, createResult.id, res);

      });
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
