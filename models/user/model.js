const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = mongoose.model('User', new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    maxLength: 30
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user','admin','super']
  },
},{
  timestamps: true,
}));

module.exports = User;
