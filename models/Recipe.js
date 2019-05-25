const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	user: { type: String, required: true },
	name: { type: String, required: true },
	steps: { type: [String], required: true },
	ingredients: [
		{
			id: String,
			measurement: String,
			quantity: Number
		}
	],
	description: { type: String, required: true }
});

module.exports = mongoose.model("Recipe", recipeSchema);
