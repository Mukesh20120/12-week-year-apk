const mongoose = require('mongoose');

const yearSchema = mongoose.Schema({
      yearNumber: {type: Number},
      type: {type: String,enum: ['year','break']},
      year: {type: Number,require: true},
      startDate: {type: Date,require: true},
      endDate: {type: Date,require: true},
      formatStartDate: {type: String},
      formatEndDate: {type: String},
      color: {type: String},
      goal: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
      }],
})

module.exports = mongoose.model('yearsInYear',yearSchema);