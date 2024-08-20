const queries = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

const getCreateGenreController = (req, res) => {
  let categoryId = req.query["categoryId"];
  res.render("createGenreForm", {
    categoryId,
    categoryName: req.query["categoryName"],
  });
};

const validateResult = [
  body("genre-name")
    .trim()
    .notEmpty()
    .withMessage("Genre name cannot be empty")
    .isAlpha("en-US", { ignore: [" ", "-"] })
    .withMessage("Genre name should only contain alphabets and hyphens"),
];

const postCreateGenreController = [
  validateResult,
  async function (req, res) {
    let errors = validationResult(req).errors;
    if (errors.length === 0) {
      await queries.insertGenre(
        req.query["categoryId"],
        req.body["genre-name"]
      );
      res.redirect(
        `/category?categoryId=${req.query["categoryId"]}&categoryName=${req.query["categoryName"]}`
      );
    }
    res.render("createGenreForm", {
      errors,
      categoryId: req.query["categoryId"],
      categoryName: req.query["categoryName"],
    });
  },
];

module.exports = {
  getCreateGenreController,
  postCreateGenreController,
};
