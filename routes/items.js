const express = require("express");
const router = new express.Router();

let nextId = 6;

const items = [
  {
    id: 1,
    product: 'orange',
    price: '$5'
  },
  {
    id: 2,
    product: 'milk',
    price: '$1000'
  },
  {
    id: 3,
    product: 'sheep',
    price: '$2'
  },
  {
    id: 4,
    product: 'chainsaw',
    price: '$0.50'
  },
  {
    id: 5,
    product: 'juan',
    price: '$0.25'
  },
];

/** GET /items: render list of shopping items */

router.get("", (req, res) => {
  return res.json(items);
});

/** POST /items: append shopping items with form data */

router.post("", (req, res) => {
  newProduct = req.body.newproduct;
  newProductPrice = req.body.price;
  items.push({ id: nextId, product: newProduct, price: newProductPrice });
  nextId++;
  return res.redirect('/items');
});

/** GET /items/:id: render product name and price */

router.get("/:id", (req, res) => {
  const index = items.findIndex(item => item.id === +req.params.id)
  return res.json(items[index]);
});

/** PATCH /items/[id]: patch item, return modified item */

router.patch("/:id", (req, res) => {
  const index = items.findIndex(item => item.id === +req.params.id)
  items[index].product = req.body.editproduct || items[index].product;
  items[index].price = req.body.editprice || items[index].price;
  return res.json(items[index]);
});


/** DELETE /items/[id]: delete item, return status */

router.delete("/:id", (req, res) => {
  const index = items.findIndex(item => item.id === +req.params.id)
  items.splice(index, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;