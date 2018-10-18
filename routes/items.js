const express = require("express");
const router = new express.Router();
const Product = require("../productClass");

const file = 'items.json'

let nextId = 6;

// let items = JSON.parse(read(file));

/** GET /items: render list of shopping items */

router.get("", async (req, res) => {
  return res.json(await Product.getAllProducts());
});

/** POST /items: append shopping items with form data */

router.post("", (req, res) => {
  let productName = req.body.productname;
  let productPrice = req.body.price;
  let newProduct = Product.addProduct(productName, productPrice);
  return res.redirect('/items');
});

/** GET /items/:id: render product name and price */

router.get("/:id", async (req, res) => {
  let item = await Product.getProduct(+req.params.id);
  return res.json(item);
});

/** PATCH /items/[id]: patch item, return modified item */

router.patch("/:id", async (req, res) => {
  let items = await Product.getAllProducts();
  const index = items.findIndex(item => item.id === +req.params.id)
  items[index].product = req.body.editproduct || items[index].product;
  items[index].price = req.body.editprice || items[index].price;
  await Product._write(JSON.stringify(items), file);
  return res.json(items[index]);
});


/** DELETE /items/[id]: delete item, return status */

router.delete("/:id", async (req, res) => {
  let items = await Product.getAllProducts();
  const index = items.findIndex(item => item.id === +req.params.id)
  items.splice(index, 1);
  await Product._write(JSON.stringify(items), file);
  return res.json({ message: "Deleted" });
});


module.exports = router;