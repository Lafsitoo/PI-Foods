const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const { getAllRecipes } = require("../controllers/index")
const router = Router();

//? Obterner todos los platos o el nombre del plato
router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const allRecipes = await getAllRecipes();
    if (name) {
      // verificamos si el name que esta en el query
      const recetas = allRecipes.filter((r) =>
        r.name.toLowerCase().includes(name.toLowerCase())
      );
      if (recetas.length) return res.json(recetas);
      else
        return res.send(
          `No se ha podido encontrar una receta con el nombre ${name}`
        );
    }
    res.json(allRecipes);
  } catch (error) {
    res.status(404).send(error);
  }
});

//? Obtener el plato por id
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
