if (process.env.NODE_ENV !== "production") require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

mongoose.connection.on("open", function() {
	// eslint-disable-next-line
	console.log("Connected to mongo server.");
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", require("./api"));

app.listen(port, err => {
	if (err) throw err;

	// eslint-disable-next-line
	console.log(`> Ready on http://localhost:${port}`);
});
