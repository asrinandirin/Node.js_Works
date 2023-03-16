const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { string } = require('joi');

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

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses[parseInt(req.params.id)];
  if (!course) {
    res.status(404).send("The course with the given id could't be found ... ");
  }
  res.send(course);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const course = courses[parseInt(req.params.id)]; // Course exist or not.
  if (!course) {
    res.status(404).send("The course with the given id could't be found ... ");
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

module.exports = router;
