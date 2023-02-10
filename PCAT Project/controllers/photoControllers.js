const Photo = require("../models/Photo")
const fs = require("fs");

// GETS ALL PHOTOS

exports.getAllPhotos = async (req, res) => {
  const photos = await Photo.find({});
  console.log(photos);
  res.render('index', {
    photos,
  });
};

// GET PHOTO

exports.getPhoto = async (req, res) => {
    console.log(req.params.id);
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
      photo,
    });
  }

// EDIT PHOTO

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
  
    res.redirect(`/photos/${req.params.id}`);
  }

// CREATES PHOTO

exports.createPhoto = async (req, res) => {
  //image = req.files.image;
  //console.log(image);
  // await Photo.create(req.body);
  // res.redirect('/');

  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
  });
  res.redirect('/');
};

// DELETE PHOTO

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedItem = __dirname + '/../public/' + photo.image;
    fs.unlinkSync(deletedItem);
    await Photo.findByIdAndDelete(req.params.id);
  
    res.redirect('/');
  };
