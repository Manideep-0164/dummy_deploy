const mongoose = require("mongoose");

const userStruct = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    DOB:{type:String, required:true},
    role:{type:String, required:true},
    location:{type:String, required:true},
    password:{type:String, required:true},
},{ versionKey:false });

const UserModel = mongoose.model("user",userStruct);

module.exports = {
    UserModel,
}