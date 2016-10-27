const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const storySchema = require('./schemas/storySchema');
const Submital = mongoose.model('Submital', storySchema);
module.exports = Submital;
