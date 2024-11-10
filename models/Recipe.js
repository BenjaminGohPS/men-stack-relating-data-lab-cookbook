const mongoose = require("mongoose");
const Ingredients = require("./Ingredients");

const RecipesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, 
    instructions: { type: String, required: false }, 
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, // a reference to the User model
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "Ingredients",
    },
  },
  { collection: "recipes" }
);

module.exports = mongoose.model("Recipes", RecipesSchema);


/*
const RecipesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // the name of the recipe
    instructions: { type: String, required: false }, // the cooking instructions for the recipe
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }, // a reference to the User model
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "Ingredients",
    },
  },
  { collection: "recipes" }
);

*/