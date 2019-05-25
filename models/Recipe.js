const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	user: { type: String, required: true },
	name: { type: String, required: true },
	steps: [String],
	ingredients: [String],
	description: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);
