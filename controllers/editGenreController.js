const queries = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

const getEditGenreController = async (req, res) => {
  let categoryName = req.query["categoryName"];
  let categoryId = req.query["categoryId"];
  let genreId = req.query["genreId"];
  let genre = await queries.getGenre(genreId);
  res.render("editGenreForm", { categoryName, categoryId, genreId, genre });
};

const validateInput = [
  body("genre-name")
    .trim()
    .notEmpty()
    .withMessage("Genre name cannot be empty")
    .isAlpha("en-US", { ignore: [" ", "-"] })
    .withMessage("Genre name should only contain alphabets and hyphens"),
];

const postEditGenreController = [
  validateInput,
  async function (req, res) {
    let errors = validationResult(req).errors;
    let genreId = req.query["genreId"];
    let categoryId = req.query["categoryId"];
    let categoryName = req.query["categoryName"];
    if (errors.length === 0) {
      await queries.editGenre(genreId, categoryId, req.body["genre-name"]);
      res.redirect(
        `/category?categoryName=${categoryName}&genreId=${genreId}&categoryId=${categoryId}`
      );
      return;
    }
    let genre = queries.getGenre(genreId);
    res.render("editGenreForm", {
      genreId,
      genre,
      categoryId,
      categoryName,
      errors,
      nameValue: req.body["genre-name"],
    });
  },
];

module.exports = { getEditGenreController, postEditGenreController };
