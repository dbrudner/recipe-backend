const db = require("../../models");
const bcrypt = require("bcryptjs");

module.exports = {
	createUser: async ({ newUser: { name, password } }) => {
		try {
			const userAlreadyExists = await db.User.findOne({ name });

			if (userAlreadyExists) {
				throw new Error("Name already exists");
			}

			const hashedPassword = await bcrypt.hashSync(password, 10);

			const user = await db.User.create({
				name,
				password: hashedPassword,
			});

			return user;
		} catch (err) {
			throw err;
		}
	},

	login: async ({ user: { name, password } }) => {
		const user = await db.User.findOne({ name });

		if (!user) {
			throw new Error("Name or password is incorrect");
		}

		const isCorrectPassword = bcrypt.compareSync(password, user.password);

		if (!isCorrectPassword) {
			throw new Error("Name or password is incorrect");
		}

		return user;
	},
};
