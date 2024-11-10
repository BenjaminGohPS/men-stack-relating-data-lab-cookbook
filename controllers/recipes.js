const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// controllers/recipes.js
const mongoose = require("mongoose");
const Users = require("../models/Users.js");
const Recipe = require("../models/Recipe.js");
const Ingredients = require("../models/Ingredients.js");

// controller logic will go here - will be built later on in the lab

const getAllRecipes = async (req, res) => {
  const allRecipes = await Recipe.find().populate("ingredients");
  if (allRecipes.length > 0) {
    res.json(allRecipes);
  } else {
    res.json({ status: "error", msg: "No recipes found" });
  }
};

const addRecipes = async (req, res) => {
  const { name, instructions, owner, ingredients } = req.body;

  if (!name || !owner || !ingredients) {
    return res.json({
      status: "error",
      msg: "Name, Owner, and Ingredients are requred",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(owner)) {
    return res.status(400).json({ status: "error", msg: "Invalid owner ID" });
  }

  const userExists = await Users.findById(owner);
  if (!userExists) {
    return res
      .status(400)
      .json({ status: "error", msg: "Owner does not exit" });
  }

  // check if ingredient inside array is valid
  if (Array.isArray(ingredients)) {
    if (!ingredients.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res
        .status(400)
        .json({ status: "error", msg: "Invalid ingredient ID" });
    }
  }

  const newRecipes = new Recipe({
    name,
    instructions,
    owner,
    ingredients,
  });
  try {
    await newRecipes.save();
    res.json({ status: "ok", msg: "Recipe added" });
  } catch (error) {
    res.json({ status: "error", msg: "Unable to save recipe" });
  }
};

const getSingleRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ status: "error", msg: "Invalid recipe ID" });
  } else {
    const recipe = await Recipe.findById(recipeId);
    if (recipe) {
      res.json(recipe);
    } else {
      res.json({ status: "error", msg: "Recipe not found" });
    }
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ status: "error", msg: "Invalid recipe ID" });
  }

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      res.status(400).json({ status: "error", msg: "Receipe not found" });
    } else {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
          name: req.body.name || recipe.name,
          instructions: req.body.instructions || recipe.instructions,
          owner: req.body.owner || recipe.owner,
          ingredients: req.body.ingredients || recipe.ingredients,
        },
        { new: true }
      );

      res.json({ status: "ok", msg: "Recipe Updated", data: updateRecipe });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = req.params.recipeId;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ status: "error", msg: "Invalid recipe ID" });
  } else {
    const recipe = await Recipe.findById(recipeId);
    if (recipe) {
      await Recipe.findByIdAndDelete(recipeId);
      res.json({ status: "ok", msg: "Recipe deleted" });
    } else {
      res.json({ status: "error", msg: "Recipe not found" });
    }
  }
};

module.exports = {
  getAllRecipes,
  addRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
};

/* WORKINGS

  // const newRecipes = new Recipe({
  //   name: req.body.name,
  //   instructions: req.body.instructions,
  //   owner: req.body.owner,
  //   ingredients: req.body.ingredients,
  // });

*/
