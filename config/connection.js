const mongoose = require('mongoose');
require('dotenv').config();   

mongoose.connect('mongodb://localhost:27017/social17DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;