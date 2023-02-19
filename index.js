const express = require("express");
const app = express();
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.router");
const { adminRouter } = require("./routes/admin.router")
const cors = require("cors");
const { validateUser } = require("./middlewares/authentication.middleware");
require("dotenv").config();

app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home page");
})

app.use("/user",userRouter);
app.use(validateUser);
app.use("/user",adminRouter)


// Running the server

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log(" --- Connected to DB Atlas ---");
        console.log(` -> Server is Runnig at http://localhost:${process.env.port}`)
    }
    catch(err){
        console.log(err)
    }
})