const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

//CONNECT DB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE

app.set('view engine', 'ejs');

// MIDLEWARE

app.use(express.static('public')); // uses public as static file folder.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES

app.get('/', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
})

app.get('/index', async (req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
})

app.get('/photos/:id', async (req, res) => {
  console.log(req.params.id)
  const photo = await Photo.findById(req.params.id)
  console.log(req.body)
  res.render("photo", {
    photo
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.listen(port, () => {
  console.log('Server started...');
});

// POST METHOD

app.post('/photos', async (req, res) => { // async - await yapısı kullanacğız.
  await Photo.create(req.body)            // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/')
});


