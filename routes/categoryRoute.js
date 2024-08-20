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
const deleteGenreController = require("../controllers/deleteGenreController.js");
const {
  getEditGenreController,
  postEditGenreController,
} = require("../controllers/editGenreController.js");

router.get("/", getCategoryController);
router.post("/", postCategoryController);
router.get("/createGenre", getCreateGenreController);
router.post("/createGenre", postCreateGenreController);
router.get("/deleteGenre", deleteGenreController);
router.get("/editGenre", getEditGenreController);
router.post("/editGenre", postEditGenreController);

module.exports = router;
