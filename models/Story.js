const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  authorId: String,
  authorName: String,
  title: String,
  longDesc: String,
  shortDesc: String,
  photoUrl: String,
  ages: String,
  price: Number,
  length: Number,
  tags: Array,
  inputs: Object,
  html: String
}, { timestamps: true });

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
