
const express = require('express')
const app = express()
const port = 3000
const path = 'C:/Users/josue/Desktop/Proyecto-MoveFit/templates/'

app.get('/', (req, res) => {
  res.sendFile(path + 'landingPage.html');
})
app.get('/about', (req, res) => {
  res.sendFile(path + 'about.html');
})
app.get('/foro', (req, res) => {
  res.sendFile(path + 'foro.html');
})
app.get('/mainMenu', (req, res) => {
  res.sendFile(path + 'mainMenu.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})