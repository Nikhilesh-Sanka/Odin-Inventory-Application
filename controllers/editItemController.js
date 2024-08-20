const queries = require("../db/queries");
const { body, validationResult } = require("express-validator");

const getEditItemController = async (req, res) => {
  let itemId = req.query["itemId"];
  let genreName = req.query["genreName"];
  let genreId = req.query["genreId"];
  let categoryName = req.query["categoryName"];
  let movie = await queries.getMovie(itemId);
  let categoryId = req.query["categoryId"];
  res.render("editItemForm", {
    itemId,
    genreName,
    genreId,
    categoryName,
    movie,
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
const postEditItemController = [
  validateInput,
  async function (req, res) {
    let errors = validationResult(req).errors;
    let itemId = req.query["itemId"];
    let genreName = req.query["genreName"];
    let genreId = req.query["genreId"];
    let categoryName = req.query["categoryName"];
    let categoryId = req.query["categoryId"];
    if (errors.length === 0) {
      await queries.updateMovie(
        itemId,
        genreId,
        req.body["item-name"],
        req.body["item-description"]
      );
      res.redirect(
        `/category/genre?genreName=${genreName}&genreId=${genreId}&categoryName=${categoryName}&categoryId=${categoryId}`
      );
      return;
    }
    let movie = await queries.getMovie(itemId);
    res.render("editItemForm", {
      itemId,
      genreName,
      genreId,
      categoryName,
      errors,
      categoryId,
      movie,
      nameValue: req.body["item-name"],
      descriptionValue: req.body["item-description"],
    });
  },
];

module.exports = { getEditItemController, postEditItemController };
