const express = require('express')
const app = express()

app.get('/', function (req, res) {

    res.send('Hello World')
})

app.get('/about', function (req, res) {
    
    res.send('Hello World')
})

app.get('/contact', function (req, res) {
    
    res.send('Contact')
})

app.get("*", (req,res ) => {
    res.status(404).send("404 Error");
})

app.listen(3000, () => {
    console.log("Connection Provided");
})