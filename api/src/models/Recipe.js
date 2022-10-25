const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://imag.bonviveur.com/pizza-caprichosa-o-pizza-capricciosa.webp",
      },
      // resumen del plato
      summary: {
        type: DataTypes.STRING,
      },
      // lvl de salubre
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // paso a paso
      steps: {
        type: DataTypes.STRING,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
