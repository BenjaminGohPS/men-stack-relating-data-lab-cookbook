const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

// controllers/ingredients.js

const User = require("../models/Users.js");
const Ingredients = require("../models/Ingredients.js");

// controller logic will go here - will be built later on in the lab

const getAllIngredients = async (req, res) => {
  const allIngredients = await Ingredients.find();
  if (allIngredients.length > 0) {
    res.json(allIngredients);
  } else {
    res.json({ status: "error", msg: "No ingredients found" });
  }
};

const addIngredients = async (req, res) => {
  const newIngredient = new Ingredients({
    name: req.body.name,
  });

  await newIngredient.save();

  res.json({ status: "ok", msg: "Ingredient saved" });
};

const getSingleIngredient = async (req, res) => {
  const ingredientId = req.params.ingredientId;

  if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
    return res
      .status(400)
      .json({ status: "error", msg: "Invalid ingredient ID" });
  } else {
    const ingredient = await Ingredients.findById(ingredientId);
    if (ingredientId) {
      res.json(ingredient);
    } else {
      res.json({ status: "error", msg: "Ingredient not found" });
    }
  }
};

module.exports = { getAllIngredients, addIngredients, getSingleIngredient };

// 	/ingredients/:ingredientId
