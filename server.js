const express = require("express");
const path = require("path");

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
  return res.render("registar-ponto.html");
});

app.get("/search-results", (req, res) => {
  return res.render("search-results.html");
});

const port = 8000;
app.listen(port, listening);

function listening() {
  console.log("server is up");
  console.log(`server is running on port: ${port}`);
}
