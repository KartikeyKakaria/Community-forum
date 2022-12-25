require("dotenv").config();
require("./db/conn");
//importing modules and defining constants
const express = require("express");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const join = require("path").join;
const app = express();
const port = process.env.PORT || 8000;

//getting the Models for database injection
const USER = require('./schema/user');

//describing path to files and initalizing them
const staticPath = join(__dirname, '../public');
const templatePath = join(__dirname, '../templates/views');
const partialsPath = join(__dirname, '../templates/partials');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

class responseData {
    constructor(success, type) {
        this.success = success;
        if (success) {
            this.msg = `${type} successfully`;
        } else {
            this.msg = `Please enter valid ${type}`;
        }
    }
}

//my Routers
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/signup", (req, res) => {
    res.render("signup");
})
app.get("/login", (req, res) => {
    res.render("login")
})
//Registering the user
app.post('/register', async (req, res) => {
    const data = req.body;
    const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let rep;
    if (data.name.length < 2 || data.name.length > 50) {
        rep = new responseData(false, "name")
    } else if (!data.email.match(emailValidationRegex)) {
        rep = new responseData(false, "email");
    } else if (data.number.length !== 10) {
        rep = new responseData(false, "mobile number");
    } else {
        //code to push the user details into db
        const user = new USER({
            name: data.name,
            email: data.email,
            address: data.address,
            age: data.age,
            number: data.number,
            password: data.password
        })
        //code to generate a jwt token for user authentication
        //
        const token = await user.generateAuthToken();
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 2628002880),
            httpOnly: true,
        })
        const result = await user.save();
        if (result.name !== undefined) rep = new responseData(true, "Registered");
        else {
            rep = new responseData(false, "details");
        }
    }
    res.send(rep);
})

//logging the user in
app.post('/signin', async (req, res) => {
    const data = req.body;
    let result;
    if (data.idType == "email") {
        result = await USER.find({ email: data.identifier });
    } else {
        result = await USER.find({ name: data.identifier });
    }
    if (result.length == 1) {
        const isValid = await bcrypt.compare(data.password, result[0].password);
        rep = isValid ? new responseData(true, "Loginned") : new responseData(false, "credentials");
        if (isValid) {
            res.cookie("jwt", result.tokens[0].token, {
                expires: new Date(Date.now() + 2628002880),
                httpOnly: true,
            })
        }
    } else {
        rep = new responseData(false, "crednetials");
    }
    res.send(rep)

})
app.listen(port, err => console.log(`listening at port ${port}`))