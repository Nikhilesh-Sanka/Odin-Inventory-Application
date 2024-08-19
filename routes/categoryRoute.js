const { Router } = require("express");
const router = Router();

const {
  getCategoryController,
  postCategoryController,
} = require("../controllers/categoryController.js");
const {
  getCreateGenreController,
  postCreateGenreController,
} = require("../controllers/createGenreController.js");

router.get("/", getCategoryController);
router.post("/", postCategoryController);
router.get("/createGenre", getCreateGenreController);
router.post("/createGenre", postCreateGenreController);

module.exports = router;
