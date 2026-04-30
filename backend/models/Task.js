const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },

    // 👤 Assigned user
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // ⏰ Due date
    dueDate: {
      type: Date,
      default: null
    }
  },
  { timestamps: true } // 🔥 createdAt, updatedAt
);

module.exports = mongoose.model("Task", taskSchema);