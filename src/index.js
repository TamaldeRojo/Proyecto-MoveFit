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

// settings
require('dotenv').config()
app.use(router);
require("./database");
require("./passport/local-auth");
const port = process.env.PORT;

app.use(express.static(__dirname+'/public')); 

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

app.use((req,res,next)=>{
  res.locals.signupMessage = req.flash('signupMessage');
  res.locals.uwu = req.flash('uwu');
  next();
})


//---------------------------end middleware

//PATH
app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/signup", (req, res, next) => {
  res.render("signup");
});

app.post('/signup',passport.authenticate('local-signup',{
  successRedirect: 'menu',
  failureRedirect: 'signup',
  passReqToCallback: true
}));


app.get("/signin", (req, res, next) => { //mucho ojo con poner app o router
  res.render("signin")
});
app.post("/signin",passport.authenticate('local-signin',{
  successRedirect: 'menu',
  failureRedirect: 'signin',
  passReqToCallback: true
}));



app.get("/menu", (req, res, next) => {
  res.render("menu");
});

//END PATH

app.listen(port, () => {
  console.log("Puerto abierto en: ", port);
});

//404 PAGE
/* app.use((req,res)=>{
  res.status(404).sendFile(path+'notFound.html')
}) */
//END 404 PAGE
