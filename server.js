const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const multer = require('multer');

const Todo = require('./models/todo');
const User = require('./models/user');
const Summary = require('./models/Summary');
const billsRouter = require('./routes/api/bills');
const usersRouter = require('./routes/api/users');
const voteRouter = require('./routes/api/vote');

require('dotenv').config();

const db = require('./config/database');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to the database successfully');
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));



const port = process.env.PORT || 3001;

app.use('/api/users', usersRouter);
app.use('/api/summaries', require('./routes/api/summaries'));
app.use('/api/bills', billsRouter);
app.use('/api/vote', voteRouter);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });


app.use('/api/photos', require('./routes/api/photos'));

// Handle file upload
app.post('/api/users/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  // You can perform additional logic here if needed

  return res.json({ fileUrl: file.path });
});

app.post('/profile', async (req, res) => {
  const { userId, bio, pronouns } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's bio and pronouns
    user.bio = bio;
    user.pronouns = pronouns;

    // Save the updated user
    await user.save();

    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/vote', async (req, res) => {
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

app.post('/api/todos', (req, res) => {
  const { title, description, dueDate } = req.body;

  // Assuming you have the Todo model imported correctly
  const newTodo = new Todo({
    title,
    description,
    dueDate,
  });

  newTodo.save((err, savedTodo) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to create todo' });
    }

    return res.status(201).json(savedTodo);
  });
});

app.get('/api/bills/:billId', async (req, res) => {
  try {
    const bill = await Summary.findById(req.params.billId);
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bill details' });
  }
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
