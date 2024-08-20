const { Client } = require("pg");
require("dotenv").config();

let client = new Client({
  connectionString: process.env.DATABASE_URL,
});

let SQL = `
    CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT,
        description TEXT,
        genre_id INTEGER
    );
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT
    );
    CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT,
        category_id INTEGER
    );
    INSERT INTO categories (name) VALUES ('Movies') , ('TV Shows');
    INSERT INTO genres (name,category_id) VALUES ('action',1),
                                                ('drama',1),
                                                ('romance',1),
                                                ('erotic',1),
                                                ('action',2),
                                                ('drama',2),
                                                ('sitcom',2);
    INSERT INTO movies (name,description,genre_id) VALUES ('abc','great movie',1),
                                                          ('bcd','great movie',1),
                                                          ('cde','great movie',1),
                                                          ('abc','great movie',2),
                                                          ('bcd','great movie',2);
`;

const main = async () => {
  console.log("...connecting");
  await client.connect();
  console.log("......querying");
  await client.query(SQL);
  console.log(".........disconnecting");
  await client.end();
};

main();
