const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/views/index.html");
});

app.get("/registar-ponto", (req, res) => {
  res.sendFile(__dirname + "/src/views/registar-ponto.html");
});

app.get("/search-results", (req, res) => {
  res.sendFile(__dirname + "/src/views/search-results.html");
});

const port = 8000;
app.listen(port, listening);

function listening() {
  console.log("server is up");
  console.log(`server is running on port: ${port}`);
}
