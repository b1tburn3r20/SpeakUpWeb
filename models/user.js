// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const voteSchema = new Schema({
  summary: { type: Schema.Types.ObjectId, ref: 'Summary' },
  vote: String
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: { type: String, default: '' },
  votes: [{
    summary: {
      type: Schema.Types.ObjectId,
      ref: 'Summary'
    },
    vote: {
      type: String,
      enum: ['pass', 'veto'],
      required: true
    }
  }],
  bio: { type: String, default: "bio" },
  pronouns: { type: String, default: "pronouns" },
  dateJoined: { type: Date, default: Date.now }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});


userSchema.pre('save', async function (next) {
  // 'this' is the user document
  if (!this.isModified('password')) return next();
  // Replace the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);