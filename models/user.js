// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const voteSchema = new Schema({
  summary: { type: Schema.Types.ObjectId, ref: 'Summary' },
  vote: String
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: String,
  bio: String,
  pronouns: {
    type: [
      {
        type: String,
        enum: ['He/Him', 'She/Her', 'They/Them', 'It/Its', 'Other', 'Unspecified'],
      },
    ],
    default: ['Unspecified'],
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});


userSchema.pre('save', async function (next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);