const mongoose = require("mongoose");

const RecipesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instructions: { type: String, required: false },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
      ref: "Ingredients",
    },
  },
  { collection: "recipes" }
);

module.exports = mongoose.model("Recipes", RecipesSchema);
