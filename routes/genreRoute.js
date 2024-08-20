const { Router } = require("express");
const router = Router();

const {
  getGenreController,
  postGenreController,
  getCreateItemController,
  postCreateItemController,
} = require("../controllers/genreController.js");

const deleteItemController = require("../controllers/deleteItemController.js");

const {
  getEditItemController,
  postEditItemController,
} = require("../controllers/editItemController.js");

router.get("/", getGenreController); //displaying the genre
router.post("/", postGenreController); //searching movies in the genre
router.get("/createItem", getCreateItemController); //getting form for item creation in genre
router.post("/createItem", postCreateItemController); //posting form for item creation in database
router.get("/deleteItem", deleteItemController); // deleting a item from the database;
router.get("/editItem", getEditItemController); //getting the edit form for editing the item;
router.post("/editItem", postEditItemController); //handling the submitted edit form

module.exports = router;
