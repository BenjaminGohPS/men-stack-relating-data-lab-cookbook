const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// controllers/recipes.js

const User = require("../models/Users.js");
const Recipe = require("../models/Recipe.js");
const Ingredients = require("../models/Ingredients.js");

// controller logic will go here - will be built later on in the lab

const getAllRecipes = async (req, res) => {
  const allReceipes = await Recipe.find().populate("ingredients");
  if (allReceipes.length > 0) {
    res.json(allReceipes);
  } else {
    res.json({ status: "error", msg: "No recipes found" });
  }
};

const addRecipes = async (req, res) => {
  const newRecipes = new Recipe({
    name: req.body.type,
    instructions: req.body.instructions,
    owner: req.body.owner,
    // ingredients: req.body.ingredients
  });

  await newRecipes.save();

  //   await Recipe.create({
  //     name: req.body.type,
  //     instructions: req.body.instructions,
  //     owner: req.body.owner,
  //   });

  res.json({ status: "ok", msg: "Recipe added" });
};

module.exports = { getAllRecipes, addRecipes };
