const db = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async ({ body: { name, password } }, res) => {
	const user = await db.User.findOne({ name });

	if (!user) {
		res.status(403).json({ error: "Wrong username or password" });
		return;
	}

	const isCorrectPassword = bcrypt.compareSync(password, user.password);

	if (!isCorrectPassword) {
		res.status(403).json({ error: "Wrong username or password" });
		return;
	}

	const token = jwt.sign({ user: user.name }, process.env.APP_SECRET);

	res.cookie("user", token);
	res.json({ isLoggedIn: true });
};
