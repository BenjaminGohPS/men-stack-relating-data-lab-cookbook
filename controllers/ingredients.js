const express = require("express");

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
        name: req.body.name || ingredient.name,
      });
      res.json({ status: "ok", msg: "Ingredient updated" });
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

module.exports = {
  getAllIngredients,
  addIngredients,
  getSingleIngredient,
  updateIngredient,
  deleteIngredient,
};
