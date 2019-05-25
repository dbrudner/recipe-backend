const glob = require("glob");
const _ = require("lodash");
const path = require("path");

const models = glob.sync("**/models/*.js").filter(x => x !== "models/index.js");

module.exports = models.reduce((acc, x) => {
	return {
		...acc,
		[_.trimStart(_.trimEnd(x, ".js"), "models/")]: require(path.join(
			__dirname,
			"../",
			x,
		)),
	};
}, {});
