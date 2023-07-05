const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const uploadFile = require('../../config/upload-file');


module.exports = {
  create,
  login,
  checkToken,
  getVotedBills,
  uploadProfilePic,
  deleteUser,
};




function checkToken(req, res) {
  console.log('req.user', req.user);
  res.json(req.exp);
}

async function deleteUser(req, res) {
  try {
    // Make sure the user can only delete their own account
    const user = await User.findById(req.user._id); // req.user._id should be set after JWT authentication
    if (!user) throw new Error('User not found');
    await user.remove();
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message);
  }
}

async function create(req, res) {
  try {
    console.log('Request body:', req.body);

    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.error('Error during user creation:', err);
    res.status(400).json(err);
  }
}


async function uploadProfilePic(req, res) {
  console.log(req.file)
  try {
    if (req.file) {
      // The uploadFile function will return the uploaded file's S3 endpoint
      const photoURL = await uploadFile(req.file);
      const user = await User.findById(req.user._id); // req.user._id should be set after JWT authentication
      user.profilePicture = photoURL;
      await user.save();
      res.json(user);
    } else {
      throw new Error('Must select a file');
    }
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}
async function upload(req, res) {
  try {
    if (req.file) {
      console.log(req.file);
      // The uploadFile function will return the uploaded file's S3 endpoint
      const photoURL = await uploadFile(req.file);
      const photoDoc = await user.create({
        url: photoURL,
        // As usual, other inputs sent with the file are available on req.body
        title: req.body.title
      });
      res.json(photoDoc);
    } else {
      throw new Error('Must select a file');
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
}

/* Add this function */
async function getVotedBills(req, res) {
  try {
    // Fetch the bills that the user has voted on from your database
    // The specific implementation will depend on your schema and database setup
  } catch (err) {
    res.status(500).json(err);
  }
}

function createJWT(user) {
  return jwt.sign(
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}