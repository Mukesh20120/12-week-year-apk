const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task is required"],
      trim: true, // Trims any whitespace from the task string
    },
    done: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", TodoSchema);
