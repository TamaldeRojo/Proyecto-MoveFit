
const express = require('express')
const app = express()
const port = 3000
const path = 'C:/Users/josue/Desktop/Proyecto-MoveFit/templates/'

app.get('/', (req, res) => {
  res.sendFile(path + 'landingPage.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})