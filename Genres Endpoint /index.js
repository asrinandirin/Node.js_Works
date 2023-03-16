const express = require('express');
const app = express();
const genres = require('./router/genres')

//MIDDLEWARES
app.use(express.json());

app.use('/api/genres',genres)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App is listening on port:${PORT}`);
});

