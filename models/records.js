const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema({
  key: {
    type: String, 
  },
  value: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  counts:{
    type: Array
  }
})

const Record = mongoose.model('record', recordsSchema);

module.exports.Record = Record;