const queries = require("../db/queries.js");

const indexController = async (req, res) => {
  let categories = await queries.getCategories();
  res.render("index", { categories });
};

module.exports = indexController;
