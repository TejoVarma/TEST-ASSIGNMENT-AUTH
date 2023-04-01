const express = require('express');
const router = express.Router();
const userRouter = require("../controllers/users.controller")

router.post("/signup", userRouter.signUp);
router.post("/login", userRouter.login);

module.exports = router;