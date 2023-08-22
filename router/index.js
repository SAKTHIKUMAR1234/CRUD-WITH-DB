const express = require('express')
const router = express.Router();
const emploeeRouter = require("./employee");
const userRouter = require("./users")
router.use("/employee", emploeeRouter);
router.use("/user",userRouter);
module.exports = router