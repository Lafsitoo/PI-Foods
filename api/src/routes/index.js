const { Router } = require("express");
const router = Router();

//* RUTAS
const recipe = require("../routes/recipesRoutes");
const diet = require("../routes/dietsRoutes");

//? puertos
router.use("/recipes", recipe)
router.use("/diets", diet)

module.exports = router;
