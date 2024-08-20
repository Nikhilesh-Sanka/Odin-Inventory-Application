const queries = require("../db/queries.js");

const deleteItemController = async (req, res) => {
  let itemId = req.query["itemId"];
  let genreName = req.query["genreName"];
  let categoryName = req.query["categoryName"];
  let genreId = req.query["genreId"];
  let categoryId = req.query["categoryId"];
  await queries.deleteMovie(itemId);
  res.redirect(
    `/category/genre?genreId=${genreId}&categoryName=${categoryName}&genreName=${genreName}&categoryId=${categoryId}`
  );
};

module.exports = deleteItemController;
