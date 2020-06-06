const express = require("express");
const path = require("path");

const db = require("./src/database/db.js");

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
  // Insert data in the database
  const query = `
      INSERT INTO places (
          image,
          name,
          address,
          address2,
          state,
          city,
          items
      ) VALUES (?,?,?,?,?,?,?);
      `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];
  function afterDataInsert(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no registo!");
    }
    console.log("Your data was saved");
    console.log(this);
    return res.render("registar-ponto.html", { saved: true });
  }
  db.run(query, values, afterDataInsert);
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
