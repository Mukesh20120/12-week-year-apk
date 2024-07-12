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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
