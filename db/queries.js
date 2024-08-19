const pool = require("./pool.js");

const getCategories = async () => {
  let { rows } = await pool.query(`SELECT * FROM categories;`);
  return rows;
};

const getGenres = async (categoryId) => {
  let { rows } = await pool.query(
    `SELECT genres.name,genres.id,categories.id
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
      SELECT genres.name,genres.id,categories.id
      FROM genres INNER JOIN categories 
      ON categories.id = genres.category_id 
      WHERE categories.id = $1 AND genres.name LIKE '%${searchQuery}%'`,
    [parseInt(categoryId)]
  );
  return rows;
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
    // await pool.query(`INSERT INTO genres (name,category_id) VALUES ()`,[])
  }
  return false;
};

module.exports = {
  getCategories,
  getGenres,
  searchGenres,
  insertGenre,
};
