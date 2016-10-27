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
  tags: [String],
  inputs: Object,
  underReview: {type: Boolean, default: true },
  paymentInfo: Object,
  html: String
}, { timestamps: true });

module.exports = storySchema;
