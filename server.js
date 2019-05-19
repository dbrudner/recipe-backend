if (process.env.NODE_ENV !== "production") require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const db = require("./models");

mongoose.connection.on("open", function() {
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
	console.log(`> Ready on http://localhost:${port}`);
});
