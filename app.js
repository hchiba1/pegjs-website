#!/usr/bin/env node

const express = require("express");
const layout = require("express-layout");
const logger = require("morgan");

const PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;

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

app.get('/pg-formatter', (req, res) => {
  res.render("online", { title: "PG Formatter", layout: "layout-online" });
});

app.listen(PORT, () => {
  const env = app.get("env");
  console.log(`PEG.js website running at PORT ${PORT} in ${env} mode...`);
})
