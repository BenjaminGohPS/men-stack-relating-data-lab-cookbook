// routers/recipes.js

const express = require("express");
const router = express.Router();
const isSignedIn = require("../middleware/is-signed-in");
const {
  getAllIngredients,
  addIngredients,
} = require("../controllers/ingredients");

// router logic will go here - will be built later on in the lab

router.get("/ingredients", getAllIngredients);
router.post("/ingredients", addIngredients);

module.exports = router;
