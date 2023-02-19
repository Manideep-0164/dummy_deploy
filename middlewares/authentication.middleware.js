const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("@cyclic.sh/s3fs");

// Checking the passoword and assigning the token

const authentication = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        req.userName = user[0].username;
        req.userRole = user[0].role;
        if (user.length != 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ "userID": user[0]._id, "userName": user[0].username }, process.env.JWT_SECREAT, { expiresIn: '1h' });
                    res.send({ "msg": "Login Success", "token": token, "userName": user[0].username });
                    next();
                }
                else {
                    res.send({ "msg": "Wrong Credentials", "error": err.message });
                }
            })
        }
        else {
            res.send({ "msg": "Please Register" });
        }
    }
    catch (err) {
        res.send({ "error": err.message });
    }
}

// Validating the role of  the user

const validateUser = (req,res,next)=>{
    const totalHead  = req.headers.authorization.split(" ");
    const token = totalHead[0];
    req.role = totalHead[1];
    try{
        jwt.verify(token, process.env.JWT_SECREAT, (err,decode)=>{
            if(decode){
                req.userName = decode.userName;
                next();
            }
            else res.send({"error":err.message});
        })
    }
    catch(err){
        res.send({"error":err.message});
    }
}

// Logger to log the username and role

const userLogger = (req,res,next)=>{
    let arr = [];
    const log = `UserName: ${req.userName} | Role: ${req.userRole}\n`;
    let data = fs.readFileSync(`${__dirname}/log.txt`,"utf-8") || "";
    arr.push(data);
    arr.push(log);
    fs.writeFileSync(`${__dirname}/log.txt`,arr.join("\n"),"utf-8");
    next()
}

module.exports = {
    validateUser,
    authentication,
    userLogger,
}