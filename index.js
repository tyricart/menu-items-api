// getting express library 
const express = require('express')
const menuData = require('./menu-items.json')
const cors = require('cors')

// giving express the name of app
const app = express()
app.use(cors())
app.use(express.json())

app.listen(4000, () => {
    console.log('Our API is listening on port 4000 - YESS it is working')
})

app.get('/', (request, response) => {
    response.send('My API is running!!!')
})

app.get('/menu-items', (request, response) => {
    response.send(menuData)
})