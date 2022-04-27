const mongoose = require("mongoose");
//Define a schema
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Recipe must have a title"],
  },
  ingredient: {
    type: String,
    required: [true, "Recipe must have a ingredient"],
  },
  recipe: {
    type: String,
    required: [true, "you must have a recipe"],
  },
  image: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String,
  },
});
module.exports = recipeSchema;
