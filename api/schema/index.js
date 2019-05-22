const { buildSchema } = require("graphql");

const schema = buildSchema(`
	${require("./user")}

	type Ingredient {
		name: String
	}

	type Recipe {
		user: String
		steps: String
		ingredients: [Ingredient]
	}

	input RecipeInput {
		name: String
		password: String
	}

	type Mutation {
		createUser(newUser: UserInput): User
		login(user: UserInput): User
	}

	type Query {
		dummy: String
	}
`);

module.exports = schema;
