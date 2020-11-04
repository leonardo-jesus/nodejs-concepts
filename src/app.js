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

  const likes = 0;
  const repository = {
    id: uuid(), 
    title, 
    url, 
    techs, 
    likes
  };

  try {
    repositories.push(repository);
    return res.status(200).json(repository);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: `Error: ${e}` });
  }
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  if (!validate(id)) {
    return res.status(400).json({ error: 'Invalid Repository ID' });
  };

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return res.status(400).json({ error: 'Project not found' });
  };

  const repository = {
    id: id, 
    title, 
    url, 
    techs,
    likes: repositories[repositoryIndex].likes
  };

  try {
    repositories[repositoryIndex] = repository;
    return res.status(200).json(repository);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: `Error: ${e}` });
  };
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  if (!validate(id)) {
    return res.status(400).json({ error: 'Invalid Repository ID' });
  };

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return res.status(400).json({ error: 'Project not found' });
  };

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  if (!validate(id)) {
    return res.status(400).json({ error: 'Invalid Repository ID' });
  };

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return res.status(400).json({ error: 'Project not found' });
  };

  const repository = repositories[repositoryIndex];

  repositories[repositoryIndex].likes += 1;

  return res.status(200).json(repository);
});

module.exports = app;