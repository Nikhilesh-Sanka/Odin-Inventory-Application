const express = require("express");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "public")));
// app.use("/", express.static(path.join(__dirname, "public")));
// app.use("/category", express.static(path.join(__dirname, "public")));
// app.use(
//   "/category/createGenre",
//   express.static(path.join(__dirname, "public"))
// );

const indexRouter = require("./routes/indexRoute");
const categoryRouter = require("./routes/categoryRoute");

app.use("/", indexRouter);
app.use("/category", categoryRouter);

app.listen(3000);
