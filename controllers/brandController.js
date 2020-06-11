const Products = require("../models/Product");

module.exports.index_get = async (req, res, next) => {
  res.render("brands/index");
};

module.exports.readProducts = async (req, res, next) => {
  const PRODUCTS = await Products.find({ name: req.body.query });
  res.render("brands/index", { data: PRODUCTS });
};
