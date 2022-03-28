const express= require("express");
const connect=require("./configs/db");
const userController=require("./controllers/user.controller");
const {register,login}=require("./controllers/auth.controller");
const todoController=require("./controllers/todo.controller");

const app=express();
app.use(express.json());

app.use("/users",userController);
app.use("/register",register);
app.use("/login",login);
app.use("/todo",todoController);



app.listen(5000,async ()=>{
    try{
        await connect();
    }catch(err){
        console.log("Some thing went wrong");
    }
    console.log("Listening on Port 5000");
})
