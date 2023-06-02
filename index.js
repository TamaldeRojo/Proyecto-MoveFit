
const express = require('express')
const app = express()
const port = 3000
const path = __dirname + '/templates/'

//db connection
const url = "mongodb+srv://movefit:jugador@cluster0.2r49k9c.mongodb.net/"
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(url);
  console.log('UWU')

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//end db connection

//statics settings
app.use(express.static(__dirname+'/styles'));

app.listen(port, () => {
})
//end statics settings

//PATH
app.get('/', (req, res) => {
  res.sendFile(path + 'landingPage.html');
})

app.get('/about', (req, res) => {
  res.sendFile(path + 'about.html');
})

app.get('/foro', (req, res) => {
  res.sendFile(path + 'foro.html');
})

app.get('/menu', (req, res) => {
  res.sendFile(path + 'mainMenu.html');
})

app.get('/login', (req, res) => {
  res.sendFile(path + 'components/Login.html');
})

app.get('/instructions', (req, res) => {
  res.sendFile(path + 'instructions.html');
})

app.get('/services', (req, res) => {
  res.sendFile(path + 'services.html');
})




//END PATH

//404 PAGE

app.use((req,res)=>{
  res.status(404).sendFile(path+'notFound.html')
})

//END 404 PAGE