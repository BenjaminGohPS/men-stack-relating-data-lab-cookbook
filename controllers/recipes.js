const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// controllers/recipes.js

const User = require('../models/user.js');
const Recipe = require('../models/Recipes.js');

// controller logic will go here - will be built later on in the lab

module.exports = {};
