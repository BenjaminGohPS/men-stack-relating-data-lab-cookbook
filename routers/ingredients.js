// routers/recipes.js

const express = require("express");
const router = express.Router();
const {
  getAllIngredients,
  addIngredients,
  getSingleIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredients");

// router logic will go here - will be built later on in the lab

router.get("/ingredients", getAllIngredients);
router.post("/ingredients", addIngredients);
router.get("/ingredients/:ingredientId", getSingleIngredient);
router.put("/ingredients/:ingredientId", updateIngredient);
router.delete("/ingredients/:ingredientId", deleteIngredient);

module.exports = router;
