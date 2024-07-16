const mongoose = require('mongoose');

const DaySchema = mongoose.Schema({
    blockNumber: {type: Number},
    yearId: {type: mongoose.Types.ObjectId,
        ref: 'yearsInYear'
    },
    monthId: {type: mongoose.Types.ObjectId,
        ref: 'yearsInYear'
    },
    date: {type: Date,require: true},
    day: {type: String},
    formatDate: {type: String},
    color: {type: String},
});

module.exports = mongoose.model('days',DaySchema);