module.exports = `
	type User {
		name: String
		password: String
		recipesConnection: {
			edges {
				cursor: String
				node {
					recipes: [Recipe]
				}
			}
		}
	}

	input UserInput {
		name: String
		password: String
	}
`;
