const { Router } = require("express");
const { Diet } = require("../db");
const router = Router();

//? Obtener todas las dietas posibles

router.get("/", async (req, res) => {
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

module.exports = router;
