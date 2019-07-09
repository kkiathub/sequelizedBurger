const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");
const Burger = db.Burger;

// Create all our routes and set up logic within those routes where required.
function findBurger(o_key, o_by, res) {
  console.log("key : " + o_key + " " + o_by);
  var orderKey = [];
  switch (o_key) {
    case "key_rating":
      orderKey.push("rating");
      break;
    case "key_customer":
      orderKey.push(db.Customer);
    default:
      orderKey.push("name");
      break;
  }

  if (o_by==="key_descending") {
    orderKey.push("DESC");
  }
  console.log(orderKey);
  
  Burger.findAll({
    include: [db.Customer],
    order: [orderKey]
  }).then((data) => {
    // results are available to us inside the .then
    var hbsObject = {
      burgers: data,
      order_key: o_key,
      order_by: o_by
    };

    res.render("index", hbsObject);

  });
}

router.get("/", (req, res) => {
  findBurger("key_burger", "key_ascending", res);
  return;
});

router.get("/:key/:by", (req, res) => {
  console.log(req.params);
  findBurger(req.params.key, req.params.by, res);
  return;
  console.log("param");
  console.log(req.params);
  var orderKey = [];
  switch (req.params.order_key) {
    case "key_rating":
      orderKey.push("rating");
      break;
    case "key_customer":
      orderKey.push(db.Customer);
    default:
      orderKey.push("name");
      break;
  }

  if (req.params.order_by==="key_descending") {
    ordeyKey.push("DESC");
  }
  console.log(orderKey);

  Burger.findAll({
    include: [db.Customer],
    order: [orderKey]
  }).then((data) => {
    // results are available to us inside the .then
    var hbsObject = {
      burgers: data
    };

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
