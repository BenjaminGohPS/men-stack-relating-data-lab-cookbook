const mongoose = require("mongoose");

const RecipesSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
  },
  { collection: "recipes" }
);

module.exports = mongoose.model("Recipes", RecipesSchema);
