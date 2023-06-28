// server.js
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const voteRouter = require('./routes/api/vote');

const User = require('./models/User');
const Summary = require('./models/Summary');
const billsRouter = require('./routes/api/bills');

require('dotenv').config();

const db = require('./config/database');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database successfully');
});

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Request Details:', req.method, req.url, req.headers);
  next();
});

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

const port = process.env.PORT || 3001;

app.use('/api/users', require('./routes/api/users'));
app.use('/api/summaries', require('./routes/api/summaries'));
app.use('/api/bills', billsRouter);
app.use('/api', voteRouter);


app.post('/api/vote', async (req, res) => {
  console.log('In /api/vote route');
  const { userId, billId, vote } = req.body;
  console.log(`UserId: ${userId}, BillId: ${billId}, Vote: ${vote}`);
  const user = await User.findById(userId);
  user.votes.push({ summary: billId, vote: vote });
  await user.save();
  const summary = await Summary.findById(billId);
  summary[vote].push(userId);
  await summary.save();
  res.json({ status: 'Vote recorded' });
});

app.get('/api/bills/:billId', async (req, res) => {
  console.log('In /api/bills/:billId route');
  try {
    const bill = await Summary.findById(req.params.billId);
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bill details' });
  }
});

app.get('/*', function (req, res) {
  console.log('In /* route');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('An error occurred:', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
