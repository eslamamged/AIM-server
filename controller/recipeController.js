const Recipe = require("../modules/recipe/recipeModel");
const cloudinary = require("../utils/cloudinary");

exports.getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.editRecipe = async (req, res, next) => {
  let { title, ingredient, recipe, image } = req.body;
  try {
    let oldRecipe = await Recipe.findById(req.params.id);
    let response;
    if (req.file) {
      await cloudinary.uploader.destroy(oldRecipe.cloudinary_id);
      response = await cloudinary.uploader.upload(req.file.path);
    }
    const updated = {
      title: title || oldRecipe.title,
      ingredient: ingredient || oldRecipe.ingredient,
      recipe: recipe || oldRecipe.recipe,
      image: response?.secure_url || oldRecipe.image,
      cloudinary_id: response?.public_id || oldRecipe.cloudinary_id,
    };
    oldRecipe = await Recipe.findByIdAndUpdate(req.params.id, updated, {
      new: true,
    });
    res.send(oldRecipe);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.send(recipe);
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  let { title, ingredient, recipe } = req.body;
  try {
    const response = await cloudinary.uploader.upload(req.file.path);
    recipe = new Recipe({
      title,
      ingredient,
      recipe,
      image: response.secure_url,
      cloudinary_id: response.public_id,
    });
    const createdRecipe = await recipe.save();
    res.send(createdRecipe);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
};
exports.deleteRecipe = async (req, res, next) => {
  try {
    let recipes = await Recipe.findById(req.params.id);
    await cloudinary.uploader.destroy(recipes.cloudinary_id);
    await recipes.remove();
    res.json({ message: "Recipe deleted" });
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};
