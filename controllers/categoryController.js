const queries = require("../db/queries.js");

const getCategoryController = async (req, res) => {
  let categoryId = req.query["categoryId"];
  let genres = await queries.getGenres(categoryId);
  res.render("category", {
    genres,
    title: req.query["categoryName"],
    categoryId,
    searchValue: "",
  });
};

const postCategoryController = async (req, res) => {
  let categoryId = req.query["categoryId"];
  let resultGenres = await queries.searchGenres(categoryId, req.body["genre"]);
  console.log(resultGenres);
  res.render("category", {
    title: req.query["categoryName"],
    genres: resultGenres,
    categoryId,
    searchValue: req.body["genre"],
  });
};

module.exports = {
  getCategoryController,
  postCategoryController,
};
