const Joi = require('joi');
const express = require('express');
const { string } = require('joi');
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Python',
  },
];

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses[parseInt(req.params.id)];
  if (!course) {
    res.status(404).send("The course with the given id could't be found ... ");
  }
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  console.log(req.body);
  const { error } = validateCourse(req.body);

  if (error) {
    // Bad request , 404
    res.status(404).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses[parseInt(req.params.id)]; // Course exist or not.
  if (!course) {
    res.status(404).send("The course with the given id could't be found ... ");
  }
  console.log(req.body);
  const { error } = validateCourse(req.body);

  if (error) {
    // Bad request , 404
    res.status(404).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  course.id = req.body.id;
  courses[req.params.id] = course;
  res.send(courses);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses[parseInt(req.params.id)]; // Course exist or not.
  if (!course) {
    res.status(404).send("The course with the given id could't be found ... ");
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Application started at: ${port} `);
});
