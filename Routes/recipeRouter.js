const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../controller/recipeController");
const upload = require("../utils/multer");

recipeRouter
  .route("/")
  .get(recipeController.getAllRecipes)
  .post(upload.single("image"), recipeController.createRecipe);
recipeRouter
  .route("/:id")
  .get(recipeController.getRecipe)
  .patch(upload.single("image"), recipeController.editRecipe)
  .delete(recipeController.deleteRecipe);

module.exports = recipeRouter;
