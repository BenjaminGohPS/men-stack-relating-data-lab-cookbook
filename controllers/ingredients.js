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
  const existingIngredient = await Ingredients.findOne({ name: req.body.name });

  if (existingIngredient) {
    return res.json({ status: "error", msg: "Ingredient exist" });
  } else {
    const newIngredient = new Ingredients({
      name: req.body.name,
    });

    await newIngredient.save();

    res.json({ status: "ok", msg: "Ingredient saved" });
  }
};

const getSingleIngredient = async (req, res) => {
  const ingredientId = req.params.ingredientId;

  if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
    return res
      .status(400)
      .json({ status: "error", msg: "Invalid ingredient ID" });
  } else {
    const ingredient = await Ingredients.findById(ingredientId);
    if (ingredient) {
      res.json(ingredient);
    } else {
      res.json({ status: "error", msg: "Ingredient not found" });
    }
  }
};

const updateIngredient = async (req, res) => {
  const ingredientId = req.params.ingredientId;

  if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
    return res
      .status(400)
      .json({ status: "error", msg: "Invalid ingredient ID" });
  } else {
    const ingredient = await Ingredients.findById(ingredientId);
    if (ingredient) {
      await Ingredients.findByIdAndUpdate(ingredientId, {
        name: req.body.name,
      });
      res.json({ status: "ok", msg: "updated" });
    } else {
      res.json({ status: "error", msg: "Ingredient not found" });
    }
  }
};

const deleteIngredient = async (req, res) => {
  const ingredientId = req.params.ingredientId;

  if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
    return res
      .status(400)
      .json({ status: "error", msg: "Invalid ingredient ID" });
  } else {
    const ingredient = await Ingredients.findById;
    if (ingredient) {
      await Ingredients.findByIdAndDelete(ingredientId);
      res.json({ status: "ok", msg: "Ingredient deleted" });
    } else {
      res.json({ status: "error", msg: "Ingredient not found" });
    }
  }
};

// const findIngredientById = async (req, res) => {
//   const ingredient = await Ingredients.aggregate([
//     {
//       $match: {
//         ingredients: new [mongoose.Types.ObjectId(req.body.ingredientsId)](),
//       },
//     },
//   ]);

//   res.json(ingredient);
// };

module.exports = {
  getAllIngredients,
  addIngredients,
  getSingleIngredient,
  updateIngredient,
  deleteIngredient,
};

// 	/ingredients/:ingredientId
