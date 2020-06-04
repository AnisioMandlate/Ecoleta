const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const port = 8000;
app.listen(port, listening);

function listening() {
  console.log("server is up");
  console.log(`server is running on port: ${port}`);
}
