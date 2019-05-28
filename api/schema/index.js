const { buildSchema } = require("graphql");

const schema = buildSchema(`
	${require("./user")}

	type Ingredient {
		name: String
	}

	type Recipe {
		userConnection: 
			edges {
				cursor: String
				node {
					user: User
				}
		}
		name: String
		steps: [String]
		ingredients: [Ingredient]
		description: String
	}

	input IngredientInput {
		name: String
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
	}

	type Query {
		dummy: String
		ingredients: [Ingredient]
	}
`);

module.exports = schema;
