const { buildSchema } = require("graphql");

const schema = buildSchema(`
	${require("./user")}

	type Ingredient {
		name: String
	}

	type Recipe {
		user: String
		name: String
		steps: [String]
		ingredients: [Ingredient]
		description: String
	}

	input IngredientInput {
		id: String
		quantity: Float
		measurement: String
	}

	input RecipeInput {
		user: String
		name: String
		steps: [String]
		ingredients: [IngredientInput]
		description: String
	}

	type Mutation {
		createUser(newUser: UserInput): User
		login(user: UserInput): User
		addRecipe(newRecipe: RecipeInput): Recipe
		user: String
		description: String
	}

	type Query {
		dummy: String
	}
`);

module.exports = schema;
