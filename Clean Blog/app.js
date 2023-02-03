// PACKAGES INCLUDES
const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const path = require('path')

// APP CONFIGURATIONS
const app = express()
app.set('view engine', 'ejs')
const port = 3000;

// MIDDLEWARE
app.use(express.static('public')) // uses public as static file folder.

//ROUTES
app.get("/", (req,res) => {
    res.render("index");
})

app.get("/index", (req,res) => {
    res.render("index");
})

app.get("/about", (req,res ) => {
    res.render("about");
})

app.get("/add_post", (req,res ) => {
    res.render("add_post");
})


// LISTEN
app.listen(port, () => {
    console.log('Server started...');
  });
