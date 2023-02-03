// PACKAGES INCLUDES
const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const Post = require('./models/Post')

// APP CONFIGURATIONS
const app = express()
app.set('view engine', 'ejs')
const port = 3000

//CONNECT DB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MIDDLEWARE
app.use(express.static('public')) // uses public as static file folder.
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

//ROUTES
/*
app.get('/', (req, res) => {
    res.render('index')
})
*/

app.get('/', async (req, res) => {
    const posts = await Post.find({})
    res.render('index', {
      posts
    })});

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/add_post', (req, res) => {
    res.render('add_post')
})

app.post('/post', async (req, res) => {
    console.log(req.body)
    await Post.create(req.body)
    res.redirect('/')
})

// LISTEN
app.listen(port, () => {
    console.log('Server started...')
})
