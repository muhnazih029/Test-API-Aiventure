const express = require('express');
const userController = require('./user/user.controller');
const placesController = require('./places/place.controller');
const ratingController = require('./rating/rating.controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', userController);
app.use('/places', placesController);
app.use('/ratings', ratingController);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Ai-venture API' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
