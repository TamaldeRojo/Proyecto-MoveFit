
const express = require("express");
const app = express();
const router = express.Router();
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan"); // lee las peticiones http
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser"); //se utiliza específicamente para analizar y extraer los datos de las cookies en una solicitud HTTP.
const flash = require('express-flash')
const axios = require('axios');
const CryptoJS = require('crypto-js')


// settings

app.use(express.static(__dirname+'/public')); 
require('dotenv').config()
app.use(router);
require("./database");
require("./passport/local-auth");
const port = process.env.PORT;


app.set("views", path.join(__dirname, "views")); //__dirname agarra la ruta del archivo ejecutado
app.engine("ejs", engine); //motor de plantillas
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secretoCookie",
    resave: false, //en true significa q cada peticion guardara sesion
    saveUninitialized: false, //se guarda de todos modos
    cookie: { maxAge : 60000 }, //duracion de la cookie
  })
);
//end  settings

//-------------------------- middleware

app.use(flash()) //debe ir despues de session, pero antes de passport middleware 

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());




//PATH


app.get("/signup", (req, res, next) => {
  res.render("signup");
});

app.post('/signup', async (req,res,next)=>{
  try {
    const response = await axios.post('https://mainapi-istq.onrender.com/signup',req.body)
    console.log(response.data[1])
    a = response.data[1]
    if (a == true){
      //redirect
      res.redirect('/menu')
      console.log("a")
    }else{
      res.redirect('/signup')
      print('Nop')
    }
  }catch(error){
    res.redirect('/signup')
    console.error('Error posting data:', error);
    //res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.get("/signin", (req, res, next) => { //mucho ojo con poner app o router
  res.render("signin")
});

app.post("/signin", async(req,res,next)=>{
  try {
    const response = await axios.post('https://mainapi-istq.onrender.com/signin',req.body)
    console.log(response.data[1])
    a = response.data[1]
    if (a == true){
      //redirect
      res.redirect('/menu')
      console.log("a")
    }else{
      res.redirect('/signin')
      print('Nop')
    }
  }catch(error){
    res.redirect('/signin')
    console.error('Error posting data:', error);
    //res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.get('/logout',(req,res,next)=>{
    res.redirect('/')
  })

app.get("/menu",async(req, res, next) => {
  try {
    console.log("menu")
    const response = await axios.get('https://mainapi-istq.onrender.com/exercises')
    const realResponse = response.data.reverse()
    console.log(realResponse)
    res.render("menu",{realResponse});
    
  }catch{
    console.log("couldn t")
    res.render("menu");
  }
  
});

app.get("/", (req, res, next) => {
  res.render("landing");
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/instructions", (req, res, next) => {
  res.render("instructions");
});

app.get("/profile",(req, res,next) => {
  console.log(req.user)
  res.render("profile",{email: req.user.email});
});
//END PATH

app.listen(port, () => {
  console.log("Puerto abierto en:", port);
});


//404 PAGE
app.use((req,res)=>{
  res.status(404).sendFile("404.ejs",{ root: __dirname+'/views/' })
}) 
//END 404 PAGE
