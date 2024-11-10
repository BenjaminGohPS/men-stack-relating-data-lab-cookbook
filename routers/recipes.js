// routers/recipes.js

const express = require("express");
const router = express.Router();
const isSignedIn = require("../middleware/is-signed-in");
const { getAllRecipes, addRecipes } = require("../controllers/recipes");

// router logic will go here - will be built later on in the lab

router.get("/recipes", getAllRecipes);
router.post("/recipes", addRecipes);

module.exports = router;
