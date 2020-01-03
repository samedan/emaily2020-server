const mongoose = require('mongoose');
const { Schema } = mongoose; //const Schema = mongoose.Schema;

const userEmailySchema = new Schema({
  googleId: String
});

mongoose.model('emaily_users', userEmailySchema);
