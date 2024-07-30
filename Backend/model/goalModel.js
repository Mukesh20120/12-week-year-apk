const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task is required"],
      trim: true, // Trims any whitespace from the task string
    },
    done: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      min: [0,'minimum value can be at least 0'],
      max: [10,'maximum value can be at most 10'],
      default: 0
    },
    yearId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'yearsInYear'
    },
    monthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'weekAsMonth'
    },
    dayId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'daysOfWeek'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
