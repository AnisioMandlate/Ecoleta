const express = require("express");
const path = require("path");

const db = require("./src/database/db.js").db;
const addData = require("./src/database/db.js").addData;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

const nunjucks = require("nunjucks");
nunjucks.configure(__dirname + "/src/views", {
  express: app,
  noCache: true,
});

app.get("/", (req, res) => {
  return res.render("index.html");
});

app.get("/registar-ponto", (req, res) => {
  return res.render("registar-ponto.html");
});

app.post("/savepoint", (req, res) => {
  const table = "places";
  const fields = "image, name, address, address2, state, city, items";
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  addData({ table, fields, values })
    .then((response) => {
      return res.render("registar-ponto.html", { saved: true });
    })
    .catch((err) => {
      console.log("error: ", err);
    });
});

app.get("/search-results", (req, res) => {
  const search = req.query.search;
  if (search == "") {
    return res.render("search-results.html", { total: 0 });
  }
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      return console.log("Erro de pesquisa: ", err);
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
