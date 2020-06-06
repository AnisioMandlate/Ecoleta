const express = require("express");
const path = require("path");

const db = require("./src/database/db.js");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const nunjucks = require("nunjucks");
nunjucks.configure(__dirname + "/src/views", {
  express: app,
  noCache: true,
});

app.get("/", (req, res) => {
  return res.render("index.html");
});

app.get("/registar-ponto", (req, res) => {
  console.log(req.query);

  return res.render("registar-ponto.html");
});

app.get("/search-results", (req, res) => {
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;
    console.log(rows);
    return res.render("search-results.html", { places: rows, total });
  });
});

const port = 8000;
app.listen(port, listening);

function listening() {
  console.log("server is up");
  console.log(`server is running on port: ${port}`);
}
