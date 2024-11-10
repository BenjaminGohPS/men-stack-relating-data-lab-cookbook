// routers/recipes.js

const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  addRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipes");

// router logic will go here - will be built later on in the lab

router.get("/recipes", getAllRecipes);
router.post("/recipes", addRecipes);
router.get("/recipes/:recipeId", getSingleRecipe);
router.put("/recipes/:recipeId", updateRecipe);
router.delete("/recipes/:recipeId", deleteRecipe);

module.exports = router;
