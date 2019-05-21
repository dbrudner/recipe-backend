const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
	user: { type: String, required: true },
	steps: [{ type: String }],
	ingredients: [
		{
			name: { type: Schema.Types.ObjectId, ref: "Ingredient" },
			amount: { type: Number },
			measurement: { type: String }
		}
	]
});

module.exports = mongoose.model("Recipe", recipeSchema);
