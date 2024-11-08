const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    type: { type: String, required: true },
    quantity: { type: String, required: true },
  },
  { collection: "ingredients" }
);

module.exports = mongoose.model("Ingredients", ingredientsSchema);
