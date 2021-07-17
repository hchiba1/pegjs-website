#!/usr/bin/env node

const bodyParser = require("body-parser");
const express = require("express");
const layout = require("express-layout");
const logger = require("morgan");

const PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 10000;
const IP = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));

app.use(layout());
app.use((req, res, next) => {
  res.locals.req = req;
  next();
});

/* Helpers */
app.locals.menuItem = function(req, id, title) {
    return "<a"
      + (req.path === "/" + id ? " class=\"current\"" : "")
      + " href=\"/" + id + "\">"
      + title
      + "</a>";
};

app.get('/', (req, res) => {
  res.render("online", { title: "Validator", layout: "layout-online" });
});

/* Main */

var server = app.listen(PORT, IP, () => {
  const host = server.address().address;
  const port = server.address().port;
  const env = app.get("env");
  console.log(`PEG.js website running at http://${host}:${port} in ${env} mode...`);
})
