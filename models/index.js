const glob = require("glob");
const _ = require("lodash");

const models = glob.sync("**/*.js").filter(x => x !== "index.js");

module.exports = models.reduce((acc, x) => {
	return { ...acc, [_.trimEnd(x, ".js")]: x };
}, {});
