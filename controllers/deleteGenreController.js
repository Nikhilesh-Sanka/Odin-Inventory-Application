const queries = require("../db/queries.js");

const deleteGenreController = async (req, res) => {
  let genreId = req.query["genreId"];
  let categoryId = req.query["categoryId"];
  let categoryName = req.query["categoryName"];
  await queries.deleteGenre(genreId);
  res.redirect(
    `/category?categoryId=${categoryId}&categoryName=${categoryName}`
  );
};

module.exports = deleteGenreController;
