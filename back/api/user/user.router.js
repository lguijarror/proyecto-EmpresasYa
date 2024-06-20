const express = require("express");
const userRouter = express.Router();
const { register, login, logout, get, profile } = require("./user.controller");
const { isAuth } = require("../middleware/auth.middleware");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", [isAuth], logout);
userRouter.get("/get", [isAuth], get);
userRouter.get("/profile", [isAuth], profile); 


module.exports = userRouter;
