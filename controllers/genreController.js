const queries = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

const getGenreController = async (req, res) => {
  let movies = await queries.getMovies(req.query["genreId"]);
  res.render("genre", {
    title: req.query["genreName"],
    categoryName: req.query["categoryName"],
    genreId: req.query["genreId"],
    categoryId: req.query["categoryId"],
    movies,
    searchValue: "",
  });
};
const postGenreController = async (req, res) => {
  let searchQuery = req.body["movie"];
  let movies = await queries.searchMovies(req.query["genreId"], searchQuery);
  res.render("genre", {
    title: req.query["genreName"],
    categoryName: req.query["categoryName"],
    genreId: req.query["genreId"],
    movies,
    categoryId: req.query["categoryId"],
    searchValue: searchQuery,
  });
};

const getCreateItemController = async (req, res) => {
  let genreId = req.query["genreId"];
  let categoryName = req.query["categoryName"];
  let genreName = req.query["genreName"];
  let categoryId = req.query["categoryId"];
  console.log(genreId, categoryId);
  res.render("createItemForm", {
    genreId,
    categoryName,
    genreName,
    categoryId,
  });
};

const validateInput = [
  body("item-name").trim().notEmpty().withMessage("Name cannot be empty"),
  body("item-description")
    .optional({ checkFalsy: true })
    .isLength({ min: 10, max: 50 })
    .withMessage(
      "Description should be between 10 and 50 characters if present"
    ),
];

const postCreateItemController = [
  validateInput,
  async function (req, res) {
    let errors = validationResult(req).errors;
    let genreId = req.query["genreId"];
    let categoryName = req.query["categoryName"];
    let categoryId = req.query["categoryId"];
    let genreName = req.query["genreName"];
    if (errors.length === 0) {
      queries.insertMovie(
        genreId,
        req.body["item-name"],
        req.body["item-description"]
      );
      res.redirect(
        `/category/genre?genreId=${genreId}&categoryName=${categoryName}&genreName=${genreName}&categoryId=${categoryId}`
      );
    } else {
      res.render("createItemForm", {
        categoryName,
        genreId,
        genreName,
        categoryId,
        errors,
      });
    }
  },
];

module.exports = {
  getGenreController,
  postGenreController,
  getCreateItemController,
  postCreateItemController,
};
