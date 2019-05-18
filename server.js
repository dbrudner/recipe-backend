if (process.env.NODE_ENV !== "production") require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 3000;

MongoClient.connect(
	process.env.MONGO_URI,
	{ useNewUrlParser: true },
	(err, client) => {
		if (err) {
			throw err;
		}
	},
);

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

server.get("/hey", (req, res) => {
	res.send("Hey");
});

server.listen(port, err => {
	if (err) throw err;
	console.log(`> Ready on http://localhost:${port}`);
});
