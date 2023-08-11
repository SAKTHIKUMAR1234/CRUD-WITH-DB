const express = require('express')
const router = express.Router();
const emploeeRouter = require("./employee");
router.use("/employee", emploeeRouter)
module.exports = router