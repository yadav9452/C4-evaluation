const express = require("express");
const Todo= require("../models/todo.model");
const authenticate=require("../middleware/authenticate");


const router = express.Router();

router.get("",authenticate,async(req,res)=>{
    req.body.user_id=req.user_id;
    try{
        const todo= await Todo.find()
        .populate({
            path:"userId",
            select:["title"],
            
        })
        .lean().exec();
        return res.status(200).send(todo);

    }
    catch(err){
        return res.status(400).send({message:err.message});
    }
});

router.post("",authenticate,async(req,res)=>{

        req.body.user_id=req.user._id;
        try{
            const todo= await Todo.create(req.body);
            return res.status(200).send(todo);

        }
        catch(err){
            return res.status(400).send({message:err.message});
        }
});

router.get("/:id",authenticate,async(req,res)=>{
    req.body.user_id=req.user_id;
    try{
        const todo= await Todo.findById(req.param.id)
        .populate({
            path:"userId",
            select:["title"],
            
        })
        .lean().exec();
        return res.status(200).send(todo);

    }
    catch(err){
        return res.status(401).send({message:err.message});
    }
});

router.patch("/:id",authenticate,async(req,res)=>{
    req.body.user_id=req.user_id;
    try{
        const todo= await Todo.findByIdAndUpdate(req.param.id,req.body,{new:true})
        .populate({
            path:"userId",
            select:["title"],
            
        })
        .lean().exec();
        return res.status(200).send(todo);

    }
    catch(err){
        return res.status(401).send({message:err.message});
    }
});
router.delete("/:id",authenticate,async(req,res)=>{
    req.body.user_id=req.user_id;
    try{
        const todo= await Todo.findByIdAndDelete(req.param.id)
        .lean().exec();
        return res.status(200).send(todo);

    }
    catch(err){
        return res.status(401).send({message:err.message});
    }
});





module.exports = router;