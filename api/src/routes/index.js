// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require("express");
const { Recipe, Diet } = require("../db.js");
const axios = require("axios");

//? Aca me traigo la key del .env
const { API_KEY, API_KEY2, API_KEY3 } = process.env;
//? Limito la cantidad de platos. En el Readme creo que pide 100
const nRecipe = 100;

const router = Router();

const getAllApi = async () => {
  const apiUrl = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=${nRecipe}`
  );

  const infoApi = apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      image: e.image,
      // dentro de diets existe más infomacion. Busco solo "name", que es lo que requerimos
      diets: e.diets.map((d) => {
        return { name: d };
      }),
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
    // Si posee "name" lo filtamos. Ademas nos ahorramos otra ruta
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
    // Enviamos
    res.status(200).send(totalRecipes);
  } catch (error) {
    res.status(404).send(error);
    console.error(error);
  }
});

//? Obtener todas las dietas posibles

router.get("/diets", async (req, res) => {
  // Para no gastar una request de Api, buscamos entre las dietas que sabes que ya posee
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
    // La buscamos en db y la enviamos
    const all = await Diet.findAll();
    res.status(200).send(all);
  } catch (error) {
    res.status(404).send("Error");
  }
});

//? Obtener el plato por id
router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipesTotal = await getAllRecipes();
    // preguntamos si hay id, si la hay la devolvera
    if (id) {
      const recipesId = await recipesTotal.filter((e) => e.id == id);
      recipesId.length
        ? res.status(200).send(recipesId)
        : res.status(404).send("No fue posible encontrar la receta");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

//? Crear un plato nuevo
router.post("/recipe", async (req, res) => {
  // info que pido
  const {
    name,
    image,
    diets,
    dishTypes,
    summary,
    healthScore,
    steps,
    createdInDb,
  } = req.body;
  try {
    // creo la nueva receta, sin "diets"
    const recipeCreated = await Recipe.create({
      name,
      image,
      dishTypes,
      summary,
      healthScore,
      steps,
      createdInDb,
    });
    // busco la dieta en db
    const dietsInDb = await Diet.findAll({
      where: { name: diets },
    });
    // añadimos la nueva receta
    recipeCreated.addDiet(dietsInDb);
    res.status(200).send("¡Felicidades! Receta creada con Exito");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
