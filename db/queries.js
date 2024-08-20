const pool = require("./pool.js");

const getCategories = async () => {
  let { rows } = await pool.query(`SELECT * FROM categories;`);
  return rows;
};

const getGenres = async (categoryId) => {
  let { rows } = await pool.query(
    `SELECT genres.name,genres.id
     FROM genres INNER JOIN categories 
     ON categories.id = genres.category_id 
     WHERE categories.id = $1`,
    [parseInt(categoryId)]
  );
  return rows;
};
const searchGenres = async (categoryId, searchQuery) => {
  let { rows } = await pool.query(
    `
      SELECT genres.name,genres.id
      FROM genres INNER JOIN categories 
      ON categories.id = genres.category_id 
      WHERE categories.id = $1 AND genres.name LIKE $2`,
    [parseInt(categoryId), `%${searchQuery}%`]
  );
  return rows;
};
const getGenre = async (genreId) => {
  let { rows } = await pool.query(`SELECT * FROM genres WHERE genres.id=$1`, [
    parseInt(genreId),
  ]);
  let [genre] = rows;
  return genre;
};
const insertGenre = async (categoryId, genreName) => {
  let processedGenreName = genreName.toLowerCase();
  let { rows } = await pool.query(
    `SELECT * FROM genres 
    INNER JOIN categories 
    ON genres.category_id = categories.id 
    WHERE genres.name LIKE $1 
    AND categories.id = $2`,
    [processedGenreName, categoryId]
  );
  if (rows.length === 0) {
    await pool.query(`INSERT INTO genres (name,category_id) VALUES ($1,$2)`, [
      processedGenreName,
      categoryId,
    ]);
    return true;
  }
  return false;
};
const deleteGenre = async (genreId) => {
  let processedGenreId = parseInt(genreId);
  await pool.query(`DELETE FROM genres WHERE genres.id = $1`, [
    processedGenreId,
  ]);
  await pool.query(`DELETE FROM movies WHERE movies.genre_id = $1`, [
    processedGenreId,
  ]);
};
const editGenre = async (genreId, categoryId, genreName) => {
  let { rows } = await pool.query(
    `SELECT * FROM genres WHERE genres.name=$1 AND genres.category_id = $2`,
    [genreName.toLowerCase(), parseInt(categoryId)]
  );
  if (rows.length === 0) {
    await pool.query(
      `UPDATE genres 
      SET name = $1 
      WHERE id=$2`,
      [genreName.toLowerCase(), parseInt(genreId)]
    );
  }
  return;
};

const getMovies = async (genreId) => {
  let processedGenreId = parseInt(genreId);
  let { rows } = await pool.query(
    `SELECT movies.id,movies.name,movies.description FROM movies 
    INNER JOIN genres 
    ON genres.id = movies.genre_id
    WHERE genres.id = $1`,
    [processedGenreId]
  );
  return rows;
};
const getMovie = async (movieId) => {
  let { rows } = await pool.query(`SELECT * FROM movies WHERE movies.id = $1`, [
    parseInt(movieId),
  ]);
  let [movie] = rows;
  return movie;
};
const searchMovies = async (genreId, searchQuery) => {
  let processedGenreId = parseInt(genreId);
  let { rows } = await pool.query(
    `SELECT movies.id,movies.name,movies.description 
    FROM movies INNER JOIN genres 
    ON movies.genre_id = genres.id 
    WHERE genres.id = $1 
    AND movies.name LIKE $2`,
    [processedGenreId, `%${searchQuery}%`]
  );
  console.log(rows);
  return rows;
};
const insertMovie = async (genreId, itemName, itemDescription) => {
  let processedGenreId = parseInt(genreId);
  let { rows } = await pool.query(
    `SELECT * FROM movies WHERE movies.name LIKE $1 AND movies.genre_id = $2`,
    [`%${itemName.toLowerCase()}%`, processedGenreId]
  );
  if (rows.length === 0) {
    await pool.query(
      `INSERT INTO movies (name,description,genre_id) VALUES ($1,$2,$3)`,
      [itemName.toLowerCase(), itemDescription, processedGenreId]
    );
  }
};
const deleteMovie = async (itemId) => {
  await pool.query(`DELETE FROM movies WHERE movies.id = $1`, [
    parseInt(itemId),
  ]);
};
const updateMovie = async (itemId, genreId, movieName, movieDescription) => {
  let { rows } = await pool.query(
    `SELECT * FROM movies WHERE movies.name LIKE $1 AND movies.genre_id=$2`,
    [movieName.toLowerCase(), parseInt(genreId)]
  );
  if (rows.length === 0) {
    await pool.query(
      `UPDATE movies 
      SET name = $1,
      description=$2 
      WHERE id = $3`,
      [movieName.toLowerCase(), movieDescription, parseInt(itemId)]
    );
  } else {
    await pool.query(
      `UPDATE movies
      SET description = $1
      WHERE id = $2`,
      [movieDescription, parseInt(itemId)]
    );
  }
};

module.exports = {
  getCategories,
  getGenres,
  searchGenres,
  getGenre,
  insertGenre,
  deleteGenre,
  editGenre,
  getMovies,
  getMovie,
  searchMovies,
  insertMovie,
  deleteMovie,
  updateMovie,
};
