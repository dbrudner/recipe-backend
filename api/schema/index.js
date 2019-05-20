const { buildSchema } = require("graphql");

const schema = buildSchema(`
	${require("./user")}

	type Mutation {
		createUser(newUser: UserInput): User
		login(user: UserInput): User
	}

	type Query {
		dummy: String
	}
`);

module.exports = schema;
