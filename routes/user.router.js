const userRouter = require("express").Router();
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authentication, userLogger } = require("../middlewares/authentication.middleware");
require("dotenv").config();

// USER REGISTRATION 

userRouter.post("/register", async (req, res) => {
    const { username, email, DOB, role, location, password } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = UserModel({ username, email, DOB, role, location, password: hash });
            await user.save();
            res.send({ "msg": "Registration Success" });
        })
    }
    catch (err) {
        res.send({ "error": err.message });
    }
});


// USER LOGIN

userRouter.post("/login",authentication,userLogger,async (req, res) => {
});



module.exports = {
    userRouter,
}