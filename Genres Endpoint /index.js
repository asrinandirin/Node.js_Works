const express = require('express');
const Joi = require('joi');
const app = express();
const joi = require('joi');

//MIDDLEWARES
app.use(express.json());

const genres = [
  {
    id: 1,
    name: 'action',
  },
  {
    id: 2,
    name: 'horror',
  },
  {
    id: 3,
    name: 'drama',
  },
  {
    id: 4,
    name: 'Thriller',
  },
  {
    id: 5,
    name: 'action',
  },
  {
    id: 6,
    name: 'comedy',
  },
];

const validateScheme = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
};

const PORT = process.env.PORT || 3001;

//ROUTES

app.get('/', (req, res) => {
  res.send('Genres App.');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.post('/api/genres', (req, res) => {
  const { error } = validateScheme(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genres);
});

app.put('/api/genres/:id', (req, res) => {
    const { error } = validateScheme(req.body);
    if (error) {
      res.status(404).send(error.details[0].message);
      return;
    }

    const genre = genres[req.params.id] 
    if(!genre){
        res.status(404).send("There is no such genre to modify.")
    }

    genres[req.params.id].name = req.body.name
    res.send(genres)
  });

app.delete('/api/genres/:id', (req,res) => {

    const { error } = validateScheme(req.body);
    if (error) {
      res.status(404).send(error.details[0].message);
      return;
    }

    const genre = genres[req.params.id] 
    if(!genre){
        res.status(404).send("There is no such genre to modify.")
    }
    
    const index = genres.indexOf(genre)
    genres.splice(index,1)
    res.send(genres)
})

app.listen(PORT, () => {
  console.log(`App is listening on port:${PORT}`);
});