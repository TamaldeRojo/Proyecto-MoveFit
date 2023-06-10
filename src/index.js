const express = require("express");
const app = express();
const router = express.Router();
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan"); //
const bp = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// settings
require('dotenv').config()
app.use(router);
require("./database");
require("./passport/local-auth");
const userSchema = require("../src/models/user");
const port = process.env.PORT || process.env.PORT;

/* const path = __dirname + '/templates/'
app.use(express.static(__dirname+'/styles')); */

app.set("views", path.join(__dirname, "views")); //__dirname agarra la ruta del archivo ejecutado
app.engine("ejs", engine); //motor de plantillas
app.set("view engine", "ejs");
app.use(cookieParser("secretoCookie"));
app.use(
  session({
    secret: "secretoCookie",
    resave: true, //en true significa q cada peticion guardara sesion
    saveUninitialized: true, //se guarda de todos modos
    cookie: { secure: true },
  })
);
//end  settings

//-------------------------- middleware
app.use(morgan('dev'))
var urlencodedParser = bp.urlencoded({ extended: false})
var jsonParser = bp.json()
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
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
/* router.post('/signup',urlencodedParser,async(req,res)=>{
  console.log(req.body.email)
  console.log(req.body.password)
  try{
    const userReg = new userSchema({
        email: req.body.email,
        password: req.body.password
    })
    const user = await userReg.save()
    !user && res.status(404).send("Not created")
    res.status(201).send("User created")
  }catch{console.log("no clue")}
}) */

router.get("/signin", (req, res, next) => {});
router.post("/signin", (req, res, next) => {});

router.get("/menu", (req, res, next) => {
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
