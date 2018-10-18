const express = require("express");

const app = new express();
const itemRoutes = require("./routes/items");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemRoutes);

/** 404 handler -- passes to error handler, below */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;