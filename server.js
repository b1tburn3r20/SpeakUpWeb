//server.js
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');


const User = require('./models/User');
const Summary = require('./models/Summary');
const Vote = require('./models/Vote');



// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/summaries', require('./routes/api/summaries'));

app.post('/api/vote', async (req, res) => {
  try {
    const { userId, billId, vote } = req.body;
    const newVote = new Vote({ user: userId, bill: billId, vote });
    const savedVote = await newVote.save();
    await User.findByIdAndUpdate(userId, { $push: { votes: savedVote._id } });
    await Summary.findByIdAndUpdate(billId, { $push: { votes: savedVote._id } });
    res.status(200).json(savedVote);
  } catch (error) {
    console.error(error); // log the error
    res.status(500).json({ error: 'Failed to cast vote' });
  }
});

app.get('/api/bills/:billId', async (req, res) => {
  try {
    const bill = await Summary.findById(req.params.billId);
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bill details' });
  }
});

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
