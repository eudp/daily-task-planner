const express = require('express');
const path = require('path');
const htmlRoutes = express.Router;

htmlRoutes.use(express.static("client/build"));

htmlRoutes.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = htmlRoutes;