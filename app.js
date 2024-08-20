const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));

const indexRouter = require("./routes/indexRoute");
const categoryRouter = require("./routes/categoryRoute");
const genreRouter = require("./routes/genreRoute");

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/category/genre", genreRouter);

app.listen(process.env.PORT);
