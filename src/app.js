const express = require("express");
const cors = require("cors");

const { v4: uuid, validate } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repositoryID = v4();

  return console.log(`body = ${req.body}, repositoryID = ${repositoryID}`);
});

app.put("/repositories/:id", (req, res) => {
  
});

app.delete("/repositories/:id", (req, res) => {
  
});

app.post("/repositories/:id/like", (req, res) => {
  
});

module.exports = app;