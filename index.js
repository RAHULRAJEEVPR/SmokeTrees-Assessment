const express = require("express")
const app= express()
let port=3000
const cors= require("cors")
const mongoose = require('mongoose');

const userRouter=require("./routes/userRouter")

mongoose.connect('mongodb://localhost:27017/userdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/user",userRouter)

app.use(
    cors({
        origin:"*",
        methods:["GET","POST"]
    })
)
app.get("/",(req,res)=>{
    res.status(200).json({message:"welcome to smokeTree assesment"})
})
app.listen(port,()=>{
    console.log("server running at 3000");
})