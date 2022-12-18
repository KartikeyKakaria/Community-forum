require("dotenv").config();
//importing modules and defining constants
const express = require("express");
const hbs = require("hbs");
const join = require("path").join;
const app = express();
const port = process.env.PORT || 8000;

//getting the Models for database injection
const USER = require('./schema/user');

//describing path to files and initalizing them
const staticPath = join(__dirname,'../public');
const templatePath = join(__dirname,'../templates/views');
const partialsPath = join(__dirname,'../templates/partials');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
require("./db/conn");
//my Routers
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})

//Registering the user
app.post('/register',(req,res)=>{
    const data = req.body;
    console.log(data);
    res.send(data);
})
app.listen(port,err=>console.log(`listening at port ${port}`))

