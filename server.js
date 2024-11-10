require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");

const connectDB = require("./db/db.js");
const authRouter = require("./routers/auth.js");
const recipesRouter = require("./routers/recipes.js");
const ingredientsRouter = require("./routers/ingredients.js");
const isSignedIn = require("./middleware/is-signed-in.js");

const authController = require("./controllers/auth.js");
const recipesController = require("./controllers/recipes.js");
const ingredientsController = require("./controllers/ingredients.js");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// app.use("/auth", authRouter);

// app.use("/auth", authController);
// app.use(isSignedIn);
// app.use("/recipes", recipesController);
// app.use("/ingredients", ingredientsController);

// below middleware
app.use("/auth", authRouter);
app.use("/lab", recipesRouter);
app.use("/lab", ingredientsRouter);

const PORT = process.env.PORT ? process.env.PORT : "5001";

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});
