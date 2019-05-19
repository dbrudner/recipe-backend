const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async ({ body: { name, password } }, res) => {
	const userAlreadyExists = await Boolean(db.User.findOne({ name }));
	if (userAlreadyExists) {
		res.status(422).json({ error: "User already exists." });
		return;
	}

	const hashedPassword = await bcrypt.hashSync(
		process.env.APP_SCRET,
		password
	);

	const user = await db.User.create({
		name,
		password: hashedPassword
	});

	const token = jwt.sign({ user: user.name }, process.env.APP_SECRET);

	res.cookie("user", token);
	res.json(user);
};
