
const express = require('express')
const app = express()
const router = express.Router();
const engine = require('ejs-mate')
const path = require('path')
const morgan = require('morgan')  //
const bp = require('body-parser')

// settings
app.use(router);
require('./database')

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Puerto abierto en: ",port)
})

/* const path = __dirname + '/templates/'
app.use(express.static(__dirname+'/styles')); */

app.set('views',path.join(__dirname, 'views'))  //__dirname agarra la ruta del archivo ejecutado
app.engine('ejs',engine) //motor de plantillas
app.set('view engine','ejs')
//end  settings


// middleware
app.use(morgan('dev'))
app.use(bp.json())
var urlencodedParser = bp.urlencoded({ extended: false})

//end middleware


//PATH
app.get('/',(req,res,next)=>{
  res.render('index')
})
router.get('/signup',(req,res,next)=>{
  res.render('signup')
})
router.post('/signup',urlencodedParser,(req,res,next)=>{
  //console.log(req.body.username)
  res.send('Done '+req.body.username)
})
router.get('/signin',(req,res,next)=>{

})
router.post('/signin',(req,res,next)=>{

})

//END PATH




//404 PAGE
/* app.use((req,res)=>{
  res.status(404).sendFile(path+'notFound.html')
}) */
//END 404 PAGE