module.exports = `
	type User {
		name: String
		password: String
		recipes: [Recipe]
	}

	input UserInput {
		name: String
		password: String
	}
`;
