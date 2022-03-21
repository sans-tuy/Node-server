const express = require("express");
const router = express.Router();

const controllerAuths = require("../controller/auths");

router.post("/register", controllerAuths.register);

module.exports = router;
