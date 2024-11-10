const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// controllers/ingredients.js

const User = require("../models/Users.js");
const Ingredients = require("../models/Ingredients.js");

// controller logic will go here - will be built later on in the lab

const getAllIngredients = async (req, res) => {
  const allIngredients = await Ingredients.find();
  if (allIngredients.length > 0) {
    res.json(allIngredients);
  } else {
    res.json({ status: "error", msg: "No Ingredients Found" });
  }
};

const addIngredients = async (req, res) => {
  const newIngredient = new Ingredients({
    name: req.body.name,
  });

  await newIngredient.save();

  res.json({status: 'ok', msg: 'Ingredient Saved'})
};

module.exports = { getAllIngredients,addIngredients, };
