const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;
const nRecipe = 100;

const router = Router();

const getAllApi = async () => {
  const apiUrl = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=${nRecipe}&apiKey=${API_KEY}`
  );

  const infoApi = apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      image: e.image,
      // dentro de diets existe más infomacion. Busco solo "name". que es lo que requiero
      diets: e.diets.map((d) => {
        return { name: d };
      }),
      spoonacularScore: e.spoonacularScore,
      dishTypes: e.dishTypes.map((d) => {
        return { name: d };
      }),
      summary: e.summary,
      healthScore: e.healthScore,
      steps: e.analyzedInstructions,
    };
  });

  return infoApi;
};

const getInfoDb = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      // sobre esta tabla
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getAllApi();
  const dbInfo = await getInfoDb();
  const allRecipes = apiInfo.concat(dbInfo);
  return allRecipes;
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//? Obterner todos los platos o el nombre del plato
router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  try {
    const totalRecipes = await getAllRecipes();

    if (name) {
      titleRecipe = totalRecipes.filter(
        (e) => e.name.toLowerCase().includes(name.toLowerCase()) // ¿Incluye lo que pasa por query?
      );
      titleRecipe.length
        ? res.status(200).send(titleRecipe)
        : res
            .status(404)
            .send(
              `No se ha encontrado una receta con el siguiente nombre ${name}`
            );
    }

    res.status(200).send(totalRecipes);
  } catch (error) {
    res.status(404).send(error);
    console.error(error);
  }
});

//? Obtener todas las dietas posibles

router.get("/diets", async (req, res) => {
  const listDiets = [
    "gluten free",
    "dairy free",
    "ketogenic",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "fodmap friendly",
    "whole 30",
  ];
  
  try {
    // Si lo que busco y ya esta dentro de mi tabla, no lo creo
    listDiets.forEach((e) => {
      Diet.findOrCreate({
        where: { name: e },
      });
    });

    const all = await Diet.findAll();
    res.status(200).send(all);

  } catch (error) {
    res.status(404).send("Error");
  }
});

//? Obtener el plato por id
router.get("/recipes/:id", async (req, res) => {
  res.send("ID");
});

//? Crear un plato nuevo
router.post("/recipe", async (req, res) => {
  res.send("Nuevo plato");
});

module.exports = router;
