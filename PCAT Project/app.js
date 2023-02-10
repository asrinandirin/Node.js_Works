const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageController");

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
app.use(fileUpload());
app.use(methodOverride('_method'));

//ROUTES

app.get('/', photoController.getAllPhotos);
app.get('/index', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.post('/photos', photoController.createPhoto);
app.get('/photo/delete/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage );
app.get('/add', pageController.getAddPage);
app.get('/photo/edit/:id', pageController.getEditPage);

app.listen(port, () => {
  console.log('Server started...');
});
