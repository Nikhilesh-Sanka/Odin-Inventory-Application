const queries = require("../db/queries.js");
const { body, validationResult } = require("express-validator");

const getCreateGenreController = (req, res) => {
  let categoryId = req.query["categoryId"];
  res.render("createGenreForm", { categoryId });
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
      let result = await queries.insertGenre(
        req.query["categoryId"],
        req.body["genre-name"]
      );
      res.send(`Result: ${result}`);
    }
    res.send("Enter valid name");
  },
];

module.exports = {
  getCreateGenreController,
  postCreateGenreController,
};
