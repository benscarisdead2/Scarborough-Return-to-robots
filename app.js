const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const routes = require("./routes/router.js");

const app = express();
app.use("/public", express.static(path.join(__dirname, "public")));
app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

app.use(morgan("dev"));

app.use(routes);

app.listen(3000, function () {
  console.log("Server up.");
});