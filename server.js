if (process.env.NODE_ENV !== "production") require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;
const db = require("./models");

mongoose.connection.on("open", function() {
	console.log("Connected to mongo server.");
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
