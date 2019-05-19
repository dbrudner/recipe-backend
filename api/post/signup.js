const db = require("../../models");

module.exports = async (req, res) => {
	const user = await db.User.create({
		name: req.body.name,
		password: req.body.password,
	});
	res.json(user);
};
