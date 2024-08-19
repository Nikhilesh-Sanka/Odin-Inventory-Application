const { Router } = require("express");
const router = Router();

const indexController = require("../controllers/indexController.js");

router.get("/", indexController);

module.exports = router;
