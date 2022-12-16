require("dotenv").config();
//importing modules and defining constants
const express = require("express");
const hbs = require("hbs");
const join = require("path").join;
const app = express();
const port = process.env.PORT || 8000;

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
app.listen(port,()=>console.log(`listening at port ${port}`))

