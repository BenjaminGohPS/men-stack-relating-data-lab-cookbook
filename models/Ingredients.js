const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { collection: "ingredients" }
);

module.exports = mongoose.model("Ingredients", ingredientsSchema);
