const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// ================= CREATE TASK =================
// 👑 ADMIN ONLY
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create tasks" });
    }

    const { title, assignedTo, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const task = await Task.create({
      title,
      assignedTo: assignedTo || null,
      dueDate: dueDate || null,
      status: "todo"
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task", error: err.message });
  }
});


// ================= UPDATE STATUS =================
// 👑 Admin → all tasks
// 👤 User → only assigned task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // 👑 Admin can update any task
    if (req.user.role === "admin") {
      task.status = req.body.status;
      await task.save();
      return res.json(task);
    }

    // 👤 User can update ONLY assigned task
    if (
      task.assignedTo &&
      task.assignedTo.toString() === req.user.id
    ) {
      task.status = req.body.status;
      await task.save();
      return res.json(task);
    }

    return res.status(403).json({ msg: "Not allowed" });

  } catch (err) {
    res.status(500).json({ msg: "Error updating task", error: err.message });
  }
});


// ================= GET TASKS =================
// 👑 Admin → all tasks
// 👤 Member → only assigned tasks
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("assignedTo", "name email");
    } else {
      tasks = await Task.find({
        assignedTo: req.user.id
      }).populate("assignedTo", "name email");
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks", error: err.message });
  }
});

// ================= EDIT TASK =================
// 👑 ADMIN ONLY
router.put("/edit/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can edit tasks" });
    }

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title required" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Error editing task", error: err.message });
  }
});


// ================= DELETE TASK =================
// 👑 ADMIN ONLY
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can delete tasks" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task", error: err.message });
  }
});

module.exports = router;