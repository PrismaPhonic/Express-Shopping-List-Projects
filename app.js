const express = require("express");

const app = new express();
const itemRoutes = require("./routes/items");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemRoutes);

module.exports = app;