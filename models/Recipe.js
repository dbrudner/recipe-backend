const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	user: { type: String, required: true },
	name: { type: String, required: true },
	steps: [String],
	ingredients: [
		{
			quantity: { type: Number, required: true },
			name: { type: String, required: true },
			measurement: { type: String, required: true },
		},
	],
	description: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);
