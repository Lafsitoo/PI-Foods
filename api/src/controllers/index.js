const axios = require("axios");
//? Traijo los modelos
const { Recipe, Diet } = require("../db.js");

//? Aca me traigo la key del .env
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6 } =
  process.env;

//? Limito la cantidad de platos. En el Readme creo que pide 100
const nRecipe = 100;

//* DATOS

const getAllApi = async () => {
  const apiUrl = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=${nRecipe}`
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

module.exports = {
  getAllRecipes,
};
