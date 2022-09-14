const express = require("express");
const router = express.Router();
const notices = require("../models/notices");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

module.exports = router;
