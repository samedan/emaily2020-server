const mongoose = require('mongoose');
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const userEmailySchema = new Schema({
  googleId: String,
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model('emaily_users', userEmailySchema);
