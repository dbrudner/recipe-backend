const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
	createUser: async ({ newUser: { name, password } }, { res }) => {
		try {
			const userAlreadyExists = await db.User.findOne({ name });

			if (userAlreadyExists) {
				throw new Error("Name already exists");
			}

			const hashedPassword = await bcrypt.hashSync(password, 10);
			const user = await db.User.create({
				name,
				password: hashedPassword
			});

			const token = jwt.sign({ user: user.name }, process.env.APP_SECRET);
			res.cookie("user", token);

			return user;
		} catch (err) {
			throw err;
		}
	},

	login: async ({ user: { name, password } }, { req, res }) => {
		if (req.isValidUser) {
			throw new Error("Already signed in");
		}

		const user = await db.User.findOne({ name });

		if (!user) {
			throw new Error("Name or password is incorrect");
		}

		const isCorrectPassword = bcrypt.compareSync(password, user.password);

		if (!isCorrectPassword) {
			throw new Error("Name or password is incorrect");
		}

		const token = jwt.sign({ user: user.name }, process.env.APP_SECRET);
		res.cookie("user", token);

		return user;
	},

	addRecipe: async ({ newRecipe }, { req, res }) => {
		console.log(newRecipe);

		if (!req.isValidUser) {
			throw new Error("Must be logged in to add recipe");
		}

		// If ingredients don't exist in database, add them
		// Don't return anything back to request for this
		// Just for keeping database of ingredients
		newRecipe.ingredients.forEach(async ingredient => {
			console.log(ingredient);
			const alreadyAddedIngredient = await db.Ingredient.findOne({
				name: ingredient
			});

			if (!alreadyAddedIngredient) {
				const newIngredient = await db.Ingredient.create({
					name: ingredient
				});
			}
		});

		const alreadyExistingRecipe = await db.Recipe.findOne({
			name: newRecipe.name,
			user: newRecipe.user
		});

		if (alreadyExistingRecipe) {
			throw new Error("You already have a recipe with this name");
		}

		const createdRecipe = await db.Recipe.create({ ...newRecipe });

		return createdRecipe;
	},

	ingredients: async () => {
		const ingredients = await db.Ingredient.find({});
		return ingredients;
	}
};
