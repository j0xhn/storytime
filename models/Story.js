const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  authorId: Number,
  authorName: String,
  title: String,
  desc: String,
  shortDesc: String,
  photoUrl: String,
  price: Number,
  tags: Array,
  inputs: Object,
  html: String
}, { timestamps: true });

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
