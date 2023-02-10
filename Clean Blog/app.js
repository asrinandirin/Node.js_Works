// PACKAGES INCLUDES
const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const path = require('path')
const Post = require('./models/Post')
const pageController = require('./controller/pageController')
const postController = require('./controller/postController')

// APP CONFIGURATIONS
const app = express()
app.set('view engine', 'ejs')
const port = 3000

//CONNECT DB
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// MIDDLEWARE
app.use(express.static('public')) // uses public as static file folder.
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

//ROUTES

app.get('/about', pageController.getAboutPage)
app.get('/add_post', pageController.getAddPage)

app.get('/', postController.getMainPage)
app.get('/index', postController.getMainPage)
app.get('/post/:id', postController.getPostPage)
app.post('/post', postController.createPost)

// LISTEN

app.listen(port, () => {
    console.log('Server started...')
})
