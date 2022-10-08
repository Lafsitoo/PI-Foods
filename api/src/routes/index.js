const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require("../db.js");
const axios = "axios";
const { API_KEY } = process.env;

const router = Router();

const getAllApi = async () => {
  const apiUrl = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );

  const infoApi = apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      name: e.title,
      image: e.image,
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
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipe = async () => {
  const apiInfo = getAllApi();
  const dbInfo = getInfoDb();
  const allRecipe = apiInfo.concat(dbInfo);
  return allRecipe;
};

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//? Obterner todos los platos o el nombre del plato
router.get("/", async (req, res) => {
  res.send("Todos");
});

//? Obtener el plato por id
router.get("/:id", async (req, res) => {
  res.send("ID");
});

//? Crear un plato nuevo
router.post("/", async (req, res) => {
  res.send("Nuevo plato");
});

module.exports = router;
