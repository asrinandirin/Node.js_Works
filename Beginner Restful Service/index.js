const config = require('config');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const { string } = require('joi');
const courses = require('./routes/courses');
const home = require('./routes/home')
const app = express();

//MIDDLEWARES

app.use(express.json());
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan Enabled.');
}

//CONFIGS

console.log('Configuration name: ' + config.get('name'));
console.log('Mail Server Name: ' + config.get('mail.host'));
console.log(app.get('env'));

app.use('/api/courses', courses);
app.use('/', home)

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Application started at: ${port} `);
});
