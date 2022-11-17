require("dotenv").config(); //.env configurtaion
//essential variables for code
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
const User = require("./models/users")
const auth = require("./middleware/auth")
const Topic = require("./models/topics");
const Question = require("./models/questions");
const Answer = require("./models/answer");
const mongoose = require("mongoose");

// const crud = require("./crud")
const app = express();
const port = process.env.PORT || 8000;

//paths for serving files
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
require("./db/conn");

//serving files
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath)

//routers
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/user", auth.authUser, (req, res) => {
    res.render("user")
})
app.post("/user", auth.authUser, (req, res) => {
    res.send(req.user);
})
app.get("/topics",(req,res)=>{
    res.render("topics")
})

//get question info
app.get("/getQuestions",auth.authQues, async(req,res)=>{
    const questions = await Question.find();
    res.send([questions,req.isUser])
})

//get user's name by id
app.post("/getUsername",async(req,res)=>{
    const userid = req.body.id;
    const result = await User.find({_id:userid})
    res.send(result[0].name)
})

//display pages for each topic
app.get("/topics/:name", async(req, res)=>{
    const requestedTopicName = req.params.name
    const TopicData = await Topic.find({name:requestedTopicName})
    if(TopicData.length>0){
        res.render("topic",{topic:TopicData[0], user:req.user})
    }
    else{
        res.send("404 not found")
    }
    // console.log(TopicData[0], req.params.name)
})

app.get("/questions/:id", async(req,res)=>{
    const requestedQuestionId = req.params.id;
    const QuestionData = await Question.find({_id:requestedQuestionId})
    if(QuestionData.length>0){
        res.render("question",{question:QuestionData[0]})
    }
})

//logout user
app.get("/logout", auth.authUser, async(req, res) => {
    try {
        res.clearCookie("jwt")
        req.user.tokens = req.user.tokens.filter((element) => {
            return element.token !== req.token
        })
        console.log("logout successfully")
        await req.user.save();
        res.render("login")
    } catch (error) {
        res.status(500).send(error)

    }
})

//register user
app.post("/register", async(req, res) => {
    try {
        const password = req.body.password;
        const confpassword = req.body.confpassword;
        if (password === confpassword) {
            const userdata = new User({
                name: req.body.name,
                email: req.body.email,
                number: req.body.number,
                address: req.body.address,
                age: req.body.age,
                password: password,
            });

            const token = await userdata.generateAuthToken();
            // console.log('the token is' + token)

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 2628002880),
                // httpOnly:true
            })


            const result = await userdata.save();
            console.log(result)
            res.send(result);
        } else {
            res.status(400).send("paswords dont match")
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

//login user
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, result.password);

        // console.log(token)


        if (isMatch) {
            const token = await result.generateAuthToken()
            res.cookie("jwt", result.tokens[0].token, {
                expires: new Date(Date.now() + 2628002880),
            });

            console.log("The cookie is " + req.cookies.jwt)
            res.status(200).send("valid yay")
        } else {
            res.status(400).send("invalid credentials");

        }
    } catch (error) {
        res.status(400).send("invalid login credentials")
    }
})

//post the question enetere by user
app.post("/postQues",async(req,res)=>{
    try{
        const quesdata = new Question({
            heading:req.body.heading,
            description:req.body.desc,
            userId:req.body.userid,
            topicId:req.body.topicid,
        })
        const result = await quesdata.save();
        res.send(result)
    }catch(err){
        res.status(400).send(err)
    }
})

//get topics
app.post("/", async(req, res)=>{
    const Data = await Topic.find();
    res.send(Data);
})

//telling the server that cookie exists or not
app.post("/isCookieThere", async(req, res) => {
    res.send(req.cookies.jwt)
})

//listening to the server
app.listen(port, () => {
    console.log("listening at port " + port)
})