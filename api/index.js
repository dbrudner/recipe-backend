const router = require("express").Router();
const glob = require("glob");
const postRoutes = glob.sync("**/post/*.js");
const getRoutes = glob.sync("**/get/*.js");
const _ = require("lodash");
const path = require("path");

postRoutes.forEach(r =>
	router.post(_.trimEnd(r, ".js"), require(path.join(__dirname, "../", r))),
);

getRoutes.forEach(r =>
	router.get(_.trimEnd(r, ".js"), require(path.join(__dirname, "../", r))),
);

router.post("/signup", require("./post/signup"));

module.exports = router;
