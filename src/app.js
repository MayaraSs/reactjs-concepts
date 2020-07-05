const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

/**
 * Erro 400
 */
const reply400 = (response) => {
  return response.status(400).json({ error: "Repositorie not found" });
};

const updateRepositorie = (id, newRepositorie) => {
  repositories[id] = newRepositorie;
  return repositories[id];
};
/**
 * Retorna todos os repositórios
 */
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

/**
 * Cadastra um novo
 */
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);

  return response.json(repositorie);
});

/**
 * Altera o título, techs e url com o id presente nos parâmetros da rota.
 */
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url } = request.body;

  const repositoriesIndex = repositories.findIndex(
    (repositorie) => repositorie.id == id
  );

  if (repositoriesIndex < 0) {
    reply400(response);
  }

  const { likes } = repositories[repositoriesIndex];
  newRepositorie = updateRepositorie(repositoriesIndex, {
    id,
    title,
    techs,
    url,
    likes,
  });

  return response.json(newRepositorie);
});

/**
 * Deleta se associado ao id presente nos parâmetros da rota.
 */

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(
    (repositorie) => repositorie.id == id
  );

  if (repositoriesIndex < 0) {
    reply400(response);
  }
  repositories.splice(repositoriesIndex, 1);
  return response.status(204).send();
});
/**
 * A rota aumenta o número de likes do repositório específico
 * escolhido através do id, a cada chamada dessa rota,
 */

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoriesIndex = repositories.findIndex(
    (repositorie) => repositorie.id == id
  );

  if (repositoriesIndex < 0) {
    reply400(response);
  }
  const { likes, title, url } = repositories[repositoriesIndex];

  newRepositorie = updateRepositorie(repositoriesIndex, {
    title,
    url,
    id,
    likes: likes + 1,
  });

  return response.json(newRepositorie);
});

module.exports = app;
