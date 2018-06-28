const express = require('express');
const path = require('path');
const htmlRouter = express.Router();

htmlRouter.use(express.static("client/build"));

htmlRouter.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = htmlRouter;