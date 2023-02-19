const { UserModel } = require("../models/user.model");
const adminRouter = require("express").Router();


adminRouter.get("/getuser",async(req,res)=>{            // Get all Users
    try{
        // if(req.role == "explorer"){
            const users = await UserModel.find();
            if(users.length==0) res.send({"msg":"Users Data is Empty"})
            else res.send(users)
        // }
    }
    catch(err){
        res.send({"error":err.message});
    }
});


adminRouter.get("/getuser/:id",async(req,res)=>{        // Get a User
    const {id} = req.params;
    try{
        // if(req.role == "explorer"){
            const user = await UserModel.find({_id:id});
            if(user.length==0) res.send({"msg":"No Data"})
            else res.send(user)
        // }
    }
    catch(err){
        res.send({"error":err.message});
    }
});


adminRouter.put("/updateuser/:id",async(req,res)=>{       // Update a user's Data
    const {id} = req.params;
    const data = req.body;
    try{
        if(req.role == "admin"){
            const user = await UserModel.find({_id:id});
            if(user.length==0) res.send({"msg":"No Data"})
            else {
                await UserModel.findOneAndReplace({_id:id},data);
                res.send({"msg":"Successfully Updated the user Data"})
            }
        }
        else{ res.send({"msg":"You are not an Admin"}) }
    }
    catch(err){
        res.send({"error":err.message});
    }
});



adminRouter.delete("/deleteuser/:id",async(req,res)=>{       // Delete a user's Data
    const {id} = req.params;
    try{
        if(req.role == "admin"){
            const user = await UserModel.find({_id:id});
            if(user.length==0) res.send({"msg":"No Data"})
            else {
                await UserModel.findByIdAndDelete({_id:id});
                res.send({"msg":"Successfully Deleted the user Data"})
            }
        }
        else{ res.send({"msg":"You are not an Admin"}) }
    }
    catch(err){
        res.send({"error":err.message});
    }
});


module.exports = {
    adminRouter,
}