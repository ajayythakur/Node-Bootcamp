// Implement API for signup and login with hash password
const express=require("express");
const body=require("body-parser");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cors=require("cors");


const app=express();
const salt=10;
const secretKey="Ajay123";
let arr=[];
app.use(body.json());
app.use(cors("*"));

const middleware=(req,res,next)=>{
    console.log("Middlware is called");
    next();
}

app.use(middleware);

app.post("/login",async(req,res)=>{
    let name=req.body.name;
    let password=req.body.password;
    const hashPassword=await bcrypt.hash(password,salt);
    console.log(hashPassword);
    let data={
        name:name,
        password:hashPassword
    }
    arr.push(data);
    res.send(arr);
})

// Implement an api accepts a token , checks the token . If correct sends data else error "token is expired"

app.post("/token",(req,res)=>{
    let user=req.body;
    jwt.sign({user},secretKey,{expiresIn:"300s"},(err,token)=>{
        if(err){
            console.log(err);
            res.send("error");
        }
        else{
            console.log("Token generated",{token})
            res.send({token});
        }
    })
})


app.listen(3001,()=>{
    console.log("Running on port 3001");
})















































