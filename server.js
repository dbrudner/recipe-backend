if (process.env.NODE_ENV !== "production") require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const graphqlHTTP = require("express-graphql");
const jwt = require("jsonwebtoken");

mongoose.connection.on("open", function() {
	// eslint-disable-next-line
	console.log("Connected to mongo server.");
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(async (req, res, next) => {
	try {
		const isValidUser = await jwt.verify(
			req.cookies.user,
			process.env.APP_SECRET,
		);

		req.isValidUser = Boolean(isValidUser);
	} catch (err) {
		req.isValidUser = false;
	}

	next();
});

app.use(
	"/api",
	graphqlHTTP((req, res) => ({
		schema: require("./api/schema"),
		rootValue: require("./api/root"),
		graphiql: true,
		context: { req, res },
	})),
);

app.listen(port, err => {
	if (err) throw err;

	// eslint-disable-next-line
	console.log(`> Ready on http://localhost:${port}`);
});
