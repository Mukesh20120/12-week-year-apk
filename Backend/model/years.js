const mongoose = require('mongoose');

const yearSchema = mongoose.Schema({
      blockNumber: {type: Number},
      type: {type: String,enum: ['year','break','month']},
      year: {type: Number,require: true},
      startDate: {type: Date,require: true},
      endDate: {type: Date,require: true},
      formatStartDate: {type: String},
      formatEndDate: {type: String},
      color: {type: String},
})

module.exports = mongoose.model('yearsInYear',yearSchema);