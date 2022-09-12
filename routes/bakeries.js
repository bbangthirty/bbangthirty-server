const express = require("express");
const router = express.Router();
const bakeries = require("../models/bakeries");
const db = require("../components/db");
const { isLoggedIn } = require("../components/middlewares");

module.exports = router;
